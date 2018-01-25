import angular from 'angular';
import styles from './rd.search.css';
import _ from 'lodash';

var shopApp = angular.module('shopApp');

shopApp.directive('rdSearch',['$timeout',function($timeout){
	return {
		restrict: 'AE',
		scope: {
			editor:'=',
			editors:'='
		},
		template: `
			<div class="ps-r">
				rororoorororroor
			</div>
		`,
		link: function($scope){
			
		}
	};
}]);