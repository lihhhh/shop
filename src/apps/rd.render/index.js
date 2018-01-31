import angular from 'angular';
require('./index.css');

var shopApp = angular.module('shopApp');

shopApp.directive('render',['$compile','eventbus','$timeout',function($compile,eventbus,$timeout){
	return {
		restrict: 'AE',
		transclude:true,
		scope:{
			editor:'=',
			editors:'='
		},
		link: function($scope,$ele,$attr){
			// $scope.editor.menu = {
			// 	isShow : false,
			// 	hover : false
			// }

			draw();

			function draw(){
				console.log('render');
				if($scope.editor.type){
					var el = '<'+$scope.editor.type+'  editor="editor" class="render-box" editors="editors"></'+$scope.editor.type+'>';

					el = $compile(el)($scope);

					$ele.html('');
					$ele.append(el);
				}
			}

			eventbus.subscribe('render',()=>{
				draw();
				// $timeout(()=>{draw();},0);
			});

			$scope.$watch('editor.idx',function(){
				$scope.editors.sort(function(a,b){
            		return a.idx - b.idx;
            	});
				draw();
			});
		}
	};
}]);