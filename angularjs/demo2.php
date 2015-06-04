<!DOCYPTE HTML>
<html ng-app="myApp">
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="./js/angular.min.js"></script>
<script type="text/javascript" src="./js/demo2.js" ></script>
</head>
<body>
<!-- 内置指令: -->

<!-- ng-disabled="true"   按钮会一直禁用, 直到哟过户在文本中输入内容 ng-disabled="false"为解禁, true 为禁止-->
<input type="text" ng-model='loginName'  />
<input  type="button" value="确认"   ng-disabled="!loginName" />
</br>
<textarea ng-disabled="isDisabled">在5秒后自动解禁止进行输入</textarea>
</br>


<!-- ng-readonly="true" 将该输入框设为只读, false 解禁-->
<input type="text" ng-readonly="true" value="朱彪" />
</br>

<!-- ng-checked="true" 表示选中, false表示未选中
 这里的ng-model 所返回的就是 ture/false , 因为checkbox的类型关系, -->
<label>{{ isCheckbox }}</label>
<input type="checkbox" ng-model="isCheckbox" ng-init=" isCheckbox='true'" ng-checked="isCheckbox" >
</br>

<!-- ng-selected 可以对是否出现option标签的selected属性进行绑定 -->
<input type="checkbox"  ng-model="isTwo" />
<input type="checkbox"  ng-model="isthree" />
<select>
	<option>one</option>
	<option ng-selected="isTwo">two</option>
	<option ng-selected="isthree">three</option>
</select>
</br>

<!-- ng-href : 替代原生态href, 好处是 如果这里使用插值,那么会等运算得出结果再加入href标签-->
<a ng-href="{{ myHref }}">baidu.com</a>
<!-- ng-src : 替代原生态src, 同上-->
<img ng-src="{{ mySrc }}" />


</body>
</html>