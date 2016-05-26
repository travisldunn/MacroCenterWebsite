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

router.post("/", function(req, res) {
  req.session.user = req.body.user.email;
	req.session.userid = req.body.user.id;
	req.session.name = req.body.user.name;
  req.session.address = req.body.address.address;
  req.session.type = req.body.address.type;

  res.render('index');
});

router.get("/logout", function(req, res) {
  console.log("logged out");
  req.session.user = null;
	req.session.userid = null;
	req.session.name = null;
  req.session.address.address = null;
  req.session.address.type = null;
  res.render("index");
});
router.get("/usercredentials", function(req, res) {
  res.send(JSON.stringify(
		{
			username: 	req.session.user,
			name: 	req.session.name,
			id: 	req.session.userid,
      address: req.session.address,
      type: req.session.type

		}
	));
});
router.post("/updatesession", function(req, res){
    console.log(req.body);
    console.log("in updatesession");
    req.session.address = req.body.address;
    req.session.type = req.body.type;
})
router.get("/newError", function(req, res) {
  req.session.flash = "Some error!";
  res.render("index");
});

router.get("/error", function(req, res) {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  res.render("index");
});

router.get("/signed", function(req, res) {
  res.cookie("testCookie", {
    test: "test"
  }, {
    signed: true
  });
  res.render("index");
});

router.get("/unsigned", function(req, res) {
  res.cookie("unsignedCookie", {
    test: "test"
  });
  res.render("index");
});

router.get("/allCookies", function(req, res) {
  console.log("Cookies: ", req.cookies);
  Cookies: {
    unsignedCookie: {
      test: "test"
    }
  }
});

router.get("/allSignedCookies", function(req, res) {
  console.log("Cookies: ", req.signedCookies);
  Cookies: {
    testCookie: {
      test: "test"
    }
  }
});

router.get("/specificCookie", function(req, res) {
  console.log(req.signedCookies.testCookie); {
    test: "test"
  }
});

router.get("/clearCookie", function(req, res) {
  console.log("Removing cookie: " + req.signedCookies.testCookie);
  res.clearCookie("testCookie");
  res.render("index");
});

router.get('/data', function(req, res) {
  console.log(req.xhr);
  res.send({
    data: "Response from the server"
  });
});

module.exports = router;
