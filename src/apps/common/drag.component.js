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
    template: ['<div ng-mousedown="dragDown($event)" ng-style="style">',
              '</div>'].join(''),
    link: function ($scope, $element, $attrs) {

      // 开始拖动锁  只在第一次拖动时出发 移动时锁上
      var startDragLock =  false;

      $scope.config = $scope.config||{};

      var cursor = $scope.config.cursor || 'inherit';
      $scope.style = {
        'width' : '100%',
        'height' : '100%',
        // 'background' : 'red',
        'cursor' : cursor
      }

      

      $scope.dragDown = function(e){
        $scope.config.isMouseDown = true;
        startDragLock = false;

        // 鼠标在在当前拖动元素中按下的位置
        $scope.config.downOffset = {
          left:e.offsetX,
          top:e.offsetY,
          clientX:e.clientX,
          clientY:e.clientY,
        };

        if(typeof $scope.config.mousedown === 'function'){
          $scope.config.mousedown($scope.config,e);
        }

        $(document).on('mouseup.drag.up',function(e){
          $scope.config.isMouseDown = false;
          $(document).unbind('.drag');
          $scope.beforeX = null;
          $scope.beforeY = null;
          $scope.config.moveX = 0;
          $scope.config.moveY = 0;
          if(typeof $scope.config.mouseup === 'function'){
            $scope.config.mouseup($scope.config,e);
          }
          // 结束拖动
          if(typeof $scope.config.endDrag === 'function'){
            startDragLock = false;
            $scope.config.endDrag($scope.config,e);
          }
        })

        $(document).on('mousemove.drag.move',function(e){
          // 开始拖动
          if(!startDragLock && (Math.abs(e.clientY-$scope.config.downOffset.clientY)>20 || Math.abs(e.clientX-$scope.config.downOffset.clientX)>20) && typeof $scope.config.startDrag === 'function'){
            startDragLock = true;
            $scope.config.startDrag($scope.config,e);
          }

          if(/\d+/.test($scope.beforeX)&&/\d+/.test($scope.beforeY)){
            $scope.config.moveX = e.pageX - $scope.beforeX;
            $scope.config.moveY = e.pageY - $scope.beforeY;
          }
          $scope.beforeX = e.pageX;
          $scope.beforeY = e.pageY;
          if(typeof $scope.config.mousemove === 'function'){
            $scope.config.mousemove($scope.config,e);
          }
          
          $scope.$apply(function(){
            $scope.config;
          })
        })
      };
      
      
    }
  }
}]);
