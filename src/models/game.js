var mongoose = require('mongoose');

//games.id
//games.name
//games.developer
//games.friendlist link to friend list

var gameSchema = new mongoose.Schema ({
  id: Number,
  name: String,
  developer: String
});

var model = mongoose.model('Game', gameSchema);

module.exports = model;
