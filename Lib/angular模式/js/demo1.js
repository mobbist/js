//html : ng-app   指定angular的使用范围
//声明了一个模块, 和html的 ng-app="myapp" 映射
var myapp = angular.module("myapp",[]);

//myapp模型对象的run 方法:   参数  $rootScope,暂时知道是$scope的父级
myapp.run(function($rootScope,$parse){
	$rootScope.name = "初始值";
	
})

//可以不将变量设置上$rootScope上, 而是用控制器显示创建一个隔离的子$scope,
//把它设置到这个子对象上,使用ng-controller指令, 可以将一个控制器对象附加到dom元素上,这样不会污染全局空间
myapp.controller("fristCtrl",function($scope,$interpolate){ 
	//内部可以修改这个值,出了这个控制器, 该值会恢复到$rootScope的值
	$scope.name = "";
	$scope.counter = 0;
	$scope.add = function(num){
		$scope.counter += num;
	}
	$scope.$watch("name",function(body){
		if(body){
			var template =$interpolate(body);
			template({ to : $scope.to });
		}
	});
});

//开发一个滑动层指令
myapp.directive("createBox",function(){
	return {
		restrict: "A",
		replace : true,
		scope :{
			//绑定策略"@": 告诉angular,将dom中 box-height的值赋值给新作用域对象中的boxHeight,
			//暂时理解为dom中不可接受动态值
			boxHeight : "@",
			//默认情况下隔离作用域中的值和DOM中的值是互相映射的, 
			//在@后面跟的值, 就是指定绑定在DOM中互相映射值, 而@ 前面的键, 就是template中的占位符
			imgHref :"@newHref",
			//绑定策略"=",暂时理解的是:告诉angular,dom中得box-width接受的是 ng-model,
			width :"=boxWidth"
			
		},
		template: "<div  style='width:{{width}}px; height:{{boxHeight}}px' >\
					<li><a href=''><img src=''/></a></li>\
					</div>"
	}
});


myapp.controller("testController",function($scope){
	$scope.parentControllerVal = "parent";
	$scope.parentFunction = function(){
		$scope.parentControllerVal = "parentChange";
	}
});

myapp.controller("childController",function($scope){
	$scope.childFunction = function(){

		$scope.parentControllerVal = "childChange";
	}
})

myapp.controller("includeBody",function($scope){

	
})
myapp.controller("articleList",function($scope){
	$scope.artFrom = [
		{title:"这是一篇新闻得标题",body:"这是内容呢,内容哦"},
		{title:"这是一篇新闻得标题",body:"这是内容呢,内容哦"},
		{title:"这是一篇新闻得标题",body:"这是内容呢,内容哦"},
	]
})

myapp.directive("myDirective",function(){
	return{
		restrict:"A",
		template:"{{laction}},{{ngModel}}",
		//scope 隔离作用域,  这个值为true时, 数据模型对象使用父级数据对象
		scope : {
			//@  接受一个本地对象, 即: 在标签中声明的locaton值, 当做参数传入
			laction: "@lactions",
			ngModel : "="
		}
	}
})
//组织架构调整
myapp.directive("artMenu",function(){
	return {
		//自己理解: transclude的作用就是在template提供一个占位付, 然后这个占位符内的内容就是dom层这个标签内的内容, 动态
		template:"<div>1123<span ng-transclude></span>3456</div>",
		//注意, 使用了transclude,那么在controller中就无法正常监听数据模型的变化了.
		transclude:true
	}
})

//
myapp.directive("textList",function(){
	return{
		restrict :"A",
		replace:true,
		template:"<div id='nameOK'>12321{{name}}</div>",
		controller : function($scope,$element){
			$scope.name= "改变";
			console.log($element);
		}
	}

});