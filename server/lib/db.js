"use strict";

const initialTweets = require("./tweets");

const injectTweet = require("./dbWrite").injectTweet;
const readTweets = require("./dbRead").readTweets;

const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

const db = { tweets: initialTweets };

const dbMethods = {

  saveTweet: (data) => {
    injectTweet(MONGODB_URI, data);
    return true;
  },
  getTweets: getTweets,
}

function getTweets(url=MONGODB_URI){
  return new Promise(function(resolve, reject){
    readTweets(url).then(function(results){
      let sortedTweets = results.sort(function(a, b) { return b.created_at - a.created_at });
      if (sortedTweets){
        resolve(sortedTweets);
      } else {
        reject("sortedTweets not created "+sortedTweets);
      }
    }, function(failure){
      console.log("readTweets failed", failure);
    }
    )
  })
}






module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}

// function diagnoseTweets(){
//   getTweets().then(function(results){
//     console.log("success", results);
//   }, function(failure){
//     console.log("diagnostics failed", failure);
//   })
// }

// console.log(diagnoseTweets());
