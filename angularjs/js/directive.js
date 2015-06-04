/*
Directive : 指令
指令赋予HTML的标签新的能力,
比如 ng-init  ng-if 这些都是指令, 都是在html标签上面,  {{ name }} 就是一个插入字符串的指令
Directive 可以是 Element Attribute ClassName 和 Comment 4种模式之一
重点: 可以自定义指令, 把展现和行为封装成组件:
比如ng-if,就是angular所封装好的内部指令. ng-if用于判断, 而关于判断如何实现则已经封装在内部,使用起来只需要调用即可
*/




//创建一个自定义的指令
//首先我要定义模块的范围,不然随意定义方法就是污染全局变量
var app = angular.module("myApp",[]);

//run方法就是执行一个函数, 这里接受最父级的scope数据模型
app.run(function($rootScope){
	$rootScope.name = "mobbist"
})
//声明了一个自定义的指令, 注意,自定义指定是无法接受$scope数据模型的
app.directive("mobbTest",function(){
	//这里进行的return操作就是渲染directive标签
	return {
		//自定义标签的模式, 有四种, 推荐用属性模式,兼容更多浏览器
		restrict: "A",
		//是否要将定义的这层直接被掉template渲染的内容替换掉
		replace:true,
		//这里开启一个隔离作用域, 不接受父类的任何参数或表达式, 不开启或者scope:true表示接受父类参数
		scope:{
			//这里就是将width转为 loginNames, 为了不和input的数据模型冲突
			// @width  @就是接受的一个值({{ var }})    =width的 =就是接受一个变量var,这里就是接受input的数据模型
			loginNames:"=width",
			isHeight :"=height",
			isbg : "=bg"
		},
		link:function(scope,elem,attr){
		},
		//渲染的时候, 直接就是绑定的width值
		template: "<div\
			 style='width:{{ loginNames }}px;\
			  height:{{ isHeight }}px; \
			  background-color:#{{isbg}} \
			  '>123</div>"
	}
});

app.controller("login",function($scope){
	$scope.name = "";
})
.controller("myController",function($scope){
	
})


.directive("comBanner",function(){
	return {
		scope:{
			ok : "@width"
		},
		replace : true,
		template: "<div >\
					<div class='abc'></div>\
					<div href='google.com' ng-transclude></div>\
					</div>"
	}

})