webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(6);

	  var app = angular.module('friendListApp', ['ngAnimate', 'ngRoute', 'vcRecaptcha'], function($locationProvider){
	    $locationProvider.html5Mode(true);
	  });

	__webpack_require__(8);
	__webpack_require__(9);


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(6);

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


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(6);


	angular.module('friendListApp')
	.controller('mainCtrl', function($scope, $rootScope, $location, $window){
	  $scope.fromTop = 0;
	  $window.onscroll = function(){
	    $scope.fromTop = document.body.scrollTop;
	    $scope.$apply();
	  };
	  $rootScope.urlpath = $location.path();
	  $rootScope.gameId = $rootScope.urlpath.replace('/games/', '');
	})
	.controller('gamesCtrl', function($rootScope, $scope, dataService){
	  dataService.getGameList(function(response){
	    var games = response.data.games;
	    $rootScope.games = games;
	  });
	  $scope.addGame = function(){
	    var newGame = $scope.gamesCtrl.games;
	    dataService.addGame(newGame);
	  };
	})
	.controller('gamesDataCtrl', function($rootScope, $scope, dataService){
	  $scope.gameId = $rootScope.gameId;
	  dataService.getGameData($scope.gameId, function(response){
	    var games = response.data;
	    $rootScope.games = games;
	  });
	})
	.controller('listCtrl', function($scope, $rootScope, dataService){
	  $scope.gameId = $rootScope.gameId;
	  dataService.getFriendList($scope.gameId, function(response){
	    var friendlist = response.data;
	    $scope.friendlist = friendlist;
	  });
	  $scope.addUser = function(){
	    var addUser = $scope.listCtrl.friendlist;
	    var newUser = {
	      'username': addUser.username,
	      'message': addUser.message,
	      'game_id': addUser.game_id,
	      'g-recaptcha-response': addUser.recaptchaResponse};
	    dataService.addUserToList(newUser, function(response){
	      $scope.postSuccess = true;
	      console.log('Success');
	      $scope.friendlist.friendlist.push(newUser);
	      $scope.listCtrl.friendlist = {};
	      $scope.postSuccess = true;
	    }, function(err){
	      console.log(err);
	      $scope.postError = err;
	    });
	  };

	  $scope.checkForDupes = function(){
	    for(var i = 0; i < $scope.friendlist.friendlist.length; i++){
	      if ($scope.listCtrl.friendlist.username.toLowerCase() == $scope.friendlist.friendlist[i].username.toLowerCase()){
	        $scope.isDuplicate = true;
	        break;
	      } else {
	        $scope.isDuplicate = false;
	      }
	    }
	  };

	  //Human readable error messages
	  $scope.$watch('postError', function(newValue, oldValue){
	    if (newValue !== oldValue) {
	      $scope.errorHandler();
	    }
	  });

	  $scope.errorHandler = function(){
	    if ($scope.postError.err && $scope.postError.err.match('E11000')){
	      console.log('1');
	      $scope.errMessage = "That username already exists in the list";
	    } else if ($scope.postError.errors && $scope.postError.errors[0].match('The response parameter is missing.')) {
	      console.log('2');
	      $scope.errMessage = "Make sure you complete the reCAPTCHA";
	    }
	  };
	});


/***/ }

});