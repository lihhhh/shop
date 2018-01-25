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
				<div class="rd-search-out">
					<input text="text" name="keyWord" placeholder="请输入商品关键字">
					<button type="button"></button>

				</div>
			</div>
		`,
		link: function($scope){
			
		}
	};
}]);