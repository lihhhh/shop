import $ from 'jquery';
import angular from 'angular';
import styles from './index.css';
import common from './common.css';

window.jQuery = $;
window.$ = $;

var shopApp = angular.module('shopApp',[require('angular-sanitize')]);
shopApp.controller('shopCtrl',['$scope',function($scope){
	$scope.test = 123;
}])

require('./center.js');