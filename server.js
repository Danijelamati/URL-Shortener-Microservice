'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const bodyParser = require("body-parser");

const Shortener = require("./model");
const shortUrl = require ("./shortUrl");
const newUrl = require("./newUrl");

var cors = require('cors');

var app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch((err)=> console.log(err));

const urlencoded = bodyParser.urlencoded({extended: false});


// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(urlencoded);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/shorturl/:shortURL", shortUrl);


app.post("/api/shorturl/new", newUrl);
     
app.listen(port, function () {
  console.log('Node.js listening ...');
});