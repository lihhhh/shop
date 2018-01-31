import angular from 'angular';
import styles from './rd.advert.css';
import _ from 'lodash';

var shopApp = angular.module('shopApp');

shopApp.directive('rdAdvert',['$timeout','rsCommon',function($timeout,rsCommon){
	return {
		restrict: 'AE',
		scope: {
			editor:'=',
			editors:'='
		},
		template: `
			<div class="ps-r" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
				<div class=" ps-r" >
					<div class="advert-img"></div>
					<rd-drag editor="editor" editors="editors"></rd-drag>
				</div>
				<rd-tips  ng-show="editor.menu.isShow">
				<p class="rd-title-tips-12">
					<div class="advert-up">
						<div class="advert-up-one">
							<span>显示方式：</span>
							<input class="one-span " type="radio" value="折叠轮播">折叠轮播 &nbsp;&nbsp;&nbsp;&nbsp;
							<input class="one-span " type="radio" value="分开显示">分开显示
						</div>
						<div class="advert-down-two">
							<span>整体上下留白：</span>
							<input class="two-span " type="radio" value="是">是 &nbsp;&nbsp;&nbsp;&nbsp;
							<input class="two-span " type="radio" value="否">否
						</div>
					</div>&nbsp;
					<div class="advert-center rd-texnav-right-inout">
						<div class="rd-texnav-right-inout-in2 border-color" ng-repeat="item in editor.model.textNavDatasDiv">
							<div class="rd-texnav-right-inout-in2-icon">
							<a  class="j-del" ng-click="deleteEditor($event,item)"><i class="iconfont"></i></a>
							<a  class="j-movedown" ng-click="moveEditor($event,1,item)"><i class="gicon-arrow-down"></i></a>
							<a  class="j-moveup"  ng-click="moveEditor($event,-1,item)"><i class="gicon-arrow-up"></i></a>
							</div>
							<p class="rd-texnav-right-inout-in2-p">链接到：
								<span class="rd-texnav-right-inout-in2-p-selectList" ng-class="{true:'rd-texnav-selectList-active',false:''}[!!item.select]" >
								{{item.select ? item.select+' | '+item.select : ''}}</span>
								<a class="rd-texnav-right-inout-in2-p-link" ng-mouseover="textnav = !textnav;editor.model.showSelect=true;" ng-mouseout="textnav = !textnav">
								<span class="droplist-title">{{item.select ? '修改':'请选择'}}</span>
								<i class="gicon-chevron-down mgl5"></i></a>
							</p>
							<div class="rd-texnav-right-inout-in2-hoverdiv" ng-show="textnav&&editor.model.showSelect"  ng-mouseover="textnav = true" ng-mouseout="textnav = false">
								<ul class="clearfix">
									<li ng-repeat=" it in textNavDatas" ng-click="listSelect(it,item)"><a href="javascript:;">{{it.name}}</a></li>
								</ul>
							</div>
							<div class="text-nav-name ">
							<span>导航名称：</span><input type="text" placeholder='导航名称' value="导航名称" ng-model="item.selectName"/>
							</div>
						</div>
					</div>
					<div class="advert-down rd-texnav-right-inout-in-fiexd"  ng-click="editorTitleClick()">+</div>

				</p>
				</rd-tips>
			</div>
		`,
		link: function($scope){
			$scope.textNavDatasDiv = [
				{
					"select":"",
					"selectName":''
				}
			];
			$scope.textNavDatas = [
			{"name":'选择商品'},
			{"name":'分类导航'},
			{"name":'商品分类'},
			{"name":'品牌专题'},
			{"name":'品牌列表'},
			{"name":'全部商品'},
			{"name":'自定义页面'},
			{"name":'营销活动'},
			{"name":'团购活动'},
			{"name":'限时抢购'},
			{"name":'店铺主页'},
			{"name":'会员主页'},
			{"name":'购物车'},
			{"name":'自定义链接'},
			{"name":'积分商城'},
			{"name":'优惠券列表'},
			{"name":'注册送券'},
			{"name":'选择优惠券'},
			{"name":'火拼团'},
			{"name":'周边门店'},
			{"name":'选择文章'},
			{"name":'文章列表'},
			];
			$scope.textnav =false;

        	$scope.moveEditor = function(event,num,item){
				var nextIdx,
					thisLast,//数组中相邻的上一个元素
					thisBefore;//数组中相邻的下一个元素


				event.stopPropagation();



				// 获取当前项在数组中的下标
				var arrIdx = rsCommon.getIdx($scope.editor.model.textNavDatasDiv,item);

				$scope.editor.model.textNavDatasDiv.splice(arrIdx,1);

				if(num==-1){
					nextIdx = arrIdx+num<0?0:arrIdx+num;
				}else{
					var len = $scope.editor.model.textNavDatasDiv.length;
					nextIdx = arrIdx+num>len?len:arrIdx+num;
				}
				$scope.editor.model.textNavDatasDiv.splice(nextIdx,0,item);
			}
			$scope.deleteEditor = function(event,it){ 
				if($scope.editor.model.textNavDatasDiv.length<=1){
					return;
				}
				event.stopPropagation();
				var idx = rsCommon.getIdx($scope.editor.model.textNavDatasDiv,it);
				$scope.editor.model.textNavDatasDiv.splice(idx,1);
			}
			//添加
            $scope.editorTitleClick = function() {
            	$scope.editor.model.textNavDatasDiv.push({"select":""});
            }

			$scope.listSelect = function(it,item){
				item.select = it.name;
				item.selectName=it.name;
				$scope.textnav = false;
				$scope.editor.model.showSelect=false;

			}
			if(!$scope.editor.model){
				$scope.editor.model = {
					textNavDatasDiv:$scope.textNavDatasDiv,
					showSelect:true
				};
			}
			
		}
	};
}]);