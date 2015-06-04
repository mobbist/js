<!DOCYPTE HTML>
<html ng-app="myApp">
<head>
<meta charset="utf-8" />
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
<script type="text/javascript" src="./js/angular.min.js"></script>
<script type="text/javascript" src="
http://cdn.bootcss.com/angular.js/1.4.0-beta.6/angular-sanitize.min.js"></script>

</head>
<script type="text/javascript">
var myapp1 = angular.module("myApp",[]);
myapp1.controller("Test1",["$scope","$filter",function(s,$filter){
    s.dataList= [
        {"title":"apple","body":30 },
        {"title":"blue","body":20 },
        {"title":"yes","body":55 },
        {"title":"link","body":1302 }
    ]

    //排序
    s.chageOnby = function(arg){
        // arguments.callee: 相当于是这个函数自身, 这句意思是: 设置自身这个函数一个变量, 变量是传入的参数
        arguments.callee["fn"+arg] = ! arguments.callee["fn"+arg];
        s.dataList=  $filter("orderBy")(s.dataList,arg,arguments.callee["fn"+arg]);
    }

    //删除操作
    s.removeDeta = function(index){
        s.dataList.splice(index,1);
    }


}]);
</script>
<body>


<!-- 在HTML中会使用到的各种NG指令 

    ng-app : 初始化angular库的指令
    ng-controller :  定义一个视图层的控制器
    ng-click:  点击事件, 触发脏值检查器
-->
<div class="container">
<div class="table-responsive col-md-5">
  <table class="table" ng-controller="Test1">
        <thead>
            <tr>
                <th ng-click="chageOnby('title')">颜色</th>
                <th ng-click="chageOnby('body')">色值</th>
                <th ng-click="chageOnby('body')">操作</th>
            </tr>
        </thead>
        <tbody>
              <!-- 重复将数组中的内容输出在视图 -->
                <tr ng-repeat="data in dataList">
                    <td>{{ data.title }}</td>
                    <td>{{ data.body }}</td>
                    <td><button type="button" class="btn btn-danger" ng-click="removeDeta($index)">删除</button></td>
                </tr>
            </tbody>
      </table>
    </div>
</div>

<!-- 跟样式有关的ng指令:

ng-class={样式名1:true,样式名2:true}  当这个值为true时,   这个样式才会展示 
ng-style="{{ style }}"
$scope.style= "{color:'red',background:"red"}"
这样的优点就是可以讲表达式作为数据的方式载入

ng-href   ng-src  同样有以上的功能, 并且能在数据未加入时, 不展示给用户看到

可以属性会很多,angularjs不可以每个都提供. 现在有一个共同的方式
ng-attr-href="{{url}}"        ng-attr-title="{{title}}"   ng-attr-class="{{class}}"  ng-attr-style


ng-show={{ true }}  值为true的时候, 则显示,false为隐藏  ng-hide={{true}}  为true为隐藏, false为显示. 正好相反

ng-if="{{ true }}" 值为true的时候, 则添加, 为false的时候则document移出,是真正移除, 并不是css的隐藏

ng-switch  组合使用
<div   ng-switch on="btn">
    <p ng-switch-default="btn">默认效果</p>
    <p ng-switch-when="one">当值为one时, 显示该条</p>
    <p ng-switch-when="two">当值为two时, 显示该条</p>
</div>

ng-open  和html5得 detaills 有关


高级指令: 

ng-init="text='hello'" 直接在标签上进行初始化值
ng-include="'temp.html'"     包含一张页面到相应的位置
ng-model    和输入框组合使用,  当输入框在变化的时候,同时变化数据, 实现双向数据绑定
当有时候需求不需要数据和视图实时绑定的话, 可以再加上  ng-model-options="{ updataOn:'blur' }"  当光标移开时, 再触发上相数据绑定

ng-controller  控制器, 连接数据和视图的桥梁
当功能开发到一定时候, 会开始复杂起来, 所以希望能通过面向对象的方式去实现,如下:
myapp1.controller("Test1",["$scope","$filter",Fun);
这里本来是要回调函数的地方,直接写成一个构造函数的,然后再再在这个构造函数上进行原型扩展
function   Fun($scope){}
Fun.prototype.num = "123"
Fun.prototype.show = function(){  return 456};
然后, 在标签上也要通过构造函数AS一个他的实例.  然后通过操作这个实例下面的属性和方法,进行后续的操作. 这样对我们开发复杂的程序非常好










 -->
</body>
</html>