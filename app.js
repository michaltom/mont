var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post('/contact',function(req,res){
  var data={
    email : req.body.email,
    subj: req.body.subject,
    text: req.body.content
  };

  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mailmtwebxyz@gmail.com",
      pass: "Mail123sender"
    }
  });


  var mailOptions={
    from: data.email,
    sender: data.email,
    to: 'hunterh40@gmail.com',
    subject : data.subj,
    text : data.text

  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      message = "Error" + error;
      return console.log(error);
    }else{
    message ="Email sent"
    console.log('Message sent: ' + info.response);
    }
    //alert(message);
  //  req.flash('info', { msg: message});
    res.redirect('/contact');
  });
});

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


module.exports = app;
