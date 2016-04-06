(function(){

  var app = angular.module('friendListApp', ['ngAnimate', 'ngRoute'], function($locationProvider){
    $locationProvider.html5Mode(true);
  });

  app.service('dataService', function($http){
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
      this.addUserToList = function(user){
        $http.post('/api/friendlist/', user);
      };
  });


  app.controller('mainCtrl', function($scope, $rootScope, $location, dataService, $window){
    $scope.fromTop = 0;
    $window.onscroll = function(){
      $scope.fromTop = document.body.scrollTop;
      $scope.$apply();
    };
    $rootScope.urlpath = $location.path();
    $rootScope.gameId = $rootScope.urlpath.replace('/games/', '');
  });

  app.controller('gamesCtrl', function($rootScope, $scope, dataService){
    dataService.getGameList(function(response){
      var games = response.data.games;
      $rootScope.games = games;
    });
    $scope.addGame = function(){
      var newGame = $scope.gamesCtrl.games;
      dataService.addGame(newGame);
    };
  });

  app.controller('gamesDataCtrl', function($rootScope, $scope, dataService){
    $scope.gameId = $rootScope.gameId;
    dataService.getGameData($scope.gameId, function(response){
      var games = response.data;
      $rootScope.games = games;
    });
  });


  app.controller('listCtrl', function($scope, $rootScope, dataService){
    $scope.gameId = $rootScope.gameId;
    dataService.getFriendList($scope.gameId, function(response){
      var friendlist = response.data;
      $scope.friendlist = friendlist;
    });
    $scope.addUser = function(){
      var newUser = $scope.listCtrl.friendlist;
      dataService.addUserToList(newUser);
    };
  });


})();
