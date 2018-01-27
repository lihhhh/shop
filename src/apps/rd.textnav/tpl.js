module.exports = `
<div class="ps-r" ng-mouseover="editor.menu.hover = true;" ng-mouseout="editor.menu.hover = false;">
				<div class="rd-texnav-out ps-r" >
					<div class="rd-texnav-in" ng-repeat="item in editor.model.textNavDatasDiv">
					<p class="color-text rd-texnav-in-p" >{{item.select ?item.select:'请添加导航连接'}}</p>
					 </div>
					<rd-drag editor="editor" editors="editors"></rd-drag>
				</div>
				<rd-tips  ng-show="editor.menu.isShow">
				<div class="rd-texnav-right">
					<div class="rd-texnav-right-inout">
						<div class="rd-texnav-right-inout-in2 border-color" ng-repeat="item in editor.model.textNavDatasDiv">
							<div class="rd-texnav-right-inout-in2-icon">
							<a  class="j-del" ng-click="deleteEditor($event,item)"><i class="iconfont"></i></a>
							<a  class="j-movedown" ng-click="moveEditor($event,1,item)"><i class="gicon-arrow-down"></i></a>
							<a  class="j-moveup"  ng-click="moveEditor($event,-1,item)"><i class="gicon-arrow-up"></i></a>
							</div>
							<p class="rd-texnav-right-inout-in2-p">链接到：
								<span class="rd-texnav-right-inout-in2-p-selectList" ng-class="{true:'rd-texnav-selectList-active',false:''}[!!item.select]" >
								{{item.select ? item.select+' | '+item.select : ''}}</span>
								<a class="rd-texnav-right-inout-in2-p-link" ng-mouseover="textnav = !textnav;editor.model.showSelect=true;" ng-mouseout="textnav = !textnav">
								<span class="droplist-title">{{item.select ? '修改':'请选择'}}</span>
								<i class="gicon-chevron-down mgl5"></i></a>
							</p>
							<div class="rd-texnav-right-inout-in2-hoverdiv" ng-show="textnav&&editor.model.showSelect"  ng-mouseover="textnav = true" ng-mouseout="textnav = false">
								<ul class="clearfix">
									<li ng-repeat=" it in textNavDatas" ng-click="listSelect(it,item)"><a href="javascript:;">{{it.name}}</a></li>
								</ul>
							</div>
							<div class="text-nav-name ">
							<span>导航名称：</span><input ng-model="item.select" type="text">
							</div>
						</div>
						<!-- common -->
						<div class="rd-texnav-right-inout-in-fiexd" ng-click="editorTitleClick()">+</div>
					</div>
				</div>
				</rd-tips>
			</div>
`