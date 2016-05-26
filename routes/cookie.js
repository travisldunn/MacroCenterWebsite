var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var credentials = require('../.credentials.js');
var session = require("express-session");



router.use(cookieParser(credentials.cookieSecret));

router.use(session({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
  key: "user"
}));


router.get("/", function(req,res){

	console.log("creating cookie" + credentials.cookieSecret);
	res.cookie('mcUserCart', {test : "test"});
    res.cookie('testCookie', {test : "test"}, {signed : true});
    res.render('index');
    res.send(true);
});

router.get("/setCookie", function(req,res){
  console.log("in setCookie");
  res.cookie("test", []);
  res.send(true);
});

router.get("/getCookie", function(req,res) {
  console.log(req.cookies);
  console.log(req.cookies.test);
  var arr = req.cookies.test;
  arr.push("hello");
  console.log(arr);
  res.cookie("test", arr);
  res.send(true);
});

// router.get('/allSignedCookies', function(req,res) {
//     console.log(req.signedCookies.testCookie);
// });

 module.exports = router;