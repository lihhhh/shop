import angular from 'angular';

var shopApp = angular.module('shopApp');

shopApp.service('rsMain',['$http','$q',function($http,$q){
	this.saveJson = function(params){
		var _q = $q.defer();
		return $http({
			method:'Post',
			// data:params,
			data:'json='+JSON.stringify(params.json),
			url:'SaveWeChatData',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
	};

	this.getJson = function(params){
		var _q = $q.defer();
		return $http({
			method:'GET',
			params:params,
			url:'GetWeChatData'
		})
	}

}])