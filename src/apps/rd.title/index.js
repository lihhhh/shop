import angular from 'angular';
import styles from './rd.title.css';
import _ from 'lodash';

var shopApp = angular.module('shopApp');

shopApp.directive('rdTitle',['$timeout',function($timeout){
	return {
		restrict: 'AE',
		scope: {
			editor:'=',
			editors:'='
		},
		template: `
			<div class="ps-r">
				<div class="rd-title-box" ng-click="isClick()" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
					<div class="title-style" ng-class="editor.model.class.className">
						<span>{{editor.model.title}}</span>
					</div>
					<div class="rd-title-top" ng-show="editor.menu.isShow||editor.menu.hover">
						<div class="rd-title-menu">
							<a href="javascript:" ng-click='moveEditor($event,-1)'>上移</a>
							<a href="javascript:" ng-click='moveEditor($event,1)'>下移</a>
							<a href="javascript:">编辑</a>
							<a href="javascript:" ng-click='deleteEditor($event)'>删除</a>
						</div>
					</div>
				</div>
				<rd-tips  ng-show="editor.menu.isShow">
					<div class="rd-title-tips">
						<div class="rd-title-group">
							<label class="rd-title-tips-title" for="">标题：</label>
							<input type="text" placeholder='标题名称' ng-model="editor.model.title"/>
						</div>
						<div class="rd-title-group">
							<label class="rd-title-tips-title" for="style">显示类型：</label>
							<input type="radio" name='style' ng-checked="{{editor.model.class.code=='1'}}" ng-click="selectClass('1')"/><label class="style-group" for="">样式一</label>
							<input type="radio" name='style' ng-checked="{{editor.model.class.code==2}}" ng-click="selectClass('2')"/><label class="style-group" for="">样式二</label>
							<input type="radio" name='style' ng-checked="{{editor.model.class.code==3}}" ng-click="selectClass('3')"/><label class="style-group" for="">样式三</label>
							<input type="radio" name='style' ng-checked="{{editor.model.class.code==4}}" ng-click="selectClass('4')"/><label class="style-group" for="">样式四</label>
						</div>
						<div class="rd-title-group">
							<label class="rd-title-tips-title" for="">显示方式：</label>
							<input type="radio" name='show'/><label class="style-group" for="">居中</label>
							<input type="radio" name='show'/><label class="style-group" for="">居左</label>
							<input type="radio" name='show'/><label class="style-group" for="">居右</label>
						</div>
					</div>
				</rd-tips>
			</div>
		`,
		link: function($scope){
			// 测试数据
			$scope.editor.menu = {
				isShow : false,
				hover : false
			}
debugger
			if(!$scope.editor.model){
				$scope.editor.model = {
					title:'标题名称',
					class:{
						className:'title-style-1',
						code:1
					}
				};
			}

			$scope.isClick = function(){
				$scope.editors.map(function(it){
					it.menu.isShow = false;
				})
				$scope.editor.menu.isShow = !$scope.editor.menu.isShow;
			}

			$scope.deleteEditor = function(event){
				event.stopPropagation();
				var idx = getIdx();
				$scope.editors.splice(idx,1);
			}

			$scope.moveEditor = function(event,num){
				var nextIdx;

				event.stopPropagation();
				var idx = getIdx();
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

			$scope.selectClass = function(code){
				$scope.editor.model.class = {
					code : code,
					className : 'title-style-'+code
				};
			}

			function getIdx(){
				for(var i=0;i<$scope.editors.length;i++){
					if($scope.editor == $scope.editors[i]){
						return i;
					}
				}
			}




		}
	};
}]);