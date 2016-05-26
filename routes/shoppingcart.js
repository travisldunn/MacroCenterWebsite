var express = require('express');
var router = express.Router();
var request = require('request');
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


// router.get('/', function(req, res, next)
// {
//   res.render('shoppingCart');
// });

router.get('/Checkout', function(req, res, next) {


    if (req.session.user) {

      console.log("in shoppingCart checkout route" + req.cookies.cart[0]);

        // request('http://www.google.com', function(error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         console.log(body) // Show the HTML for the Google homepage.
        //     }
        // });

          res.render('checkout', {
        page: {
            header: "Checkout",
            title: "Checkout",
            products: req.cookies.cart,
            total: req.cookies.total,
            // cart: cart,
            script: "<script  type='text/javascript' src='../js/checkoutClient.js'></script>"
        }
    });


    } else {

    }

});

router.get("/signed", function(req, res, next) {
    console.log("creating cookie in shoppingCart route ");

    res.cookie('testCookie', { test: "test" }, { signed: true });
    console.log(req.signedCookies.testCookie);
});

router.post('/addToCart', function(req, res, next) {

    if (req.session.user) {
        console.log("inside addToCart in shoppingCart route");
        console.log(req.body.productId + " req body");
        console.log(req.session.userid);
        var json = {
            productId: req.body.productId,
            userId: req.session.userid
        };

        request({
            url: 'http://localhost:8080/MacroCenter/rest/addToCart',
            method: "POST",
            json: json
        }, function(error, r, body) {

        });

    } else {
        console.log("inside of else of add cart");
        var productid = req.body.productId;
        console.log(productid);


        console.log("Cookies: request test items", req.cookies.test);
        var array = req.cookies.test;
        array.push(productid);
        console.log(" data in tempcart array " + array);
        console.log("creating new response cookie object");
        res.cookie("test", array);
        // res.cookie('test', tempCart.push(productid));
        console.log("final cookie data ");
        res.send(true);

    };







});
module.exports = router;
