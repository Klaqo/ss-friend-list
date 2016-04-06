
var express = require('express');
var router = require('./api');
var parser = require('body-parser');


var app = express();

require('./database');
require('./seed');

app.set('view engine', 'jade');

app.use('/static',express.static('public'));
app.use(parser.json());

app.get('/', function(req, res){
  res.render('index');
  console.log('Home page loaded.');
});

app.get('/games/:id', function(req, res){
  var id = req.params.id;
  res.render('game', {id: id});
});

app.get('/admin', function(req, res){
  res.render('TEMPADMIN');
});

app.use('/api', router);

app.listen(3000, function() {
  console.log('The server is running on port 3000!');
});
