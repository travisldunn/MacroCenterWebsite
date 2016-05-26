var express = require('express');
var router = express.Router();
var request = require('request');
var app = express();
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



router.get('/', function(req, res, next) {
    if (req.session.user) {
        console.log("inside cart route");
        var userId = req.session.userid;
        console.log("id: " + userId);
        var cart = {};
        var quantity = 1;
        request('http://localhost:8080/MacroCenter/rest/cart/' + userId, function(error, r, body) {
            cart = (JSON.parse(body));

            var totalPrice =0;

            for (var i = 0; i <cart.length; i++) {

              totalPrice += parseInt(cart[i].products.price) * parseInt(cart[i].products.items[0].quantity);
              console.log(cart[i].products.price + "quantity " +cart[i].products.items[0].quantity);

            }



            console.log("Inside requst to java Data is  " + cart + " and totalPrice is " + totalPrice);
            res.render('cart', {
                page: {
                    header: "Shopping Cart",
                    title: "Shopping Cart",
                    myCart: cart,
                    subtotal: totalPrice,
                    script: "<script  type='text/javascript' src='../js/aboutClient.js'></script>"
                }
            });
             res.cookie("cart", cart);
             res.cookie("total", totalPrice);

        });



    } else {
        console.log("in else of shopping cart and " + req.cookies.test);

        var products = [];
        var totalPrice = 0;

        for (var k = 0; k < req.cookies.test.length; k++) {



            request('http://localhost:8080/MacroCenter/rest/product/' + req.cookies.test[k], function(error, r, body) {
                products.push(JSON.parse(body));

                //console.log("inside for loop and product data so far is :" + products);
                if (products.length === (req.cookies.test.length)) {

                    for (var j = 0; j < products.length; j++) {
                        var count = 0;
                        products[j].quantity =1;
                        for (var l = 0; l < products.length; l++) {
                            if (products[j].id === products[l].id) {
                                count++;
                                if ((count > 1)) {
                                    products.splice(l, 1);
                                    products[j].quantity = count;
                                    console.log("count is " + count + " quantity is " + products[j].quantity)

                                    l = 0;
                                }
                            }
                            
                        }

                        if (products[j].quantity) {
                                totalPrice += parseInt(products[j].price) * parseInt(products[j].quantity);
                                console.log("product.price " + products[j].price + " quantity" + products[j].quantity + "Total " + totalPrice);

                            }

                    }
                    console.log("inside if statement for equals and k is : " + k +" & total is "+ totalPrice);


                    res.render('cartCookie', {
                        page: {
                            header: "Shopping Cart",
                            title: "Shopping Cart",
                            myCart: products,
                            subtotal: totalPrice,
                            script: "<script  type='text/javascript' src='../js/aboutClient.js'></script>"
                        }
                    });

                        res.cookie("cart2", products);
                       res.cookie("total2", totalPrice);
                    return;

                }
            });


        }

        // else {

        //     console.log("inside ELSE for quantity for products");

        //     console.log(prodcuts[products.indexOf(req.cookies.test[i].name)]);

        //     products[products.indexOf(req.cookies.test[i].name)].quantity++;
        // }
    }



    function rendata(data) {

        console.log("Final product datais :" + data);
        res.send(true);

    }


});



router.get('/deleteFromCart/:id', function(req, res, next) {
    console.log("inside cart delete route");
    var deleteID = req.params.id;
    var userId = req.session.userid;
    console.log("id: " + userId + "deleteID: " + deleteID);
    var route = "http://localhost:8080/MacroCenter/rest/deleteCartItem/" + deleteID;
    console.log(route);
    request.del(route);
    res.redirect("/");


});



router.get('/checkout', function(req, res, next) {
    console.log("inside checkout route");
    res.render('checkout', {
        page: {
            header: "Checkout",
            title: "Checkout",
            // cart: cart,
            script: "<script  type='text/javascript' src='../js/checkoutClient.js'></script>"
        }
    });
});

router.get('/checkout/orderplaced', function(req, res, next) {
    console.log("inside orderplaced route");
    res.render('orderplaced', {
        page: {
            header: "Order Placed",
            title: "Order Placed",
            // cart: cart,
            // script: "<script  type='text/javascript' src='../js/orderplacedClient.js'></script>"
        }
    });
});

module.exports = router;
