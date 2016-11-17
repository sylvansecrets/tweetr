"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();

module.exports = function(db) {

  // tweets.get("/", function(req, res) {
  //   let tweets = db.getTweets();
  //   console.log(tweets);
  //   // simulate delay
  //   setTimeout(() => {
  //     return res.json(tweets);
  //   }, 300);
  // });
  tweets.get("/", function(req, res) {
    db.getTweets()
    .then(function(tweets){
      res.json(tweets);
    }, (function (failure){
      res.status(500);
      throw failure;
    }))
  })

  tweets.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    db.saveTweet(tweet);
    return res.send();
  });

  tweets.put("/", function(req, res){
    let status = req.body.status;
    let icon = req.body.icon;
    // Implement Me
    res.send();

  })

  return tweets;

}
