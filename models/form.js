const getDb = require('../helpers/database').getDb;

module.exports = class FormData {
	constructor(name, email, msg) {
		this.name = name;
		this.email = email;
		this.msg = msg;
	}

	save() {
		const db = getDb();
		return db
			.collection('messages')
			.insertOne(this)
			.then((result) => console.log(result))
			.catch((err) => console.log(err));
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection('messages')
			.find().toArray()
			.then((messages) => {
				console.log(messages);
				return messages;
			})
			.catch((err) => console.log(err));
	}
};
