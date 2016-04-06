var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friendlist', function(err){
  if(err){
    console.log('Failed connecting to mongodb!');
  } else {
    console.log('Successfully connected to Mongo!');
  }
});
