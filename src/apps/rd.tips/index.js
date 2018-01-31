import angular from 'angular';
import styles from './rd.tips.css';

var shopApp = angular.module('shopApp');

shopApp.directive('rdTips',[function(){
	return {
		restrict: 'AE',
		transclude:true,
		template: `
			<div class="tips-box">
				<ng-transclude></ng-transclude>
			</div>
		`,
		link: function($scope){
			// alert('tips');
		}
	};
}]);