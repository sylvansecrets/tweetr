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

  getTweets: () => {
    allTweets = readTweets(MONGODB_URI);
    console.log(allTweets);
    return readTweets(MONGDB_URL).sort(function(a, b) { return b.created_at - a.created_at });
  }

}

module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}
