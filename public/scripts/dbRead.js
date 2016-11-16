"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";
const assert = require('assert');

console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);

// MongoClient.connect(MONGODB_URI, (err, db) => {

//   if (err) {
//     console.log('Could not connect! Unexpected error. Details below.');
//     throw err;
//   }

//   console.log('Connected to the database!');
//   let collection = db.collection("tweets");

//   console.log('Retrieving documents for the "tweets" collection...');
//   collection.find().toArray((err, results) => {
//     console.log('results: ', results);

//     console.log('Disconnecting from Mongo!');
//     db.close();
//   });
// });

function readTweets(url) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    let collection = db.collection('tweets');
    collection.find().toArray((err, results) => {
      assert.equal(null, err);
      db.close();
      return results;
    })
  })
}

module.exports = {readTweets: readTweets}