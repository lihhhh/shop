import angular from 'angular';

var shopApp = angular.module('shopApp',[]);
shopApp.controller('shopCtrl',['$scope',function($scope){
	$scope.test = 123;
}])

require('./center.js');