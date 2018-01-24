import angular from 'angular';
import styles from './main.css';

var shopApp = angular.module('shopApp');

shopApp.directive('rdMain',[function(){
	return {
		restrict : 'AE',
		template : `
			<div>
			    <div class="left-menu pull-left">
				    <ul class="editorList-ul">
				        <li ng-repeat="item in editorList track by $index"  ng-click="editorTitleClick(item)">{{item.name}}</li>
				    </ul>
			    </div>
			    <div class="center-phone pull-left">
				    <div class='phone-style'>
					    <div class="phone-header"></div>
					    <div class="phone-status"></div>
					    <div class="phone-main">
						    <ul>
							    <li ng-repeat="editor in editorDrapnum track by $index">
								    <render editor="editor"></render>
							    </li>
						    </ul>
					    </div>
				    </div>
			    </div>
			</div>
		`,
		link : function($scope){
			$scope.editorList = [
				{
	                'name': '标题',
	                'type': 'rd-title'
	            },
	            {
	                'name': '222',
	                'type': 'a1'
	            },
	            {
	                'name': '333',
	                'type': 'a1'
	            },
	            {
	                'name': '444',
	                'type': 'a1'
	            },{
	                'name': '111',
	                'type': 'a1'
	            },
	            {
	                'name': '222',
	                'type': 'a1'
	            },
	            {
	                'name': '333',
	                'type': 'a1'
	            },
	            {
	                'name': '444',
	                'type': 'a1'
	            },{
	                'name': '111',
	                'type': 'a1'
	            },
	            {
	                'name': '222',
	                'type': 'a1'
	            },
	            {
	                'name': '333',
	                'type': 'a1'
	            },
	            {
	                'name': 'hhh',
	                'type': 'a1'
	            }
	        ];
	        $scope.editorDrapnum = [];

	        //添加
            $scope.editorTitleClick = function(item) {
                // $scope.editorNum = $scope.editorNum + 1;
                $scope.editorDrapnum.push(item);
            }
		}
	};
}])