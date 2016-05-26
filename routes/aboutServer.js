var express = require('express');
var router = express.Router();
var request = require('request');
var app = express();

console.log("server side about.js route loaded");
router.get('/', function(req, res, next) {
  res.render('about', {
    page: {
      title: "About",
      header: "About Macro Center",
      description : "Macro Center is an e-commerce website where you can purchase something for every one of your hardware and software needs. We give discounts to robots looking to further themselves.<br>",
      contactLink : "<a href = \"/about/contact\">Contact Us</a><br>",
      employeesLink : "<a href = \"/about/employee\">Meet our employees</a>",
      script: "<script  type='text/javascript' src='../js/aboutClient.js'></script>",
    }
  });
});


router.get('/employee', function(req, res, next) {
  console.log("inside employee route");
  var employee = {};
  request('http://localhost:8080/MacroCenter/rest/employee', function(error, r, body) {
    employee = (JSON.parse(body));
    console.log("Inside requst to java Data is  " + employee + " and id is " + employee.id);
    res.render('about', {
      page: {
        header: "Employees",
        title: "Employees",
        employee: employee,
        script: "<script  type='text/javascript' src='../js/aboutClient.js'></script>"
      }
    });
  });
});

router.get('/contact', function(req, res, next)
{
  console.log("inside contact route");
    res.render('about', {
      page: {
        header: "Contact Us",
        title: "Contact Us",
        info: "Address: 7400 East Orchard Road, Suite 1450N, Greenwood Village, CO, 80111 <a href = \"https://www.google.com/maps/place/7400+E+Orchard+Rd,+Greenwood+Village,+CO+80111/@39.6088518,-104.9050174,17z/data=!3m1!4b1!4m2!3m1!1s0x876c86ed5f85ee1b:0x38551d73b5335c2b?hl=en-US%22%20target=%22_blank\" target=\"_blank\">Map</a><br>Phone: <a href=\"tel:+1-800-555-5555\">1-800-555-5555</a><hr>",
        directions: "Directions<br><br>North<br><br>> Take I-25 S to CO-88 W/E Belleview Ave.<br>> Take exit 199 from I-25 S<br>> Take S Quebec St to E Orchard Rd in Greenwood Village<br>> Follow S Quebec St to E Orchard Rd in Greenwood Village<br><br>East<br><br>> Take I-70 W and I-225 S to CO-88 W/E Belleview Ave.<br>> Take exit 1A from I-225 S<br>> Take S Quebec St to E Orchard Rd in Greenwood Village<br><br>South<br><br>> Take I-25 N to E Orchard Rd in Greenwood Village.<br>> Take exit 198 from I-25 N<br>> Drive to E Orchard Rd<br><br>West<br><br>> Take US-285 N to CO-88 W/E Belleview Ave.<br>> Take exit 199 from I-25 S<br>> Take S Quebec St to E Orchard Rd in Greenwood Village",
        script: "<script  type='text/javascript' src='../js/aboutClient.js'></script>"
      }
    });
});

module.exports = router;
