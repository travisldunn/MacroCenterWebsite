var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var credentials = require('../.credentials.js');
var session = require("express-session");
var email = require('mailer');



router.use(cookieParser(credentials.cookieSecret));


router.use(session({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
  key: "user"
}));



router.get("/sendemail", function(req, res) {
email.send({
    host : "smtp.gmail.com",
    port : "465",
    ssl : true,
    domain : "i-visionblog.com",
    to : "someone@someone.com",
    from : "author@ivb.com",
    subject : "Mailer library Mail node.js",
    text: "Mail by Mailer library",
    html: "<span> Hello World Mail sent from  mailer library" ,
    authentication : "login",        // auth login is supported; anything else $
    username : 'username@gmail.com',
    password : '###########'
    },
    function(err, result){
      if(err){ self.now.error(err); console.log(err); res.send("error occured"); }
      else { console.log('hurray! Email Sent'); 
      res.send("Email Sent")}
});  



});