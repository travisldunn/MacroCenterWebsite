var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'application'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var routes = require('./routes/index');
var company = require("./routes/company");
var products = require("./routes/products");
var shoppingCart = require("./routes/shoppingCart");
var user = require("./routes/user");
var login = require("./routes/login");
var aboutPage = require("./routes/aboutServer");
var helpPage = require("./routes/helpServer");
var cart = require("./routes/cartServer");
var cookiePage = require("./routes/cookie");


// view engine setup

// app.set('views', path.join(__dirname, 'views'));
// app.set("views", __dirname + "/public/");
// app.engine("html", require ("ejs").renderFile);

// app.set("view engine", "html");
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));
var about = require('./lib/about.js');

app.use('/', routes);
app.use('/company', company);
app.use('/products', products);
app.use('/shoppingCart', shoppingCart);
app.use('/user', user);
app.use('/login', login);
app.use('/about', aboutPage);
app.use('/help', helpPage);
app.use('/cart', cart);
app.use('/cookie', cookiePage);
// app.use('/cookietest', cookiePage);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// app.set('port', 3005);
// app.listen(3005, function() {
//     console.log("listening on 3005");
// });

module.exports = app;
