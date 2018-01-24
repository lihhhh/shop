import angular from 'angular';
require('./main.directive.js');

var shopApp = angular.module('shopApp');

shopApp.controller('rcMain',['$scope',function($scope){
	$scope.abc = 456;
}])