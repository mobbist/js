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
var myApp = angular.module("myApp",[]);


// directive方法就是创建指令: 指令名(注意:标签上以下划线表示,这里就要以驼峰显示), 回调函数
myApp.directive("myDire",function(){
    //返回一个对象, 指令的标准操作
    return {
        //设定指令模式 E是标签指令模式  A是属性指令模式 ,可以同时使用,建议使用A 
        restrict : "A",
        //是否要将定义的这层直接被掉template渲染的内容替换掉
        replace: true,
        //设置在指令内出现的内容, 是否在指令内存在
        transclude : true,
        //可以插入在该指令下的一个模块
        template : "<div ><span ng-click='show({num:5})'>{{name}}</span>{{width}}< span ng-transclude></span></div>",
        //templateUrl 可以指定一个页面, 来作为模板
        //templateUrl : ""
        //scope:true说明该指令拥有独立作用域的功能
        //scope:true
        //scope:{}隔离作用域:不再跟外层的作用域有关联, 在该指令内自己隔离出作用域作用于本指令
        
        //专门针对自定义指令所对应的内部数据的绑定方式
        controller: ["$scope",function($scope){
            //但是要了解,  这个是指令都共享的,  如果指令与指令之间如果想要独立, 在这里就无效了
            $scope.name = "mobbist"
             $scope.show = function(obj){
                alert(obj.num);
            }
        }],
        scope:{
            //这里进行绑定策略: 冒号左边的值等于
            //@name 代表接受外部属性栏上的值, 由于和键值都是一样,所以可以省略后面的name不写 直接 name:"@"
            name : "@",
            //这里就是代表,  属性上的abc和内部的name变量绑定 
            name : "@abc",
            //@就是普通映射,  =就是将属性上的值绑定为变量,  这个变量可能是外部的一个参数, 而且不是像@一样只是绑定一个死的值
            width : "=",
            //调用自定义控制器中的方法parentfn, 如果要给其传掺,则按照如上定义
            parentfn : "&"
        },
        //link:当指令中需要有dom操作的时候使用
        link : function(scope,element,attr){
            // scope : 当前控制器中的数据
            // element :  当前指令的jqueryLite对象(缩小的jquery)
            // attr :   当前指令的属性: 比如   abc   width
        }

    }


});
myApp.controller("myController",["$scope",function($scope){
    $scope.width = "100";
   
}]);
</script>
<body>
<div ng-controller="myController" >
    <div my_dire abc="mobbist" width="width" parentfn="show(obj)" ></div>
    <div my_dire abc="sam" width="width"></div>
</div>
</body>
</html>