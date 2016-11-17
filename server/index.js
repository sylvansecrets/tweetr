"use strict";

const PORT        = 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');

var sassMiddleWare = require('node-sass-middleware');
const path = require('path');

app.use(sassMiddleWare({
  src: path.join(__dirname, '..', 'sass'),
  dest: path.join(__dirname, '..', 'public'),
  debug: true,
  outputStyle: 'compressed',
  prefix: 'http://localhost:8080/styles'
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));





db.connect((dbInstance) => {
  app.use('/tweets', tweetsApi(dbInstance));
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
