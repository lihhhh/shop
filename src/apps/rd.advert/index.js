import angular from 'angular';
import styles from './rd.advert.css';
import _ from 'lodash';
var WebUploader = require('../common/webuploader.js');
import defaultImg from './../../static/waitupload.png';

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
					<div class="advert-img" ng-repeat="it in editor.model.textNavDatasDiv" ng-style="{
						marginBottom:editor.model.height+'px',
						background:'url('+it.src+') no-repeat',
						backgroundSize: '100% 100%'
					}"></div>
					<div class='advert-radius-box'>
						<div>
							<span ng-repeat="it in editor.model.textNavDatasDiv"></span>
						</div>
					</div>
					<rd-drag editor="editor" editors="editors"></rd-drag>
				</div>
				<rd-tips  ng-show="editor.menu.isShow">
				<p class="rd-title-tips-12">
					<div class="advert-up clearfix">
						<div class="advert-up-one clearfix">
							<span>显示方式：</span>
							<input class="one-span "  id ="advert-up-one-radio" type="radio" ng-checked = "editor.model.adventRadioShow.code==1"  ng-click="adventRadioClick(1,'折叠轮播')" value="折叠轮播">
							<label class="style-group" for="advert-up-one-radio">折叠轮播</label>
							<input class="one-span " id="advert-up-one-radio2" type="radio" ng-checked = "editor.model.adventRadioShow.code==2"  ng-click="adventRadioClick(2,'分开显示')" value="分开显示">
							<label class="style-group" for="advert-up-one-radio2">分开显示</label>
						</div>
						<div class="advert-down-two clearfix">
							<span>整体上下留白：</span>
							<input class="one-span "  id ="advert-up-two-radio" type="radio" ng-checked = "editor.model.ztsxlb.code==1"  ng-click="ztsxlbClick(1,'是')" value="折叠轮播">
							<label class="style-group" for="advert-up-two-radio">是</label>
							<input class="one-span " id="advert-up-two-radio2" type="radio" ng-checked = "editor.model.ztsxlb.code==2"  ng-click="ztsxlbClick(2,'否')" value="分开显示">
							<label class="style-group" for="advert-up-two-radio2">否</label>
						</div>
						<div class="advert-down-three clearfix" ng-show="editor.model.adventRadioShow.code==2">
							<label class="rd-blankness-tips-title pull-left" style="width:118px" for="style">每张图片上下距离：</label>
							<div class="rd-blankness-drag-box pull-left">
								<span class="rd-blankness-content" ng-style="{'left':ps.left+'px'}"><div drag-component="config"></div></span>
							</div>
							<span class="rd-blankness-val pull-left" for="style">{{ps.height}}px</span>
						</div>
					</div>&nbsp;
					<div class="advert-center rd-texnav-right-inout">
						<div class="rd-advert-box-repeat border-color" ng-repeat="item in editor.model.textNavDatasDiv">
							<div class="rd-texnav-right-inout-in2-icon">
							<a  class="j-del" ng-click="deleteEditor($event,item)"><i class="iconfont"></i></a>
							<a  class="j-movedown" ng-click="moveEditor($event,1,item)"><i class="gicon-arrow-down"></i></a>
							<a  class="j-moveup"  ng-click="moveEditor($event,-1,item)"><i class="gicon-arrow-up"></i></a>
							</div>
							<div class="advert-img-box" id="picker{{pickerId+'-'+$index}}">
								<img ng-src="{{item.src}}" width=90 height=90 alt="" />
								<div class="advert-img-box-top">选择图片</div>
							</div>
							<p class="rd-advert-p pl-12">链接到：
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
							<div class="rd-advert-div rd-advert-p">
								<span>标题：</span><input type="text" placeholder='' value="" ng-model="item.selectName"/>
							</div>
							<div class="rd-advert-p rd-advert-div">
								<span>图片尺寸：</span>750*360
							</div>
						</div>
					</div>
					<div class="advert-down rd-texnav-right-inout-in-fiexd"  ng-click="editorTitleClick()">+</div>

				</p>
				</rd-tips>
			</div>
		`,
		link: function($scope){
			$scope.pickerId = $scope.$id;
			$scope.config = {
        		mousemove:function(cfg){
        			if(!cfg.moveX) return;
        			$scope.ps.left+=cfg.moveX;
        			$scope.ps.left = $scope.ps.left<0?0:$scope.ps.left;
        			$scope.ps.left = $scope.ps.left>284?284:$scope.ps.left;
        			$scope.ps.height = parseInt($scope.ps.left/284*20);

        			$scope.editor.model.height = $scope.ps.height;
        			$scope.editor.model.left = $scope.ps.left;
        		}
        	};

			$scope.textNavDatasDiv = [
				{
					"select":"",
					"selectName":'',
					src:defaultImg
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
            	$scope.editor.model.textNavDatasDiv.push({
					"select":"",
					"selectName":'',
					src:defaultImg
				});
				addWatch();
            }

			$scope.listSelect = function(it,item){
				item.select = it.name;
				item.selectName=it.name;
				$scope.textnav = false;
				$scope.editor.model.showSelect=false;
			}
			// 单选
			$scope.adventRadio = false;
			$scope.adventRadioClick = function(code,name){
				$scope.editor.model.adventRadioShow = {
					code:code,
					name:name
				};
			}

			$scope.ztsxlbClick = function(code,name){
				$scope.editor.model.ztsxlb = {
					code:code,
					name:name
				};
			}



			if(!$scope.editor.model){
				$scope.editor.model = {
					height:10,
					left:142,
					textNavDatasDiv:$scope.textNavDatasDiv,
					showSelect:true,
					adventRadioShow:{
						code:1,
						name:'折叠轮播'
					},
					ztsxlb:{
						code:1,
						name:'是'
					}
				};
			}else {
				$scope.ps = {
	        		left:$scope.editor.model.left,
	        		height:$scope.editor.model.height
	        	};
			}

			addWatch();

			function addWatch(){
				$timeout(function() {
					$scope.editor.model.textNavDatasDiv.map(function(it,idx){
						
						var uploader = WebUploader.create({
						    // 文件接收服务端。
						    server: '/Seller/Tool/Upload?operation=uploaduseravatar',

						    // 选择文件的按钮。可选。
						    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
						    pick: {
				                id: '#picker'+$scope.$id+'-'+idx
				            },

						    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
						    resize: false
						});

						uploader.on('fileQueued',function(a,b,c){
							debugger
							uploader.upload();
						})

						uploader.on('uploadSuccess',function(a,data,c){
							debugger
							it.src = data.url;
						})
					})
				}, 10);
				
			}
			
		}
	};
}]);