const mongodb = require('mongodb');
const getDb = require('../helpers/database').getDb;
const ImgDeleteHelper = require('../helpers/image').deleteImgFile;

const Images = class {
	constructor(title, imageUrl) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.date = this.date();
		this.visibility = true;
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

	saveImage() {
		const db = getDb();
		return db
			.collection('images')
			.insertOne(this)
			.then((result) => {
				console.log('img in db');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static fetchImg() {
		const db = getDb();
		return db
			.collection('images')
			.find()
			.sort({ date: -1 })
			.toArray()
			.then((images) => {
				console.log('fetching images...');
				return images;
			})
			.catch((err) => {
				console.log(err);
			});
    }
    
    static visibilityIsTrue(ID) {
        const db = getDb();
        return db
            .collection('images')
            .updateOne({ _id: new mongodb.ObjectId(ID) }, { $set: { visibility: false } })
            .then((result) => {
                console.log('set to False');
            })
            .catch((err) => {
                console.log(err);
            });
    }

	static visibilityIsFalse(ID) {
		const db = getDb();
		return db
			.collection('images')
			.updateOne({ _id: new mongodb.ObjectId(ID)}, { $set: { visibility: true } })
			.then((result) => {
                console.log('set to true');
            })
			.catch((err) => {
                console.log(err);
            });
	}

	static delete(ID, URL) {
		const db = getDb();
		return db
			.collection('images')
			.deleteOne({ _id: mongodb.ObjectId(ID) })
			.then((result) => {
				ImgDeleteHelper(URL);
				console.log('IMG deleted from DB');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static imgCount() {
		const db = getDb();
		return db.collection('images').countDocuments({ visibility: true })
		.then((count) => {
			console.log(count);
			return count;
		}).catch((err) => {
			console.log('img count failed');
		});
	}
};

module.exports = Images;
