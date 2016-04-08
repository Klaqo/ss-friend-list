var mongoose = require('mongoose');

var friendListSchema = new mongoose.Schema ({
  game_id: Number,
  username: { type: String, maxlength: 30, unique: true},
  message: { type: String, maxlength: 140},
  createdAt: { type: Date, expires: 259200, default: Date.now}
});



module.exports = mongoose.model('Friendlist', friendListSchema);
