<!DOCYPTE HTML>
<html ng-app="myApp">
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="./js/angular.min.js"></script>
</head>
<script type="text/javascript">
// 服务: 依赖注入机制,当需要用到某个服务, angular可以通过参数注入的形式使用, 前提名字不能当参数随意修改
var myApp1 = angular.module("myApp",[]);
//这里考虑到在生产环境下压缩代码所造成的服务名更变的问题.
myApp1.controller("test1",["$scope","$timeout",function($scope,$timeout){
    $scope.name = "mobbist";

    //延迟服务, 封装了自带得setTimeout方法, 主要区别就是用于触发脏检查器,
    $timeout(function(){
        $scope.name = "HI";
    },2000)
    //这里使用了原生态的,setTimeout, 
    setTimeout(function(){
        //使用apply方法回调手动触发脏检查器,更新视图
        $scope.$apply(function(){
            //在这里的更新的数据会自动更新视图, 否则不会更新. 
            $scope.name = "world";
        });
    },4000);

    //监听数据的变化, 进行相应得处理, 接受3个参数: 监听参数,更新视图以后要执行的回调, 要监听一个数组里所有得数据true 
    $scope.$watch("name",function(){
        console.log(123);
    })
    
    
}]);

</script>
<body>

</body>
<div  ng-controller="test1">{{name}}</div>

</html>