const mongodb = require('mongodb');
const getDb = require('../helpers/database').getDb;

module.exports = class FormData {
	constructor(name, email, msg) {
		this.name = name;
		this.email = email;
		this.msg = msg;
		this.date = this.date();
	}

	date() {
		const d = new Date(); // 26.3.2020
		const dtfUK = new Intl.DateTimeFormat('UK', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
		return dtfUK.format(d);
	}

	save() {
		const db = getDb();
		return db
			.collection('messages')
			.insertOne(this)
			.then((result) => console.log('New MSG saved'))
			.catch((err) => console.log(err));
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection('messages')
			.find()
			.sort({ date: -1 })
			.toArray()
			.then((messages) => {
				console.log(messages);
				return messages;
			})
			.catch((err) => console.log(err));
	}

	static findById(msgId) {
		const db = getDb();
		return db
			.collection('messages')
			.find({ _id: new mongodb.ObjectId(msgId) })
			.next()
			.then((message) => {
				console.log(message);
				return message;
			})
			.catch((err) => console.log(err));
	}

	static delete(msgId) {
		const db = getDb();
		return db
			.collection('messages')
			.deleteOne({ _id: new mongodb.ObjectId(msgId) })
			.then((result) => {
				console.log('MSG Deleted');
			})
			.catch((err) => console.log(err));
	}

	static msgCount() {
		const db = getDb();
		return db
			.collection('messages')
			.countDocuments()
			.then((number) => {
				console.log(number);
				return number;
			})
			.catch((err) => {
				console.log('counter failed');
			});
	}
};
