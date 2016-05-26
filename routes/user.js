var express = require('express');
var router = express.Router();
var request = require('request');
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
/* GET users listing. */
// router.get('/', function(req, res, next)
// {
//   res.render('user.html');
//   res.send('respond with a resource');
// });

// router.get('/', function(req, res, next)
// {
//   request('http://localhost:8080/MacroCenter/rest/user', function (error, res, body)
//   {
//     if (!error && response.statusCode == 200)
//     {
//       console.log(body) // Show the HTML for the Google homepage.
//       res.render('user', {page : {
//         header : "header",
//         title : "users",
//         user : {}
//       }
//       // res.send(body);
//     }
//   });
//   }
// });


router.get('/', function(req, res, next)
{
  console.log("in user/");
  request('http://localhost:8080/MacroCenter/rest/user', function (error, response, body)
  {
    if (!error && response.statusCode == 200)
    {

      // console.log(body) // Show the HTML for the Google homepage.
      // res.render('user', body);
      var users = JSON.parse(body);
      res.render('user', {
        page: {
          header: "user",
          title: "User",
          user: users
        }
        // res.send(body);
      });
    }
  });
});

router.get('/createuser', function(req, res, next)
{
  console.log("get createuser");
  // console.log(res);
  // welcomeHeader.innHTML="Sign Up";
  res.render('createuser',
  {
    page:
    {
      welcomeHeader: "Sign Up",
      title: "Sign Up",
      script : "<script  type='text/javascript' src='../js/createuser.js'></script>"
    }
  }
  );
});

router.get('/signin', function(req, res, next)
{
  console.log("get loginUser");
  // console.log(res);
  // welcomeHeader.innHTML="Sign Up";
  res.render('loginUser',
  {
    page:
    {
      welcomeHeader: "Login",
      title: "Login",
      script : "<script  type='text/javascript' src='../js/loginClient.js'></script>"
    }
  }
  );
});
router.get('/account', function(req, res, next)
{
  console.log(req.session);
  if (req.session.userid)
  {
      res.render('useraccount',
      {
        page:
        {
          welcomeHeader: "Account Settings",
          userName: req.session.name,
          userUsername: req.session.user,
          address: req.session.address,
          type: req.session.type,
          title: "Account Settings",
          script : "<script  type='text/javascript' src='../js/accountsettings.js'></script>"
        }
      }
      );

  }
  else{
    res.render('loginUser',
    {
      page:
      {
        welcomeHeader: "Login",
        title: "Login",
        script : "<script  type='text/javascript' src='../js/loginClient.js'></script>"
      }
    }
    );

  }

});

module.exports = router;
