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
					<div class="title-style" ng-class="'title-style-'+editor.model.class.code">
						<span>{{editor.model.title}}</span>
					</div>
					<rd-drag editor="editor" editors="editors"></rd-drag>
				</div>
				<rd-tips  ng-show="editor.menu.isShow">
					<div class="rd-title-tips">
						<div class="rd-title-group clearfix">
							<label class="rd-title-tips-title" for="">标题：</label>
							<input type="text" placeholder='标题名称' ng-model="editor.model.title"/>
						</div>
						<div class="rd-title-group clearfix">
							<label class="rd-title-tips-title" for="style">显示类型：</label>
							<span ng-repeat="stl in styleArr">
								<input type="radio" name='style{{$id}}' id="rd-title-tips-style{{stl.code}}" ng-checked="editor.model.class.code==stl.code" ng-click="selectClass(stl)"/><label class="style-group" for="rd-title-tips-style{{stl.code}}">{{stl.name}}</label>
							</span>
						</div>
						<div class="rd-title-group clearfix">
							<label class="rd-title-tips-title" for="">显示方式：</label>
							<span ng-repeat="shw in showArr">
								<input type="radio" id="rd-title-tips-show{{shw.code}}" ng-checked="editor.model.show.code==shw.code" ng-click="selectShow(shw)" name='show{{$id}}'/><label class="style-group" for="rd-title-tips-show{{shw.code}}">{{shw.name}}</label>
							</span>
						</div>
					</div>
				</rd-tips>
			</div>
		`,
		link: function($scope){

			$scope.styleArr = [
				{
					name:'样式一',
					code:1
				},{
					name:'样式二',
					code:2
				},{
					name:'样式三',
					code:3
				},{
					name:'样式四',
					code:4
				}
			];

			$scope.showArr = [
				{
					name:'居中',
					code:1
				},{
					name:'居左',
					code:2
				},{
					name:'居右',
					code:3
				}
			];

			if(!$scope.editor.model){
				$scope.editor.model = {
					title:'标题名称',
					class:$scope.styleArr[0],
					show:$scope.showArr[1]
				};
			}

			$scope.isClick = function(){
				$scope.editors.map(function(it){
					it.menu.isShow = false;
				})
				$scope.editor.menu.isShow = !$scope.editor.menu.isShow;
			}

			

			

			$scope.selectClass = function(it){
				$scope.editor.model.class = it;
			}

			$scope.selectShow = function(it){
				$scope.editor.model.show = it;
			}

		}
	};
}]);