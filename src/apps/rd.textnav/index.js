import angular from 'angular';
import styles from './rd.textnav.css';
import _ from 'lodash';

var shopApp = angular.module('shopApp');
shopApp.directive('rdTextnav', ['$timeout', function($timeout) {
    return {
        restrict: 'AE',
        scope: {
            editor: '=',
            editors: '='
        },
        template: `
			<div class="ps-r" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
				<div class="rd-texnav-out ps-r" >
					<div class="rd-texnav-in">
					<p>请添加导航连接</p>

					 </div>
					<rd-drag editor="editor" editors="editors"></rd-drag>
				</div>
				<rd-tips  ng-show="editor.menu.isShow">
				<div class="rd-texnav-right">
					<div class="rd-texnav-right-inout">
						<div class="rd-texnav-right-inout-in>121</div>
						<div class="rd-texnav-right-inout-in2>22222</div>
					</div>
				</div>
				</rd-tips>
			</div>
		`,
        link: function($scope) {

        }
    };
}]);