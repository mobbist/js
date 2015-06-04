//模仿jQuery链式调用

//在Function类中添加一个方法,  所有的函数的原型都继承这个method,返回一个调用他得对象, 便于链式调用
Function.prototype.method = function(name,fn){
	this.prototype[name] = fn;
	return this;
};

(function(){
	//内部私有函数, 该形参就是一个Document, 便于指向
	function _$(els){  
		//返回 DOCid
		var element = [];
		for(var i=0; i< arguments.length; ++i){
			var element = arguments[i];
			
		}

		this.getIds  =  document.getElementById(els);
		return this;
	};

	//首先准备一个准备函数, 就是类库作用域
	function mobbist$(fn){
		//然后,注册一个新的变量,用于在作用域内进行调用,arguments就是任意的函数参数数组(说数组也不全是数组,无法PUSH, POP); 
		//函数return new _$()的具体意思就是 把new隐藏起来, 以后调用就不必   new $()  直接 $() 是不是霸气
		window.$  = function(arguments){  return new _$(arguments); }
		fn();
	}



	_$.method("color",function(co){
		this.getIds.style.background = co;
		 return this;
	}).method("removeClass",function(type){
		alert(arguments[0]);
		return this;
	});

	
	//如果先不调用mobbist$方法的话, 是无法调用$的, 这也就是作用域, 不会和外界的变量污染
	mobbist$(function(){
		$("divs").color("#ccc");
	})

})()
