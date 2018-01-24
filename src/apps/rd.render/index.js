import angular from 'angular';

var shopApp = angular.module('shopApp');

shopApp.directive('render',['$compile',function($compile){
	return {
		restrict: 'AE',
		transclude:true,
		scope:{
			editor:'='
		},
		link: function($scope,$ele,$attr){
			debugger
			if($scope.editor.type){
				debugger
				var el = '<'+$scope.editor.type+' editor="editor"></'+$scope.editor.type+'>';
				el = $compile(el)($scope);

				$ele.html('');
				$ele.append(el);
			}
		}
	};
}]);