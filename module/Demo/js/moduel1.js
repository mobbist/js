// 为了多人协作开发, 不冲突而出现的一个   JS模块化框架   sea.JS

//要使用这个框架  首先要在页面中引入sea.JS文件
//然后再需要得 moduel中, 如下定义

define(function(require,exports,module){	//参数必须要写成一致, 并且在下文不允许改变参数的命名

	//如何依赖文件,  如果我要调用某个框架里的方法, 我如何依赖这个文件,并访问里面的方法呢?

	//方法1: 调用普通的方法. 并不是seajs下得内容, 使用第一个参数
	//require("./module2.js");		
	//方法2: 如果想要引入的是一个seajs下另外一个sea模块可以这样做
	//require("./module2.js") ,这个方法实际返回的是module2.js所包含的exports 这个对象,
	var ex =  require("./moduel2.js");


	//在这个域下定义自己的方法 就不会发生冲突问题了.因为已经加入了命名空间   
	 function  tab (){
	 	//获得这个对象, 然后访问其命名空间下的属性, 这样就可以调用依赖关系下的文件了
	 	alert(ex.name());
	 }

	 //当然  函数在这里定义, 如果在别的地方调用该怎么做呢? 
	 exports.tab = tab;			//这个是seajs里的第二个参数,  把函数名加入到 exports命名空间下

});