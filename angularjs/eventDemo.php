<!DOCYPTE HTML>
<html ng-app="myApp">
<head>
<meta charset="utf-8" />
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
<script type="text/javascript" src="./js/angular.min.js"></script>
</head>
<script type="text/javascript">
var myapp1 = angular.module("myApp",[]);
// 事件指令:   事件指令和原生的事件的唯一区别就是  支持表达式操作, 写上数据变量名进行传掺,原生不支持这样

// ng-click   ng-dblclick  单/双击事件
// ng-mousedown/up         按下/抬起事件 
// ng-mousenter/leave      移入/移出事件
// ng-mousemove/over/out   移动/移入/移出事件
// ng-keydown/up/press     键盘按下/抬起事件
// ng-focus/blur           获得焦点/失去焦点
// ng-submit               提交事件


// ng-selected      对select下拉框的,option值为true时展示
// ng-change        输入框发生改变时触发
// ng-copy          输入框copy 时触发
// ng-cut           输入框剪切 时触发
// ng-paste         输入框粘贴 时触发


// ng-bind          和表达式{{}}的功能一致, 优点就是可以在数据没有加载进来时不显示   ng-bind ="text"
// ng-bind-template 和ng-bind 的功能一致, 优点是 可以像写表达式一样,进行多个表达式和文字结合 ng-bind-template="{{text}},{{text2}}"
// ng-bind-html     支持html标签, 但需要模块支持 http://www.bootcdn.cn/angular.js/下的 sanitize.min.js,  然后引入模块,ngSanitize
// ng-cloak         和表达式{{}}的功能一致, 优点是通过CSS来进行隐藏, 当输入加载完成再显示,  <div ng-cloak >{{ text}}</div>
// ng-non-bindable  不去解析表达式

//注意: ng-model  在checkBox的组件上  展示的是true  false

myapp1.controller("Test1",["$scope",function(s){
  

}]);
</script>
<body>
    <div ng-controller="Test1">
    <!--  -->


请选择:<select  ng-model="bbb" >
    <option value="上海" >上海</option>
    <!-- 如果选择了这个, 则将onoff的值设置为true, 同时改变所有有关联的视图-->
    <option value="北京" >北京</option>
</select>
<br>
您选择了: {{bbb}}

</div>
</body>
</html>