"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";
const assert = require('assert');

console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);

function readTweets(url){
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err);
      let collection = db.collection('tweets');
      collection.find().toArray((err, results) => {
        if (err){
          reject(err);
        } else {
        assert.equal(null, err);
        db.close();
        resolve(results);
      }
      });
    })
  });
}


module.exports = {readTweets: readTweets};

// function diagnoseTweets(url){
//   readTweets(url).then(function(results){
//   }, function(failure){
//   })
// }

// diagnoseTweets(MONGODB_URI);