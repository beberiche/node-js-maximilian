const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

exports.mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://beberiche:970409@cluster0.kr8nl.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

exports.getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};
