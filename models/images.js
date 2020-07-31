const mongodb = require('mongodb');
const getDb = require('../helpers/database').getDb;

const Images = class {
    constructor(title, imageUrl) {
        this.title = title;
        this.imageUrl = imageUrl;
    }

    saveImage() {
        const db = getDb();
        return db.collection('images').insertOne(this)
        .then((result) => {
            console.log(result);
            console.log('img in db');
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = Images;