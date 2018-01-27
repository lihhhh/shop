import angular from 'angular';
import _ from 'lodash';

import $ from 'jquery';

var shopApp = angular.module('shopApp');

shopApp.directive('dragComponent', ['$timeout', function ($timeout) {
  return {
    restrict: 'AE',
    replace:true,
    scope:{ 
      config:'=dragComponent'
    },
    template: ['<div ng-mousedown="dragDown()" style="{{style}}">',
              '</div>'].join(''),
    link: function ($scope, $element, $attrs) {
      $scope.style = [
        'width : 100%',
        'height : 100%'
      ].join(';');

      debugger

      $scope.dragDown = function(){
        $scope.config.isMouseDown = true;
        $(document).on('mouseup.drag.up',function(){
         // console.log('mouseup');
          $scope.config.isMouseDown = false;
          $(document).unbind('.drag');
          $scope.beforeX = null;
          $scope.beforeY = null;
          $scope.config.moveX = 0;
          $scope.config.moveY = 0;
          if(typeof $scope.config.mouseup === 'function'){
            $scope.config.mouseup($scope.config);
          }
        })
        $(document).on('mousemove.drag.move',function(e){
          if(/\d+/.test($scope.beforeX)&&/\d+/.test($scope.beforeY)){
            $scope.config.moveX = e.pageX - $scope.beforeX;
            $scope.config.moveY = e.pageY - $scope.beforeY;
          }
          $scope.beforeX = e.pageX;
          $scope.beforeY = e.pageY;
          if(typeof $scope.config.mousemove === 'function'){
            $scope.config.mousemove($scope.config);
          }
          
          $scope.$apply(function(){
            $scope.config;
          })
        })
      };
      
      
    }
  }
}]);
