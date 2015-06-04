var app = angular.module("myApp",[]);

//文本字段会被禁用5秒, 直到定时器结束 设为false, 解禁可以输入字符
app.run(function($rootScope,$timeout){
	$rootScope.myhref ="baidu.com";
	$rootScope.mySrc ="http://www.baidu.com/img/bd_logo1.png"
	$rootScope.isDisabled= true;
	$timeout(function(){
		$rootScope.isDisabled= false;
	},5000)
})

