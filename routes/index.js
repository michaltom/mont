var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MONTOSTAL' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'MONTOSTAL' });
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery', { title: 'MONTOSTAL' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'MONTOSTAL' });
});


module.exports = router;
