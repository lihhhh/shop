import angular from 'angular';
var tpl = require('./main.template.js');

var shopApp = angular.module('shopApp');

shopApp.directive('rdMain',[function(){
	return {
		restrict : 'AE',
		template : tpl
	};
}])