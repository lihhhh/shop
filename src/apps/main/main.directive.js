import $ from 'jquery';
import angular from 'angular';
import styles from './main.css';
import _ from 'lodash';
import img from './../../static/add.png';




var shopApp = angular.module('shopApp');

shopApp.directive('rdMain',['rsMain','$timeout','eventbus',function(rsMain,$timeout,eventbus){
	return {
		restrict : 'AE',
		template : `
			<div class="rd-main-box">
				<!-- 左边菜单 -->
			    <div class="left-menu pull-left">
				    <div class="left-menu-header">
					    <span>添加模块</span>
				    </div>
				    <ul class="editorList-ul clearfix">
				        <li ng-repeat="item in editorList track by $index"  ng-click="editorTitleClick(item,$index)">
					        <span>{{item.name}}</span>
					        <img src="${img}" width=14 height=14 alt="" />
				        </li>
				    </ul>
			    </div>
			    <!-- 手机 -->
			    <div class="center-phone pull-left">
				    <div class='phone-style ps-r' ng-style="{height:phoneHeight+'px'}">
					    <div class="height-100">
						    <div class="phone-header"></div>
						    <div class="phone-status"><span class="phone-status-title">微信首页</span></div>
						    <div class="phone-main height-100 ps-r">
							    <ul>
								    <li ng-repeat="editor in editors track by $index">
									    <div class='drag-here' ng-show="editor.drag.isDragHere">拖放在这里</div>
									    <render  editor="editor" ng-class="{'is-drag':editor.drag.isDrag,'drag-up-animation':editor.drag.isDragUp}" ng-style="{'left':editor.drag.left+'px','top':editor.drag.top+'px'}" editors="editors"></render>
								    </li>
							    </ul>
						    </div>
						    <div class="phone-footer"></div>
					    </div>
				    </div>
			    </div>
			    <!-- 底部保存 -->
			    <div class="diy-actions-submit">
			        <a href="javascript:;" class="btn btn-primary" id="j-savePage" ng-click="saveJson()">保存</a>
			        <a href="javascript:;" class="btn btn-success" id="j-saveAndPrvPage">保存并预览</a>
			        <a href="javascript:;" class="btn btn-danger" id="j-resetToInit">还原到初始模板</a>
			        <a href="javascript:scroll(0,0)" id="j-gotop" class="gotop" title="回到顶部" style="display: inline;"></a>
			    </div>
			</div>
		`,
		link : function($scope,$ele){

			$scope.phoneHeight = 600;

			$scope.editorList = [
				{
	                'name': '富文本',
	                'type': 'rd-ueditor'
	            },
				{
	                'name': '标题',
	                'type': 'rd-title'
	            },
	            {
	                'name': '商品',
	                'type': 'rd-commodity'
	            },
	            {
	                'name': '商品列表',
	                'type': 'rd-splist'
	            },{
	                'name': '商品搜索',
	                'type': 'rd-search'
	            },
	            {
	                'name': '文本导航',
	                'type': 'rd-textnav'
	            },
	            {
	                'name': '图片导航',
	                'type': 'a1'
	            },
	            {
	                'name': '图片广告',
	                'type': 'a1'
	            },{
	                'name': '分割线',
	                'type': 'rd-divider'
	            },
	            {
	                'name': '辅助空白',
	                'type': 'rd-blankness'
	            },
	            {
	                'name': '顶部菜单',
	                'type': 'a1'
	            },
	            {
	                'name': '测试',
	                'type': 'a1'
	            },
	            {
	                'name': '测试',
	                'type': 'a1'
	            },
	            {
	                'name': '测试',
	                'type': 'a1'
	            },
	            {
	                'name': '测试',
	                'type': 'a1'
	            },
	            {
	                'name': '测试',
	                'type': 'a1'
	            }
	        ];
	        $scope.editors = [];

	        //添加
            $scope.editorTitleClick = function(item,idx) {
            	$scope.editors.sort(function(a,b){
            		return a.idx - b.idx;
            	});
            	item = _.cloneDeep(item);
            	if($scope.editors.length>0){
            		var last = $scope.editors[$scope.editors.length-1];
            		item.idx = last.idx+1;
            	}else{
            		item.idx = 1;
            	}

            	$scope.editors.map(function(it){
            		it.menu.isShow = false;
            		it.menu.isShow = false;
            	})

            	// 控制 默认选中
            	item.menu = {
					isShow : true,
					hover : false
				}

				item.drag = {
					isDrag : false,//是否正在拖拽
					isDragUp : false,//拖拽放开动画
					isDragHere : false
				}


                $scope.editors.push(item);
                
                // 设置滚动条到最底部
                $(document).scrollTop($('.center-phone').get(0).scrollHeight-600);
                calcPhoneMainHeight();
            }

         //    rsMain.getJson().then(function(_d){
        	// 	console.log(_d);
        	// 	try{
        	// 		var json = JSON.parse(_d.data.json);
	        		
	        // 		$scope.editors = JSON.parse(json.json).editors;
	        // 		console.log('json:',$scope.editors);
        	// 	}catch(e){
        	// 		console.log('没获取到模板数据');
        	// 	}
        		
        	// });

        	$scope.$watch('editors.model',()=>{
	        	calcPhoneMainHeight();
        	},true)

        	function calcPhoneMainHeight(){
        		console.log('计算main高度');
        		$timeout(function(){
        			$scope.editors.sort(function(a,b){
	            		return a.idx - b.idx;
	            	});
	        		var _h = $('.phone-style ul').height();

	        		$scope.phoneHeight = _h>387?_h+223:600;
        		},0)
        	}

        	eventbus.subscribe('calc.phone.main.height',()=>{
				calcPhoneMainHeight();
			});




            // 保存json数据
            $scope.saveJson = function(){
            	var params = {
            		// editors:JSON.stringify($scope.editors)
            		json:{
            			editors:$scope.editors
            		}
            	};
            	rsMain.saveJson(params).then(function(_d){
            		console.log(_d);
            		alert('保存成功!');
            	});
            };
		}
	};
}])