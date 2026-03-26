const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  
  // Use the MONGODB_URI from your .env or Render Environment Variables
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      console.log('Successfully connected to MongoDB');
      callback(null, _db);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  // This explicitly returns the 'cse341' database from the connection
  return _db.db('cse341');
};

module.exports = {
  initDb,
  getDb,
};