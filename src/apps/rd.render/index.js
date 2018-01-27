import angular from 'angular';

var shopApp = angular.module('shopApp');

shopApp.directive('render',['$compile',function($compile){
	return {
		restrict: 'AE',
		transclude:true,
		scope:{
			editor:'=',
			editors:'='
		},
		link: function($scope,$ele,$attr){
			$scope.editor.menu = {
				isShow : false,
				hover : false
			}

			draw();

			function draw(){
				if($scope.editor.type){
					var el = '<'+$scope.editor.type+' editor="editor" editors="editors"></'+$scope.editor.type+'>';

					el = $compile(el)($scope);

					$ele.html('');
					$ele.append(el);
				}
			}

			$scope.$watch('editor.idx',function(){
				// draw();
			});
		}
	};
}]);