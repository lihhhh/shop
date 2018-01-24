import angular from 'angular';

var shopApp = angular.module('shopApp');

shopApp.directive('rdTitle',[function(){
	return {
		restrict: 'AE',
		scope: {
			editor:'='
		},
		template: `
			<div>{{editor}}</div>
		`,
		link: function($scope){
			// 测试数据
			$scope.editor.test = 'hello';
		}
	};
}]);