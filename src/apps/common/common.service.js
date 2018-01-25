import angular from 'angular';
import _ from 'lodash';

var shopApp = angular.module('shopApp');

shopApp.service('rsCommon',['$timeout',function($timeout){
	this.getIdx = function(rows,row){
		for(var i=0;i<rows.length;i++){
			if(row == rows[i]){
				return i;
			}
		}
	}
}])