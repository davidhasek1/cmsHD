const mongoDb = require('mongodb');
const getDb = require('../helpers/database').getDb;

module.exports = class User {
	constructor(email, password) {
		this.email = email;
		this.password = password;
		this.resetToken;
		this.resetTokenExp;
	}

	static editUserPassword(user, newPassword) {
		const db = getDb();
		//Neprovádím kontrolu podle ID, protože kontrola proběhla již v admin controlleru, při hledání uživatele
		return db
			.collection('users')
			.updateOne({ _id: new mongoDb.ObjectId(user._id) }, { $set: { password: newPassword } })
			.then((result) => {
				console.log('New password set');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static updatePassword(user, token, password) {
		const db = getDb();
		return db
			.collection('users')
			.updateOne(
				{ resetToken: token, resetTokenExp: { $gt: Date.now() }, _id: new mongoDb.ObjectId(user._id) },
				{ $set: { password: password, resetToken: undefined, resetTokenExp: undefined } }
			)
			.then((result) => {
				console.log(result);
				console.log('DB MOdel password updated');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static findToken(token) {
		const db = getDb();
		return db
			.collection('users')
			.findOne({ resetToken: token, resetTokenExp: { $gt: Date.now() } })
			.then((user) => {
				console.log('findtokenModel');
				console.log(user);
				return user;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static setReset(user, token) {
		const db = getDb();
		this.resetToken = token;
		this.resetTokenExp = Date.now() + 3600000;

		return db
			.collection('users')
			.updateOne(
				{ email: user.email },
				{
					$set: {
						resetToken: this.resetToken,
						resetTokenExp: this.resetTokenExp
					}
				}
			)
			.then((tokenSet) => {
				console.log('reset token set!');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static findByEmail(email) {
		const db = getDb();
		return db
			.collection('users')
			.findOne({ email: email })
			.then((userFound) => {
				console.log('User found');
				return userFound;
			})
			.catch((err) => console.log(err));
	}

	save() {
		//save použiju v add usser
		const db = getDb();
		return db
			.collection('users')
			.insertOne(this)
			.then((result) => {
				console.log(`User saved`);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static findById(id) {
		const db = getDb();
		return db
			.collection('users')
			.find({ _id: mongoDb.ObjectId(id) })
			.next()
			.then((user) => {
				console.log(`User found: looged in`);
				return user;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection('users')
			.find()
			.toArray()
			.then((users) => {
				console.log(users);
				return users;
			})
			.catch((err) => console.log(err));
	}

	static delete(ID) {
		const db = getDb();
		return db
			.collection('users')
			.deleteOne({ _id: new mongoDb.ObjectId(ID) })
			.then((user) => {
				console.log('User deleted');
			})
			.catch((err) => console.log(err));
	}
};
