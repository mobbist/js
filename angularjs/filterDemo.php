<!DOCYPTE HTML>
<html ng-app="myApp">
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="./js/angular.min.js"></script>
</head>
<script type="text/javascript">
//fiter: 过滤器
// 在JS中使用过滤器, 需要依赖注入 $filter服务
var myapp1 = angular.module("myApp",[]);
myapp1.controller("Test1",["$scope","$filter",function($scope,$filter){
    $scope.money= "1000";
    $scope.name = "mobbist";
    $scope.json = {"name":"mobb","age":"20"};
    $scope.array = ["1","2","3","4"];
    $scope.date = "987548937583";
    $scope.array2 = [
       {"name":"潮流","age":"20"},
       {"name":"王五","age":"25"},
       {"name":"李四","age":"32"},
       {"name":"张三","age":"47"}             
    ];
   // 针对js中使用过滤器, 使用参数就在值的后面
   $scope.title = $filter("limitTo")("this is  js return",5);
   $scope.title = $filter("uppercase")($scope.title);
   
}]);

//自定义过滤器: 可以使用模块实例级的方法 , 参数就是过滤名, 然后具体函数,
myapp1.filter("testFilter",function(){
    //函数内必须要有返回值, 返回的参数就是调用该方法的值
    return  function(str){
        //最后将处理好的值返回
        alert(str);
        return str;
    };
});
</script>
<body>

</body>
<!-- 过滤器:在视图层的表达式中的一些用法 -->
<div ng-controller="Test1">
    <!-- 通过一个管道符, 然后方法字符 , 加一个冒号,可以给其传参数 ,加第二个参数就是再一个冒号 -->
    <!-- currency: 给转换成货币模式.默认美元符, 传掺自定义符号 -->
    <p>{{money | currency:"￥"}}</p>

    <!-- 转成一个带分割符的数字, 没有货币的美元符 ,如果有小数点则默认保留3位, 传掺则定义保留位数 -->
    <p>{{money | number }}</p>

    <!-- 转大写 uppercase:  转小写 lowercase -->
    <p>{{name | uppercase }}</p>

    <!-- 转为JSon格式, 其实就是加了点空格, 配合pre标签使用,可以调试用-->
    <pre>{{json | json }}</pre>

    <!-- 截取:字符串参数前N位保留, 截取:数组,数组前N个保留  -->
    <p>{{name | limitTo :2 }}</p>
    <p>{{array | limitTo :1 }}</p>

    <!-- 时间转换, 详细参数可以看 filter的date的文档 -->
    <p>{{date | date:'yyyy年MM月dd日 HH:mm:ss ' }}</p>

    <!-- 针对一组键值相对应的数组的排序,参数:要以哪一个(key)进行排序 , 第二个参数 true 逆排序  -->
    <pre>{{ array2 | orderBy : "age":true | json}}</pre>

    <!-- 针对一组键值对应的数组进行过滤 参数:要保留的数据(value)  ,第二个参数  true  匹配整体 -->
    <pre>{{ array2 | filter : "20"   | json}}</pre> 

    <p>{{title |testFilter}}</p>
</div>
</html>