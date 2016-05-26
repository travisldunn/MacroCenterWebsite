var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var credentials = require('../.credentials.js');
var session = require("express-session");



router.use(cookieParser("credentials.cookieSecret"));

router.use(session({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
  key: "user"
}));

// router.get("/signed",function(req, res, next) 
// {
//   console.log("creating cookie" + credentials.cookieSecret);

//   res.cookie('testCookie', {test : "test"}, {signed : true});
//   console.log(req.signedCookies.testCookie);
// });
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index');
  // res.render('index', { title: 'Express' });
  console.log("in render index");

 res.cookie("test", []);
 


  console.log(req.session.user);



  if (req.session.user)
  {
    res.render('index', {page : {
      welcomeHeader: "Welcome " + req.session.user ,
      title : "Macro Center",
      links :  [
        {
          name : "link1"
        },
        {
          name : "link2"
        },
        {
          name : "link3"
        }
      ]
    }
    // res.send(body);
    });
  }
  else
  {

    res.render('index', {page : {
      title : "Macro Center",
      links :  [
        {
          name : "link1"
        },
        {
          name : "link2"
        },
        {
          name : "link3"
        }
      ]
    }
    // res.send(body);
  });
  }
});

module.exports = router;
