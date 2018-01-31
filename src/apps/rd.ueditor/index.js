// window.UMEDITOR_HOME_URL = '/abc';
import $ from 'jquery';
import angular from 'angular';
require('./index.css');
require('./../../ueditor/themes/default/css/umeditor.css');

require('./../../ueditor/umeditor.config.js');
require('./../../ueditor/umeditor.min.js');
require('./../../ueditor/lang/zh-cn/zh-cn.js');




var shopApp = angular.module('shopApp');

shopApp.directive('rdUeditor',['$timeout','$compile','eventbus',function($timeout,$compile,eventbus){
	var i =0;
	return {
		restrict: 'AE',
		scope: {
			editor:'=',
			editors:'='
		},
		template: `
			<div class="ps-r">
				<div class="rd-ueditor-box" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
					<div class="rd-ueditor-html">
					</div>
					<rd-drag editor="editor" editors="editors"></rd-drag>
				</div>
				<rd-tips  ng-show="editor.menu.isShow">
					<div class="rd-title-tips">
						<div id="myEditor{{idx}}" style="width:536px;height:240px;"><p>『富文本编辑器』</p></div>
					</div>
				</rd-tips>
			</div>
		`,
		link: function($scope,$ele){
			i++
			$scope.idx=i;
			// if(i%2) return;
			$timeout(function(){
				if(!$('#myEditor'+$scope.idx).length) return;
				// alert($scope.idx);
				// UM.getEditor('myEditor'+$scope.idx).destroy();
				var um = UM.getEditor('myEditor'+$scope.idx);
				console.log(um);
				debugger
				um.addListener("contentChange",function(){
					draw('<div>'+um.getContent()+'</div>');
					$scope.editor.model.edInnerHTML = '<div>'+um.getContent()+'</div>';
					// 刷新手机内容区高度
				    eventbus.broadcast('calc.phone.main.height',{});
				});

				

				if(!$scope.editor.model){
					$scope.editor.model = {
						edInnerHTML: '<div>'+um.getContent()+'</div>'
					};
				}else{
					um.setContent($scope.editor.model.edInnerHTML);
				}

				draw('<div>'+$scope.editor.model.edInnerHTML+'</div>')
			})


			function draw(el){
				el = $compile(el)($scope);
				$($ele).find('.rd-ueditor-html').html('');
				$($ele).find('.rd-ueditor-html').append(el);
			}

			


			// UM.getEditor('myEditor').getContent()
		}
	};
}]);