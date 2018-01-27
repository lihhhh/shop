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
			<div class="ps-r" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
				<div class="rd-search-out ps-r" >
					<input text="text" name="keyWord" placeholder="请输入商品关键字">
					<button type="button"></button>
					<rd-drag editor="editor" editors="editors"></rd-drag>
				</div>
				<rd-tips  ng-show="editor.menu.isShow">
				<p class="rd-title-tips-12">可随意插入任何页面和位置，方便会员快速搜索商品。</p>
				</rd-tips>
			</div>
		`,
		link: function($scope){
			
		}
	};
}]);