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
					<p class="color-text rd-texnav-in-p">请添加导航连接</p>
					 </div>
					<rd-drag editor="editor" editors="editors"></rd-drag>
				</div>
				<rd-tips  ng-show="editor.menu.isShow">
				<div class="rd-texnav-right">
					<div class="rd-texnav-right-inout">
						<div class="rd-texnav-right-inout-in2 border-color">
							<div class="rd-texnav-right-inout-in2-icon">
							<a  class="j-del"><i class="iconfont"></i></a>
							<a  class="j-movedown"><i class="gicon-arrow-down"></i></a>
							<a  class="j-moveup"  ng-click="moveEditor($event,-1)"><i class="gicon-arrow-up"></i></a>
							</div>
							<p class="rd-texnav-right-inout-in2-p">链接到：<a class="rd-texnav-right-inout-in2-p-link" ng-mouseover="textnav = !textnav" ng-mouseout="textnav = !textnav"><span class="droplist-title">请选择</span>
								<i class="gicon-chevron-down mgl5"></i></a>
							</p>
							<div class="rd-texnav-right-inout-in2-hoverdiv" ng-show="textnav"  ng-mouseover="textnav = true" ng-mouseout="textnav = false">
								<ul class="clearfix">
									<li data-val="1"><a href="javascript:;">选择商品</a></li>
	                                <li data-val="2"><a href="javascript:;">分类导航</a></li>
	                                <li data-val="3"><a href="javascript:;">商品分类</a></li>
	                                <li data-val="4"><a href="javascript:;">品牌专题</a></li> 
	                                <li data-val="24"><a href="javascript:;">品牌列表</a></li>                               
	                                <li data-val="9"><a href="javascript:;">全部商品</a></li>   
	                                <li data-val="14"><a href="javascript:;">自定义页面</a></li>  
	                                <li data-val="5"><a href="javascript:;">营销活动</a></li>  
	                                <li data-val="12"><a href="javascript:;">团购活动</a></li>
	                                <li data-val="13"><a href="javascript:;">限时抢购</a></li>
	                                <li data-val="6"><a href="javascript:;">店铺主页</a></li>
	                                <li data-val="7"><a href="javascript:;">会员主页</a></li>
	                                <li data-val="8"><a href="javascript:;">购物车</a></li>
	                                <li data-val="10"><a href="javascript:;">自定义链接</a></li>
	                                <li data-val="15"><a href="javascript:;">积分商城</a></li>
	                                <li data-val="16"><a href="javascript:;">优惠券列表</a></li>
	                                <li data-val="17"><a href="javascript:;">注册送券</a></li>
	                                <li data-val="18"><a href="javascript:;">选择优惠券</a></li>
	                                <li data-val="19"><a href="javascript:;">火拼团</a></li>
	                                
	                                <li data-val="20" t="1"><a href="javascript:;">周边门店</a></li>
	                                
	                                <li data-val="21"><a href="javascript:;">选择文章</a></li>
	                                <li data-val="25"><a href="javascript:;">文章列表</a></li>
								</ul>
							</div>
							<div class="text-nav-name ">
							<span>导航名称：</span><input type="text">
							</div>
						</div>
						<div class="rd-texnav-right-inout-in-fiexd" >+</div>
					</div>
				</div>
				</rd-tips>
			</div>
		`,
        link: function($scope) {
        	$scope.textnav =false;

        	$scope.moveEditor = function(event,num){
				debugger
				//console
				var nextIdx,
					thisLast,//数组中相邻的上一个元素
					thisBefore;//数组中相邻的下一个元素


				event.stopPropagation();

				$scope.editors.map(function(it){
					it.menu.hover = false;
					it.menu.isShow = false;
				})

				$scope.editor.menu.isShow = true;

				// 获取当前项在数组中的下标
				var arrIdx = rsCommon.getIdx($scope.editors,$scope.editor);

				if(arrIdx>0){
					thisLast = $scope.editors[arrIdx-1];
				}

				if(arrIdx<$scope.editors.length-1){
					thisBefore = $scope.editors[arrIdx+1]
				}

				if(num==-1&&thisLast){
					var tempIdx = $scope.editor.idx;
					$scope.editor.idx = thisLast.idx;
					thisLast.idx = tempIdx;
				}

				if(num==1&&thisBefore){
					var tempIdx = $scope.editor.idx;
					$scope.editor.idx = thisBefore.idx;
					thisBefore.idx = tempIdx;
				}




				// $scope.editors.map(function(it){
				// 	it.menu.hover = false;
				// 	it.menu.isShow = false;
				// })

				// var temp = _.cloneDeep($scope.editor);
				// temp.menu.isShow = true;

				// $scope.editors.splice(idx,1);

				// if(num==-1){
				// 	nextIdx = idx+num<0?0:idx+num;
				// }else{
				// 	var len = $scope.editors.length;
				// 	nextIdx = idx+num>len?len:idx+num;
				// }
				// $scope.editors.splice(nextIdx,0,temp);
			}

        }
    };
}]);