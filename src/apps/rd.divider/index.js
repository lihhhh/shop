import angular from 'angular';
import styles from './rd.divider.css';
import _ from 'lodash';

var shopApp = angular.module('shopApp');
shopApp.directive('rdDivider', ['$timeout', function($timeout) {
    return {
        restrict: 'AE',
        scope: {
            editor: '=',
            editors: '='
        },
        template: `
			<div class="ps-r" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
				<div class="rd-divider-out ps-r" >
					<hr />
					<rd-drag editor="editor" editors="editors"></rd-drag>
				</div>
				<rd-tips  ng-show="editor.menu.isShow">
				<div class="rd-divider-line">分割线</div>
				</rd-tips>
			</div>
		`,
        link: function($scope) {

        }
    };
}]);