var $ = require('./ueditor/third-party/jquery.min.js');
window.jQuery = $;
window.$ = $;
import angular from 'angular';
import styles from './index.css';
import common from './common.css';




var shopApp = angular.module('shopApp',[require('angular-sanitize')]);
shopApp.controller('shopCtrl',['$scope',function($scope){
	$scope.test = 123;
}])

require('./center.js');