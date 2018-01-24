import angular from 'angular';
require('./main.service.js');
require('./main.directive.js');


var shopApp = angular.module('shopApp');

shopApp.controller('rcMain',['$scope',function($scope){
	// someting
}])