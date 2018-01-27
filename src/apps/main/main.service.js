import angular from 'angular';

var shopApp = angular.module('shopApp');

shopApp.service('rsMain',['$http','$q',function($http,$q){
	this.saveJson = function(params){
		var _q = $q.defer();
		return $http({
			method:'Post',
			data:params,
			url:'WeChatData',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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