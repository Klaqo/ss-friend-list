var Game = require('./models/game.js');
var Friendlist = require('./models/friendlist.js');

var games = [
    {
      "id": 0,
      "name": "Disney Magic Kingdoms",
      "developer": "Gameloft"
    },
    {
      "id": 1,
      "name": "SimCity BuildIt",
      "developer": "Electronic Arts"
    },
    {
      "id": 2,
      "name": "Miitomo",
      "developer": "Nintendo"
    },
    {
      "id": 3,
      "name": "Clash of Clans",
      "developer": "Supercell"
    }
];

var friendlists = [
  {
    "game_id": 0,
    "username": "Sam Sycamore",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 0,
    "username": "Sam Flan",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 0,
    "username": "Sam Flipfloop",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 0,
    "username": "Sammelin Sycamore",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 1,
    "username": "Sam Syscamore",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 1,
    "username": "Sam Fslan",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 1,
    "username": "Sam Flispfloop",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 1,
    "username": "Sammelin Sycasmore",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 2,
    "username": "Sam Sycamodre",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 2,
    "username": "Sam Fldan",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 2,
    "username": "Sam Flipfldoop",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 2,
    "username": "Sammelidn Sycamore",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 3,
    "username": "Sam Sywcamore",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 3,
    "username": "Sam Fwlan",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 3,
    "username": "Sam Flipfloopw",
    "message": "Here is a sample message!"
  },
  {
    "game_id": 3,
    "username": "Sammelwin Sycamore",
    "message": "Here is a sample message!"
  },
];


games.forEach(function(game, index){
  Game.find({'id': game.id}, function(err, games){
    if(!err && !games.length){
      Game.create({id: game.id, name: game.name, developer: game.developer});
    }
  });
});


friendlists.forEach(function(friendlist, index){
  Friendlist.find({}, function(err, friendlists){
    if(!err && !friendlists.length){
      Friendlist.create({game_id: friendlist.game_id, username: friendlist.username, message: friendlist.message});
    }
  });
});
