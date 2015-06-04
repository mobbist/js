//做一个属于自己的DOM控制框架 MJQ


//这是一个自调用匿名函数。什么东东呢？在第一个括号内，创建一个匿名函数；第二个括号，立即执行
//通过传入window变量，使得window由全局变量变为局部变量，当在jQuery代码块中访问window时，
//不需要将作用域链回退到顶层作用域，这样可以更快的访问window；将window作为参数传入，可以在压缩代码时进行优化;
//确保undefined是真的未定义。因为undefined能够被重写，赋予新的值。
(function(window,undefined){
		//第一个被调用的函数
		var mjq = function(selector){
		 	//在这里直接返回新的对象,有点特殊, 目前我的理解是mjq.fn是一个静态函数字面量, 里面一个初始化方法 是实际构建的方法
		 	//这里要注意他new, 是一个对象, 肯定有原型对象就是这个init;
		 	//这样做的目的就是直接不用在外部写 new 创建实例, 而是创建的是init函数, 之后第41行 让mjq,fn这个原型等于init方法即可
		 	return new mjq.fn.init(selector);
		}
		//接14行, mqj.fn实际上只是一个函数字面量,而且也是mjq的原型 
		//而他里面的init则是一个对象. 有原型对象,导致这个就是因为上面的new关键字, 非常霸气
		mjq.fn = mjq.prototype = {
			//初始化函数, 获取参数, 然后进行处理
			init: function(selector){
			    //jQuery.fn.init的功能是对传进来的selector参数进行分析，进行各种不同的处理，然后生成mjq对象。	
		 	    //DOM元素  包装成jQuery对象，直接返回
	 	    	var fristChar = selector.charAt(0); 
	 	    	//判断首字符是不是#, 是的话 用作id处理
		 	  	if(fristChar=="#"){
		 	  		var thisid = selector.substring(1)
		 	  		//然后将id值作为doc返回
		 	  		this.getId = function(){ 
		 	  			return document.getElementById(thisid);
		 	  		} 
		 	  		return this;
		 	  	}
		 	  	//body（优化）从document.body读取
		 	  	//单独的HTML标签 document.createElement
		 	  	//HTML字符串     document.createDocumentFragment
		 	  	//#id document.getElementById
		 	  	//选择器表达式  $(…).find
		 	  	//函数  注册到dom ready的回调函数
			},
			ok:function(){
				this.getId().style.background = "red";
			}
		}
		//这个理解其实非常重要, 也是作为一个理解并运用原型的一个标杆
		//这一句的意思就是 将mjq.fn 这个函数字面量(非对象,里面包括有很多方法包括init, ok等方法)全部都赋于mjq.fn.init这个对象. 
		//也就是16行new的对象, 这个对象其实也就是mjq这个window下的命名空间.  非常的绕, 理解就好
		//功能是为了. 能再外部这样使用  $().ok(), 这样就变成了原型方法  非常霸气 非常吊.  可以将这句去掉看看还能否这样调出OK方法	
		mjq.fn.init.prototype = mjq.fn

		 //这句的意思是: 定义一个mjq.fn的extend方法, 意思就是直接定义给外部$().extend()使用.  mjq.extend 暂时还不清楚,内部用?
		mjq.extend = mjq.fn.extend = function(){
		 	//alert(123);
		}
window.mjq = window.$ = mjq;	

})(window)
window.onload = function(){
	$("#divs").ok();
}
//$().ok()