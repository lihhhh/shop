import angular from 'angular';
var tpl = require('./main.template.js');

var shopApp = angular.module('shopApp');

shopApp.directive('rdMain',[function(){
	return {
		restrict : 'AE',
		template : tpl,
		link : function($scope){
			$scope.editorList = [{
	                'name': '111',
	                'type': 'a1'
	            },
	            {
	                'name': '222',
	                'type': 'a1'
	            },
	            {
	                'name': '333',
	                'type': 'a1'
	            },
	            {
	                'name': '444',
	                'type': 'a1'
	            },{
	                'name': '111',
	                'type': 'a1'
	            },
	            {
	                'name': '222',
	                'type': 'a1'
	            },
	            {
	                'name': '333',
	                'type': 'a1'
	            },
	            {
	                'name': '444',
	                'type': 'a1'
	            },{
	                'name': '111',
	                'type': 'a1'
	            },
	            {
	                'name': '222',
	                'type': 'a1'
	            },
	            {
	                'name': '333',
	                'type': 'a1'
	            },
	            {
	                'name': 'hhh',
	                'type': 'a1'
	            }
	        ];
		}
	};
}])