const mongoDb = require('mongodb');
const getDb = require('../helpers/database').getDb;


module.exports = class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
        .then((result) => {
            console.log(`User saved: ${result}`);
        }).catch((err) => {
            console.log(err);
        });
    }

    static findById(id) {
        const db = getDb();
        return db.collection('users').find({_id: mongoDb.ObjectId(id) }).next().then(user => {
            console.log(`User found ${user}`);
            return user;
        })
        .catch(err => {
            console.log(err);
        })
    }
}