import angular from 'angular';
import style from './rd.drag.css';
import _ from 'lodash';

var shopApp = angular.module('shopApp');

shopApp.directive('rdDrag',['$timeout','rsCommon',function($timeout,rsCommon){
	return {
		restrict: 'AE',
		scope: {
			editor:'=',
			editors:'='
		},
		template: `
			<div class="rd-title-top"  ng-click="isClick()" ng-show="editor.menu.isShow||editor.menu.hover">
				<div class="rd-title-menu">
					<a href="javascript:" ng-click='moveEditor($event,-1)'>上移</a>
					<a href="javascript:" ng-click='moveEditor($event,1)'>下移</a>
					<a href="javascript:">编辑</a>
					<a href="javascript:" ng-click='deleteEditor($event)'>删除</a>
				</div>
			</div>
		`,
		link: function($scope){

			$scope.moveEditor = function(event,num){
				debugger
				//console
				var nextIdx;

				event.stopPropagation();
				var idx = rsCommon.getIdx($scope.editors,$scope.editor);
				$scope.editors.map(function(it){
					it.menu.hover = false;
					it.menu.isShow = false;
				})

				var temp = _.cloneDeep($scope.editor);
				temp.menu.isShow = true;

				$scope.editors.splice(idx,1);

				if(num==-1){
					nextIdx = idx+num<0?0:idx+num;
				}else{
					var len = $scope.editors.length;
					nextIdx = idx+num>len?len:idx+num;
				}
				$scope.editors.splice(nextIdx,0,temp);
			}

			$scope.deleteEditor = function(event){
				event.stopPropagation();
				var idx = rsCommon.getIdx($scope.editors,$scope.editor);
				$scope.editors.splice(idx,1);
			}

			$scope.isClick = function(){
				$scope.editors.map(function(it){
					it.menu.isShow = false;
				})
				$scope.editor.menu.isShow = !$scope.editor.menu.isShow;
			}


		}
	};
}]);