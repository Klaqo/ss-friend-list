'use strict';

var angular = require('angular');
require('angular-recaptcha');
require('angular-animate');
require('angular-route');

angular.module('friendListApp')
.service('dataService', function($http){
    this.getUserList = function(cb) {
      $http.get('/api/users').then(cb);
    };
    this.getGameList = function(cb) {
      $http.get('/api/games/').then(cb);
    };
    this.getGameData = function(id, cb) {
      $http.get('/api/games/' + id).then(cb);
    };
    this.addGame = function(game) {
      if (!game._id){
        $http.post('/api/games', game);
      } else {
        console.log('game already posted.');
      }
    };
    this.getFriendList = function(id, cb) {
      $http.get('/api/friendlist/' + id).then(cb);
    };
    this.addUserToList = function(user, successCb, errorCb){
      $http.post('/api/friendlist/', user).success(successCb).error(errorCb);
    };
});
