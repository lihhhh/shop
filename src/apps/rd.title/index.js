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
				<div class="rd-title-box" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
					<div class="title-style ps-r" ng-class="{
						'text-style1':editor.model.text.code==1,
						'text-style2':editor.model.text.code==2,
						'text-style3':editor.model.text.code==3,
						'title-style-1':editor.model.class.code==1,
						'title-style-2':editor.model.class.code==2,
						'title-style-3':editor.model.class.code==3,
						'title-style-4':editor.model.class.code==4,
					}">
						<div class="rd-title-box-line" ng-show="editor.model.class.code==3"></div>
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
								<input type="radio" id="rd-title-tips-show{{shw.code}}" ng-checked="editor.model.text.code==shw.code" ng-click="selectText(shw)" name='show{{$id}}'/><label class="style-group" for="rd-title-tips-show{{shw.code}}">{{shw.name}}</label>
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
					name:'居左',
					code:1
				},{
					name:'居中',
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
					text:$scope.showArr[1]
				};
			}

			

			

			

			$scope.selectClass = function(it){
				$scope.editor.model.class = it;
			}


			$scope.selectText = function(it){
				$scope.editor.model.text = it;
			}

		}
	};
}]);