import angular from 'angular';
import style from './rd.drag.css';
import _ from 'lodash';
//import $ from 'jquery';


var shopApp = angular.module('shopApp');

shopApp.directive('rdDrag',['$timeout','rsCommon','eventbus',function($timeout,rsCommon,eventbus){
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
				<div drag-component="config"></div>
			</div>
		`,
		controller:function($scope){
			
		},
		link: function($scope){
			var mainOffset={};
			var	renderList='';
			var	excEditor='';

			$scope.config = {
        		cursor:'all-scroll',
        		mousedown:function(cfg,e){
        			mainOffset = $('.phone-main').offset();
        			excEditor = '';
        			

        			// 鼠标按下时 记录拖动元素 原始坐标
        			$scope.drag.startLeft=e.pageX-mainOffset.left-e.offsetX;
        			$scope.drag.startTop=e.pageY-mainOffset.top-e.offsetY;
        		},
        		startDrag:function(cfg,e){
        			renderList = $('.render-box>*');
        			
        			// 设置显示拖到这里
        			$scope.editor.drag.isDragHere = true;
        			$scope.editors.map((it)=>{it.drag.isDrag=false;});
        			$scope.editors.isDrag = false;
        		},
        		mousemove:function(cfg,e){
        			if(!cfg.moveX) return;
        			
        			// 设置正在拖拽
        			$scope.editor.drag.isDrag = true;
        			$scope.drag.left=e.pageX-mainOffset.left-cfg.downOffset.left;
        			$scope.drag.top=e.pageY-mainOffset.top-cfg.downOffset.top;
        			$scope.editor.drag = $scope.drag;
        			impact();
        		},
        		mouseup:function(cfg,e){
        			$scope.drag.left = $scope.drag.startLeft;
        			$scope.drag.top = $scope.drag.startTop;
        			$scope.editor.drag.isDragUp = true;

        			$timeout(function(){
        				$scope.editors.map((it)=>{it.drag.isDragHere=false;});
        				$scope.editor.drag.isDrag = false;
        				$scope.editor.drag.isDragUp = false;

        				if(!excEditor) return;
        				
        				var excIdx = excEditor.idx;

        				$scope.editor.idx = excIdx;

        				$scope.editors.splice($scope.editors.indexOf($scope.editor),1);

        				var endEditors = $scope.editors.slice($scope.editors.indexOf(excEditor));

        				endEditors.map((it,i)=>{
        					it.idx = excIdx + i + 1;
        				})

        				$scope.editors.push($scope.editor);

        				$scope.editors.sort(function(a,b){
		            		return a.idx - b.idx;
		            	});

        				
        				$scope.$apply();
        				// $('render').map(function(){$(this).html('')})
        				eventbus.broadcast('render',{});
        				
        				
        			},600)
        		}
        	};

        	$scope.drag = {
        		top:0,
        		left:0
        	};

        	/*碰撞检测*/
        	function impact(){
        		var dragEl = $('.is-drag');
        		if(!dragEl.length || !renderList) return;
        		var offset = dragEl.offset();
        		for(var i=0;i<renderList.length;i++){
        			var _this = renderList[i];
        			if($(_this).parents('.is-drag').length) continue;
        			var p1X = $(_this).offset().left;
        			var p1Y = $(_this).offset().top;

        			var p2X = p1X+$(_this).width();
        			var p2Y = p1Y+$(_this).height()/2;

        			var m1X = offset.left;
        			var m1Y = offset.top;

        			var m2X = m1X+dragEl.width();
        			var m2Y = m1Y+dragEl.height();

        			// console.log('p1X',p1X,'p2X',p2X,'p1Y',p1Y,'p2Y',p2Y);
        			// console.log('m1X',m1X,'m2X',m2X,'m1Y',m1Y,'m2Y',m2Y);
        			if(!(m1X>p2X || m2X<p1X || m1Y>p2Y || m2Y<p1Y)){
        				$scope.editors.map((it)=>{it.drag.isDragHere=false;});
        				$scope.editors[i].drag.isDragHere = true;
        				excEditor = $scope.editors[i];

        				$scope.drag.startLeft=p1X-mainOffset.left;
	        			$scope.drag.startTop=p1Y-mainOffset.top-80;
        				return;
        			}
        		}
        	}


			$scope.moveEditor = function(event,num){
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

				

            	// eventbus.broadcast('render',{});




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