const mongoDb = require('mongodb');
const getDb = require('../helpers/database').getDb;

module.exports = class User {
	constructor(email, password) {
		this.email = email;
		this.password = password;
	}

	checkExistingUser() {
		const db = getDb();
		return db.collection('users').findOne({email: this.email})
		.then((document) => {	// user nebo undefined
			console.log('DB find OK');
			return document;
		})
		.catch((err) => {
			console.log(err);
		});
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
        return db.collection('users').find().toArray()
        .then(users => {
            console.log(users);
            return users;
        })
        .catch((err) => console.log(err));
    }
    
    static delete(ID) {
        const db = getDb();
        return db.collection('users').deleteOne({_id: new mongoDb.ObjectId(ID)})
        .then((user) => {
            console.log('User deleted');
        })
        .catch(err => console.log(err));
    }
};
