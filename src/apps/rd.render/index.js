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
			if($scope.editor.type){
				var el = '<'+$scope.editor.type+' editor="editor" editors="editors"></'+$scope.editor.type+'>';

				// var scope = $scope.$new();

				// scope.editor = $scope.editor;

				// scope.editors = $scope.editors;

				el = $compile(el)($scope);

				$ele.html('');
				$ele.append(el);
			}
		}
	};
}]);