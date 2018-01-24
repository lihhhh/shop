import angular from 'angular';
import styles from './index.css';

var shopApp = angular.module('shopApp',[]);
shopApp.controller('shopCtrl',['$scope',function($scope){
	$scope.test = 123;
}])

require('./center.js');