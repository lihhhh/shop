import angular from 'angular';
import style from './index.css';
import _ from 'lodash';

var shopApp = angular.module('shopApp');

shopApp.directive('rdCommodity',['$timeout','rsCommon',function($timeout,rsCommon){
	return {
		restrict: 'AE',
		scope: {
			editor:'=',
			editors:'='
		},
		template: `
			<div class="ps-r margin-all rd-commodity-box" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
				<div>商品</div>
				<rd-drag editor="editor" editors="editors"></rd-drag>
			</div>
		`,
		link: function($scope){


		}
	};
}]);