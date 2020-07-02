const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const MONGO_URI = 'mongodb+srv://davidhasek:davidhasek@cluster0-fw5d7.mongodb.net/messages?retryWrites=true&w=majority';

let _db;

const mongoConnect = (callback) => {

    MongoClient.connect(MONGO_URI, { useUnifiedTopology: true } )
    .then(client => {
        console.log('connected');
        _db = client.db();
        callback();
    })
    .catch((err)=> {
        console.log(err);
        throw err;
    });
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
