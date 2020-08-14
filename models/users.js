const mongoDb = require('mongodb');
const getDb = require('../helpers/database').getDb;

module.exports = class User {
	constructor(email, password) {
		this.email = email;
		this.password = password;
		this.resetToken;
		this.resetTokenExp;
	}

	static async editUserPassword(user, newPassword) {
		const db = getDb();
		//Neprovádím kontrolu podle ID, protože kontrola proběhla již v admin controlleru, při hledání uživatele
		try {
			await db
				.collection('users')
				.updateOne({ _id: new mongoDb.ObjectId(user._id) }, { $set: { password: newPassword } });
			console.log('New password set');
		} catch (error) {
			console.log(error);
		}
	}

	//update - z loginu reset pw
	static async updatePassword(user, token, password) {
		const db = getDb();

		try {
			await db
				.collection('users')
				.updateOne(
					{ resetToken: token, resetTokenExp: { $gt: Date.now() }, _id: new mongoDb.ObjectId(user._id) },
					{ $set: { password: password, resetToken: undefined, resetTokenExp: undefined } }
				);
			console.log('DB MOdel password updated');
		} catch (error) {
			console.log(error);
		}
	}

	static async findToken(token) {
		const db = getDb();
		try {
			const user = await db
				.collection('users')
				.findOne({ resetToken: token, resetTokenExp: { $gt: Date.now() } });
			console.log('token found');
			return user;
		} catch (error) {
			console.log(error);
		}
	}

	static async setReset(user, token) {
		const db = getDb();
		this.resetToken = token;
		this.resetTokenExp = Date.now() + 3600000;

		try {
			await db.collection('users').updateOne({ email: user.email },
				{
					$set: {
						resetToken: this.resetToken,
						resetTokenExp: this.resetTokenExp
					}
				}
			)
			console.log('reset token set!');
		} catch (error) {
			console.log(error);
		}
	}

	static async findByEmail(email) {
		const db = getDb();
		try {
			const userFound = await db.collection('users').findOne({ email: email });
			console.log('User found');
			return userFound;
		} catch (error) {
			console.log(error);
		}
	}

	async save() {
		const db = getDb();
		//save použiju v add usser
		try {
			await db.collection('users').insertOne(this);
			console.log(`User saved`);
		} catch (error) {
			console.log(error);
		}
	}

	static async findById(id) {
		const db = getDb();
		try {
			const user = await db.collection('users').findOne({ _id: mongoDb.ObjectId(id) });
			console.log(`User found: logged in`);
			return user;
		} catch (error) {
			console.log(error);
		}
	}

	static async fetchAll() {
		const db = getDb();
		try {
			const users = await db.collection('users').find().toArray();
			console.log('fetching users...');
			return users;
		} catch (error) {
			console.log(error);
		}
	}

	static async delete(ID) {
		const db = getDb();
		try {
			await db.collection('users').deleteOne({ _id: new mongoDb.ObjectId(ID) });
			console.log('User deleted');
		} catch (error) {
			console.log(error);
		}
	}
};
