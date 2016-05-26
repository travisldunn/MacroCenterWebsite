var express = require('express');
var router = express.Router();
var request = require('request');
var app = express();

console.log("server side product.js route loaded");

// app.get("/", function(req,res)
// {
// });
router.get('/', function(req, res, next) {
  // console.log(req);
  res.render('product', {
    page: {
      header: "Products",
      title: "Products",
      script: "<script  type='text/javascript' src='../js/productClient.js'></script>",
    }
  });
});

router.get('/test', function(req, res, next) {
  console.log("inside testproduct route");

  var testProduct = {};
  request('http://localhost:8080/MacroCenter/rest/testProduct', function(error, r, body) {
    // console.log(JSON.parse(res));
    testProduct = (JSON.parse(body));

    console.log("INside requst to java Data is  " + testProduct + " and id is " + testProduct.id);
    // next();

    res.render('product', {
      page: {
        header: "testProductget",
        title : "Test Product",
        product: testProduct,



        // script: "<script  type='text/javascript' src='../js/xhr.js'></script>",
        script: "<script  type='text/javascript' src='../js/productClient.js'></script>"

      }
      // res.send(body);
    });
  });
  console.log("Data is  " + testProduct + " and id is " + testProduct.id);
});

router.get('/:id', function(req, res, next) {
  console.log("inside product route");
  var productId = req.params.id;
  console.log(productId);
  var product = {};
  var route = 'http://localhost:8080/MacroCenter/rest/product/' + productId;
  request(route, function(error, r, body) {
    product = (JSON.parse(body));
    console.log("Inside requst to java Data is  " + product + " and id is " + product.id);
    res.render('singleProduct', {
      page: {
        header: "Products",
        product: product,
        title: "Products",
        script: "<script  type='text/javascript' src='../js/productClient.js'></script>"
      }
    });
  });
  console.log("Data is  " + product + " and id is " + product.id);
});




router.get('/allProducts', function(req, res, next) {
  console.log("inside all products route");
  var product = {};
  request('http://localhost:8080/MacroCenter/rest/allProducts', function(error, r, body) {
    product = (JSON.parse(body));
    console.log("Inside requst to java Data is  " + product + " and id is " + product.id);
    res.render('product', {
      page: {
        header: "Products",
        product: product,
        title: "Products",
        // script: "<script  type='text/javascript' src='../js/xhr.js'></script>",
        script: "<script  type='text/javascript' src='../../js/productClient.js'></script>"
      }
    });
  });

  console.log("Data is  " + product + " and id is " + product.id);
});
router.get('/reorder', function(req, res, next) {
  var products = res.body.products;
    res.render('product', {
      page: {
        header: "Products",
        product:products ,
        title: "Products",
        script: "<script  type='text/javascript' src='../../js/productClient.js'></script>"
      }
    });
  console.log("Data is  " + product + " and id is " + product.id);
});
router.get('/category/:category', function(req, res, next) {
  console.log("inside category route");
  var category = req.params.category;
  var myproduct = {};
  var query = "http://localhost:8080/MacroCenter/rest/category/" + category;
  console.log("server route query: " + query);
  request(query, function(error, r, body) {
    console.log("inside request category");
    console.log(body);
    // var stringify = JSON.stringify(body);
    // content = JSON.parse(stringify); 
    myproduct = (JSON.parse(body));
  //  console.log("Inside requst to java Data is  " + product + " and id is " + product[0].id);

    res.render('product', {
      page: {
        header: "Products",
        title: "Products",
        product: myproduct,

        script: "<script src=\"../../js/productClient.js\"></script>"
      }
    });
  });
  //console.log("Data is  " + product + " and id is " + product.id);
});

router.get('/search/:id', function(req, res, next) {
  console.log("inside search route");
  var searchTerm = req.params.id;
  var product = {};
  var query = "http://localhost:8080/MacroCenter/rest/search/" + searchTerm;
  console.log("server route search query is : " + query);
  request(query, function(error, r, body) {
    product = (JSON.parse(body));
    // console.log("Inside requst to java Data is  " +product + " and id is " + product[0].id);

    if (product) {
      res.render('product', {
        page: {
          title: "Products",
          header: "Products",
          product: product,
          // script: "<script  type='text/javascript' src='../js/xhr.js'></script>",
          script: "<script type=\"text/javascript\" src=\"../../js/productClient.js\"></script>"
        }
      });
    } else

    {
      console.log("product not found");
    }
  });
});

//test

router.get('/Review', function(req, res, next) {
  request('http://www.google.com', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      // Show the HTML for the Google homepage.
      res.send(body);
    }
  });
});

router.post('/:obj', function(req, res, next) {
  var obj = req.body;
  // var request = require('request');
  request('http://www.google.com/' + obj, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      // Show the HTML for the Google homepage.
      res.send(body);
    }
  });
});




module.exports = router;
