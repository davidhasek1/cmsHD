const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const MONGO_URI = 'mongodb+srv://davidhasek:<PW>@cluster0-fw5d7.mongodb.net/messages?retryWrites=true&w=majority';

let _db;

const mongoConnect = async (callback) => {

    try {
        const client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true } );
        console.log('connected');
        _db = client.db();
        callback();
    } catch (error) {
        console.log(error);
        throw error;
    }

};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No databes found';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.uri = MONGO_URI;
