<!DOCYPTE HTML>
<html ng-app>
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="./js/angular.min.js"></script>
</head>
<script type="text/javascript">

//---------------- angular的工具方法


//这里的原方法的this是指向window改变this指向
function show(n1,n2){
    console.log(n1);
    //如果直接运行show方法, 则是指向window, 
    console.log(this);
}
//工具方法:这里调用改变this指向, 第一个参数是要改变到那个指向, 第二个是要改变的函数,之后的参数就是要改变的函数的参数
angular.bind(document,show,3,4)();


//拷贝对象 
var a = {
    name : "hello"
}
var b = {
    age :"20"
}
var c = angular.copy(a,b)  //a把所有值覆盖给了b, b里原先的内容也没有了
console.log(b);

//对象继承 
var c = {
    name : "mobbist"
}
var d = {
    age :"55"
}
var c = angular.extend(c,d) //对象继承:  c把d的元素继承下来, 也保留了自己的   
console.log(d);


//判断是不是一个这个 ,返回boon
//angular.isArray()     判断数组
//angular.isdate()      判断时间对象
//angular.isDefined()   判断是否存在
//angular.isUndefined() 判断是否不存在
//angular.isFunction()  判断是否函数
//angular.isObject()    判断是否对象
//angular.isString()    判断是否字符串
//angular.isElement()   判断是否元素, jquery对象也会被认定元素

console.log(angular.version);   //返回angularjs的版本号信息

var a= [];
var b =[]; 
//如果用双等号去进行对比, 对于对象类型的元素,则是内存地址对比.  显然a和b不是同一个地址引用
console.log(a ==b );
//那么如果使用equals则是将内部的值取出来进行内容的对比.  如果说2个值是NaN, 也会返回true
console.log(angular.equals(a,b));  //true

var data = ["a","b","c"];
//遍历数组和对象
angular.forEach(data,function(val,i){
     console.log(val+i);
});
var res = [];
//想要把一个数组内的元素遍历出来, 并添加到另外一个数组中
angular.forEach(data,function(val,i){
    //这里的this就是指res
     this.push(val);
},res);
//这里就返回一个新数组,并打印
console.log(res);

var jsonDemo = {
    "name":"hello",
    "age":"20"
}
//fromJson 接受一个字符串,返回Json 
//toJson   接受一个json,返回一个字符串
var tofromJson = angular.toJson(jsonDemo);
console.log(tofromJson);

//转大小写
//angular.lowercase();  //大转小
//angular.uppercase();  //小转大

//获取元素,对该元素进行后续操作
//angularjs和jquery是有一定关系的, angularjs内部融入了一个jquery的简单版,实现了其中一部分功能
//angular.element();

//动态初始化模块, 等于就是动态创建ng-app.  想要初始化的时候再初始化
//参数就是  创建的元素位置,  数组: 模块名,模块名(注意: 这种动态创建方式可以创建多个模块, 而ng-app则值识别第一个)
//angular.bootstrap(document,["myApp"]);

//内部来使用, 之后再说
//angular.injector
</script>
<body>

</body>
<div id="div1">aaaaa</div>
<script type="text/javascript">

var oDiv1 = document.getElementById("div1");
//声明元素以后, 并传参数, 这里和jquery链式用法一直,  css方法, 再熟悉不过了
angular.element(oDiv1).css("background","red");
//关于element的其他方法, 可以通过访问http://www.angularjs.cn/, 单击导航ngdos
</script>
</html>