'use strict';

var angular = require('angular');


  var app = angular.module('friendListApp', ['ngAnimate', 'ngRoute', 'vcRecaptcha'], function($locationProvider){
    $locationProvider.html5Mode(true);
  });

require('./services.js');
require('./controllers.js');
