var express = require('express');
var router = express.Router();
var request = require('request');
var app = express();

console.log("server side helpServer.js route loaded");
router.get('/', function(req, res, next) {
  res.render('help', {
    page: {
      title: "Help",
      header: "Help Page",
      description: "Customer Service: <a href=\"tel:+1-800-555-5555\">1-800-555-5555</a>",
      script: "<script  type='text/javascript' src='../js/helpClient.js'></script>",
    }
  });
});
module.exports = router;
