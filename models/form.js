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

	async save() {
		const db = getDb();
		try {
			await db.collection('messages').insertOne(this);
			console.log('New MSG saved')
		} catch (error) {
			console.log(error);
		}
	}

	static async fetchAll() {
		const db = getDb();
		try {
			const messages = await db.collection('messages').find().sort({ date: -1 }).toArray()
			console.log(messages);
			return messages;
		} catch (error) {
			console.log(error);
		}
	}

	static async findById(msgId) {
		const db = getDb();
		try {
			const singleMsg = await db.collection('messages').findOne({ _id: new mongodb.ObjectId(msgId) });
			console.log(singleMsg);
			return singleMsg;
		} catch (err) {
			console.log(err);
		}
	}

	static async delete(msgId) {
		const db = getDb();
		try {
			await db.collection('messages').deleteOne({ _id: new mongodb.ObjectId(msgId) });
			console.log('MSG Del DB');
		} catch (err) {
			console.log(err);
		}
		
	}

	static async msgCount() {
		const db = getDb();
		try {
			const number = db.collection('messages').countDocuments();
			console.log(number);
			return number;
		} catch (err) {
			console.log('counter failed');
		}
	}
};
