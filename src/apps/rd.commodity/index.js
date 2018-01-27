import angular from 'angular';
import style from './index.css';
import _ from 'lodash';

var shopApp = angular.module('shopApp');

shopApp.directive('rdCommodity', ['$timeout', 'rsCommon', function($timeout, rsCommon) {
    return {
        restrict: 'AE',
        scope: {
            editor: '=',
            editors: '='
        },
        template: `
			<div class="ps-r rd-commodity-box" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
				<div>商品</div>
				<rd-drag editor="editor" editors="editors"></rd-drag>

				<rd-tips  ng-show="editor.menu.isShow">
					<div class="rd-title-tips">
						123
					</div>
				</rd-tips>
			</div>
		`,
        link: function($scope) {

        }
    };
}]);