import angular from 'angular';
import styles from './rd.textnav.css';
import _ from 'lodash';

var shopApp = angular.module('shopApp');
shopApp.directive('rdTextnav', ['$timeout','rsCommon', function($timeout,rsCommon) {
    return {
        restrict: 'AE',
        scope: {
            editor: '=',
            editors: '='
        },
        template: require('./tpl.js'),
        link: function($scope) {
        	$scope.textnav =false;

        	$scope.moveEditor = function(event,num,item){
				var nextIdx,
					thisLast,//数组中相邻的上一个元素
					thisBefore;//数组中相邻的下一个元素


				event.stopPropagation();



				// 获取当前项在数组中的下标
				var arrIdx = rsCommon.getIdx($scope.editor.model.textNavDatasDiv,item);

				$scope.editor.model.textNavDatasDiv.splice(arrIdx,1);

				if(num==-1){
					nextIdx = arrIdx+num<0?0:arrIdx+num;
				}else{
					var len = $scope.editor.model.textNavDatasDiv.length;
					nextIdx = arrIdx+num>len?len:arrIdx+num;
				}
				$scope.editor.model.textNavDatasDiv.splice(nextIdx,0,item);
			}
			$scope.deleteEditor = function(event,it){ 
				if($scope.editor.model.textNavDatasDiv.length<=1){
					return;
				}
				event.stopPropagation();
				var idx = rsCommon.getIdx($scope.editor.model.textNavDatasDiv,it);
				$scope.editor.model.textNavDatasDiv.splice(idx,1);
			}

			$scope.textNavDatas = [
			{"name":'选择商品'},
			{"name":'分类导航'},
			{"name":'商品分类'},
			{"name":'品牌专题'},
			{"name":'品牌列表'},
			{"name":'全部商品'},
			{"name":'自定义页面'},
			{"name":'营销活动'},
			{"name":'团购活动'},
			{"name":'限时抢购'},
			{"name":'店铺主页'},
			{"name":'会员主页'},
			{"name":'购物车'},
			{"name":'自定义链接'},
			{"name":'积分商城'},
			{"name":'优惠券列表'},
			{"name":'注册送券'},
			{"name":'选择优惠券'},
			{"name":'火拼团'},
			{"name":'周边门店'},
			{"name":'选择文章'},
			{"name":'文章列表'},
			];
			$scope.textNavDatasDiv = [
				{
					"select":"",
					"selectName":''
				}
			];
			//添加
            $scope.editorTitleClick = function() {
            	$scope.editor.model.textNavDatasDiv.push({"select":""});
            }

			$scope.listSelect = function(it,item){
				item.select = it.name;
				item.selectName=it.name;
				$scope.textnav = false;
				$scope.editor.model.showSelect=false;

			}
			if(!$scope.editor.model){
				$scope.editor.model = {
					textNavDatasDiv:$scope.textNavDatasDiv,
					showSelect:true
				};
			}

        }
    };
}]);