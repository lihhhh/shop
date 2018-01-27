import angular from 'angular';
import style from './index.css';
import _ from 'lodash';

var shopApp = angular.module('shopApp');

shopApp.directive('rdBlankness', ['$timeout', 'rsCommon', function($timeout, rsCommon) {
    return {
        restrict: 'AE',
        scope: {
            editor: '=',
            editors: '='
        },
        template: `
			<div ng-style="{height:editor.model.height+'px'}" class="ps-r rd-blankness-box" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
				<div></div>
				<rd-drag editor="editor" editors="editors"></rd-drag>

				<rd-tips  ng-show="editor.menu.isShow">
					<!-- 空白高度选择 -->
					<div class="clearfix">
						<label class="rd-blankness-tips-title pull-left" for="style">高度：</label>
						<div class="rd-blankness-drag-box pull-left">
							<span class="rd-blankness-content" ng-style="{'left':ps.left+'px'}"><div drag-component="config"></div></span>
						</div>
						<span class="rd-blankness-val pull-left" for="style">{{ps.height}}px</span>
					</div>
				</rd-tips>
			</div>
		`,
        link: function($scope) {
        	$scope.config = {
        		moveX:'',
        		mousemove:function(cfg){
        			debugger
        			if(!cfg.moveX) return;
        			$scope.ps.left+=cfg.moveX;
        			$scope.ps.left = $scope.ps.left<0?0:$scope.ps.left;
        			$scope.ps.left = $scope.ps.left>284?284:$scope.ps.left;
        			$scope.ps.height = parseInt($scope.ps.left/284*90)+10;

        			$scope.editor.model.height = $scope.ps.height;
        			$scope.editor.model.left = $scope.ps.left;
        		}
        	};

        	if(!$scope.editor.model){
				$scope.editor.model = {
					height:10,
					left:0
				};
			}else {
				$scope.ps = {
	        		left:$scope.editor.model.left,
	        		height:$scope.editor.model.height
	        	};
			}
        }
    };
}]);