import angular from 'angular';

var shopApp = angular.module('shopApp');

shopApp.service('rsMain',['$http','$q',function($http,$q){
	this.saveJson = function(params){
		var _q = $q.defer();
		return $http({
			method:'Post',
			params:params,
			url:'WeChatData'
		})
	};

	this.getJson = function(params){
		var _q = $q.defer();
		return $http({
			method:'GET',
			params:params,
			url:'WeChatData'
		})
	}

}])