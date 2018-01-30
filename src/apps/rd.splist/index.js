import angular from 'angular';
import $ from 'jquery';
import styles from './index.css';
import shopView1 from '../../static/shopView1.jpg';
import shopView2 from '../../static/shopView2.jpg';
import shopView3 from '../../static/shopView3.jpg';
import shopView4 from '../../static/shopView4.jpg';

var shopApp = angular.module('shopApp');

shopApp.directive('rdSplist',['$timeout',function($timeout){
	return {
		restrict: 'AE',
		scope: {
			editor:'=',
			editors:'='
		},
		template: `
			<div class="rd-splist-box ps-r"  ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
				<ul class="clearfix">
					<li ng-repeat="it in datas" class="pull-left" ng-class="{
						'rd-splist-style1':editor.model.bjfs.code==1||(editor.model.bjfs.code==3 && ($index==1 || $index==2)),
						'rd-splist-style2':editor.model.bjfs.code==2,
						'rd-splist-style3':editor.model.bjfs.code==3 && $index!=1 && $index!=2,
						'rd-splist-style4':editor.model.bjfs.code==4,
					}">
						<div class="rd-splist-img-box">
							<img src="{{it.src}}" alt=""/>
							<div class='rd-splist-footer-text'>
								<div class="text-left mb-10 pl-6 pr-6" ng-show="editor.model.xszj[0].select&&!(editor.model.bjfs.code==3 && ($index==1 || $index==2))">
									<span class="rd-splist-name">{{it.name}}</span>
								</div>
								<div class="text-left pl-6 pr-6 clearfix">
									<span class="rd-splist-price" ng-show="editor.model.xszj[2].select">¥{{it.price}}</span>
									<span class="pull-right rd-splist-cart" ng-show="editor.model.xszj[1].select"></span>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<rd-drag editor="editor" editors="editors"></rd-drag>
				<!-- 右侧菜单展示 -->
				<rd-tips  ng-show="editor.menu.isShow">
					<div class="rd-title-tips">
						<!-- 布局方式 -->
						<div class="rd-title-group clearfix">
							<label class="rd-title-tips-title" for="style">布局方式：</label>
							<span ng-repeat="it in bjfs">
								<input type="radio" name='style{{$id}}' id="rd-splist-bjfs-tips-style{{it.code}}" ng-checked="editor.model.bjfs.code==it.code" ng-click="selectBjfs(it)"/><label class="style-group" for="rd-splist-bjfs-tips-style{{it.code}}">{{it.name}}</label>
							</span>
						</div>
						<!-- 显示组件 -->
						<div class="rd-title-group clearfix">
							<label class="rd-title-tips-title" for="style">显示组件：</label>
							<div class="rd-splist-content pull-left">
								<span ng-repeat="it in editor.model.xszj" ng-hide="it.code==3&&editor.model.bjfs.code==4||it.code==1&&editor.model.bjfs.code==4">
									<input type="checkbox"   id="rd-splist-xszj-tips-style{{it.code}}" ng-checked="it.select" ng-click="selectXszj(it)"/><label class="style-group" for="rd-splist-xszj-tips-style{{it.code}}">{{it.name}}</label>
								</span>
							</div>
						</div>
						<!-- 优先级 -->
						<div class="rd-title-group clearfix">
							<label class="rd-title-tips-title" for="style">第一优先级：</label>
							<div class="rd-splist-content pull-left">
								<select ng-model='editor.model.oneYxj' ng-change='selectClick()' ng-options='op.name for op in _options'></select>
							</div>
						</div>
						<div class="rd-title-group clearfix">
							<label class="rd-title-tips-title" for="style">第二优先级：</label>
							<div class="rd-splist-content pull-left">
								<select ng-model='editor.model.twoYxj' ng-change='selectClick()' ng-options='op.name for op in _options'></select>
							</div>
						</div>
						<div class="rd-title-group clearfix">
							<label class="rd-title-tips-title" for="style">第三优先级：</label>
							<div class="rd-splist-content pull-left">
								<select ng-model='editor.model.threeYxj' ng-change='selectClick()' ng-options='op.name for op in _options'></select>
							</div>
						</div>

						<!-- 显示商品个数 -->
						<div class="rd-title-group clearfix">
							<label class="rd-title-tips-title" for="style">显示商品个数：</label>
							<span ng-repeat="it in spnum">
								<input type="radio" name='spnum{{$id}}' id="rd-splist-spnum-tips-style{{it.code}}" ng-checked="editor.model.spgs.code==it.code" ng-click="selectSpgs(it)"/><label class="style-group" for="rd-splist-spnum-tips-style{{it.code}}">{{it.name}}</label>
							</span>
						</div>
					</div>
				</rd-tips>
			</div>
		`,
		link: function($scope){
			
			// 布局方式
			$scope.bjfs = [
				{
					name:'小图',
					code:1
				},
				{
					name:'大图',
					code:2
				},
				{
					name:'一大两小',
					code:3
				},
				{
					name:'列表',
					code:4
				},
			];

			// 显示商品个数
			$scope.spnum = [
				{
					name:'6个',
					code:1
				},
				{
					name:'12个',
					code:2
				},
				{
					name:'18个',
					code:3
				}
			];

			// 显示组件
			$scope.xszj = [
				{
					name:'显示商品名 (布局方式为小图的时候不会显示)',
					code:1,
					select:false
				},
				{
					name:'显示购物车图标',
					code:2,
					select:true
				},
				{
					name:'显示价格',
					code:3,
					select:true
				}
			];

			$scope._options = [
				{
					name:'序号越大越靠前',
					code:1
				},
				{
					name:'最热的排在前面',
					code:2
				},
				{
					name:'创建时间越晚越靠前',
					code:3
				},
				{
					name:'创建时间越早越靠前',
					code:4
				},
				{
					name:'销量越高越靠前',
					code:5
				},
				{
					name:'销量越低越靠前',
					code:6
				}
			];


			$scope.datas = [
				{
					src:shopView1,//商品图片
					price:200,//商品价格
					shopCart:true,//是否显示购物车
					name:'第一个商品'//商品名称
				},
				{
					src:shopView2,
					price:200,
					shopCart:true,
					name:'第二个商品'
				},
				{
					src:shopView3,
					price:200,
					shopCart:true,
					name:'第三个商品'
				},
				{
					src:shopView4,
					price:200,
					shopCart:true,
					name:'第四个商品'
				}
			];

			$scope.selectClick=function(){
				$scope.editor.model.oneYxj;
			}
			if(!$scope.editor.model){
				$scope.editor.model = {
					bjfs:$scope.bjfs[0],
					xszj:$scope.xszj,
					oneYxj:$scope._options[0],
					twoYxj:$scope._options[2],
					threeYxj:$scope._options[4],
					spgs:$scope.spnum[0]
				};
			}else{
				for(var i=0;i<$scope._options.length;i++){
					if($scope.editor.model.oneYxj.code == $scope._options[i].code){
						$scope.editor.model.oneYxj = $scope._options[i];
					}

					if($scope.editor.model.twoYxj.code == $scope._options[i].code){
						$scope.editor.model.twoYxj = $scope._options[i];
					}

					if($scope.editor.model.threeYxj.code == $scope._options[i].code){
						$scope.editor.model.threeYxj = $scope._options[i];
					}
				}
				// $scope.editor.model.oneYxj = $scope._options[1]
			}
			


			

			// 布局方式 单选点击事件
			$scope.selectBjfs = function(it){
				$scope.editor.model.bjfs = it;
			};

			// 显示组件 复选框点击事件
			$scope.selectXszj = function(it){
				it.select = !it.select;
			};

			// 显示商品个数 单选框点击事件
			$scope.selectSpgs = function(it){
				$scope.editor.model.spgs = it;
			};

			$scope.$watch('editor.model.bjfs',function(bjfs){
				changeBjfs();
			},true)

			function changeBjfs(){
				if(!$scope.editor.model || !$scope.editor.model.bjfs) return;
				if($scope.editor.model.bjfs.code==1){
					$scope.editor.model.xszj[0].select = false;
				}else if($scope.editor.model.bjfs.code==4){
					$scope.editor.model.xszj[0].select = true;
					$scope.editor.model.xszj[2].select = true;
				}
			}

			$scope.$watch('editor.model.xszj',function(bjfs){
				changeBjfs();
			},true)
			
		}
	};
}]);