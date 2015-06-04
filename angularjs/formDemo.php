<!DOCYPTE HTML>
<html ng-app="myApp">
<head>
<meta charset="utf-8" />
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
<script type="text/javascript" src="./js/angular.min.js"></script>

</head>
<style type="text/css">
input.ng-valid{ border: 1px solid green;} 
input.ng-invalid{ border: 1px solid red;}
</style>
<script type="text/javascript">
/*
标签指令:
前面带有ng开头的指令都是属性指令.  而且有一部分指令是标签:

<a>  a标签, 不同于普通的a标签,会阻止浏览器的默认行为
<select>  被angular重构,组合使用,如下:

color代表的是colors数据里的每一项, 每一项里面也有name,   color.name就是每一项里面的名字.
还要指定 ng-model的值, 因为在选择下拉菜单的时候, 是有数据进行双向绑定的
<select ng-options="color.name for color in colors" ng-model="myColors"></select>



*/


var myApp = angular.module("myApp",[]);
myApp.controller("myController",["$scope",function($scope){


}]);

</script>
<body>
<div ng-controller="myController" >
    <!-- 标签指令大部分是给表单验证所使用的:
    form表单中的属性  novalidata属性是 移除html5表单的默认错误样式
    通过name方式来查找响应的值
     -->
    <form name="myForm" novalidata>
        <!-- required  判断有效值是否为空,如果为空 就在$error对象中出现其属性  "required":true -->
        <!-- ng-minlength="5"  设定其输入框的值数量最小为5,  如果不满足条件 则和以上一个, maxlength 同理 -->
        <!-- ng-pattern  进行正则判断 -->
        <input type="number" name="myNumber" ng-model="number" required ng-minlength="5" ng-maxlength="5" ng-pattern="/^[1-5]/" />
        <!--通过name名查找, $valid  判断是否有效  -->
        <p>{{ myForm.myNumber.$valid }}</p>
        <!--$invalid  判断是否无效  -->
        <p>{{ myForm.myNumber.$invalid }}</p>
         <!--$invalid  判断是否初始值  -->
        <p>{{ myForm.myNumber.$pristine }}</p>
         <!--$invalid  判断是否脏值(改变过的值)  -->
        <p>{{ myForm.myNumber.$dirty }}</p>
        <!--$error  name对象, 如果有效合法就是false, 无效就显示true  {"number":true} -->
        <p>{{ myForm.myNumber.$error }}</p>

        <!-- 
            当满足这些条件的时候, angular会自动在表单中输入某些class值, 自定义这些class样式即可
            在输入框和整个表单 都会同时输入
            ng-valid 验证通过
            ng-invalid 验证失败
         -->
    </form>

</div>
</body>
</html>