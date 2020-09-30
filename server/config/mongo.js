const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_URL;
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

client.connect();

module.exports = client;
