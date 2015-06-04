<!DOCYPTE HTML>
<html ng-app="myApp">
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="./js/angular.min.js"></script>
</head>
<script type="text/javascript">

//在这里如果这样定义的话, 相当定义了一个全局环境的控制器,需要模块化
// function Test1($scope ,$rootScope){
//     $scope.name = "hello";
// }

//angular模块化: angular和jQuery中的$类似, 全局的一个接口, module作为它的一个方法存在就是用来创建模块的
//该方法指定2个参数: 一个是ng-app的值, 告诉angular 模块从哪里开始,和ng-app的值匹配. 另外一个接受一个数组,当前模块要依赖的其他模块, 用于其他模块间的相互穿插开发, 不需要其他的话就写一个空数组
var myapp1 = angular.module("myApp",[]);

//产生一个模块实例, 可以调用这个方法, 定义一个myApp模块快下的Test1控制器.参数是控制器名, 和要执行的回调
//注意:       这里有一个问题, 依赖注入的$scope服务,是会被压缩工具剪短名字的, 这样就不会调用到这个方法了, 
//解决方法是:  angular提供了一个将依赖注入以数组的形式传掺, 这样就不会改变名字, 且可以合理压缩.
myapp1.controller("Test1",["$scope",function(s){
    s.name= "hello";
}]);
//以上就是一个模块化控制器的标准写法

//不仅可以用来创建控制器, 还可以作别的,比如run方法,当不想使用控制器,而进行一些全局的操作的时候使用
myapp1.run(["$rootScope",function($rootScope){
    //因为是全局的, 那么需要使用全局作用域$rootScope,不能使用局部作用域$scope,优点是不必创建控制器, 但是要注意全局污染
    $rootScope.name ="gorble";
}]);


</script>
<body>

</body>
<div ng-controller="Test1">
    {{name}}
</div>
{{name}}
</html>