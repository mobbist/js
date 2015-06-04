//定义一个有命名空间的单体
	var mobbist = {};
	 mobbist.ok = {
		  getId: function (id){ return document.getElementById(id); },
		  attr: function(){}
	};
	function ok(){
		mobbist.ok.getId("divs").style.display = "none";
	}

	addLoadEvent(ok);

	//单体闭包, 在匿名函数域内定义的值为真正的私用成员, 函数在定义完以后就立即执行, 返回一个对象字面量,这个对象字面量持有私有属性函数的调用
	var bibao = (function(){
		//假设是服务器读取的数据
		var name = "mobbist"
		var age = "28"
		return {
			//因为在闭包体内var的变量, 对子函数是可见的, 这也是JS的变量链式继承. 所以不需要写 this, 或者 bibao (函数名)
			getName: function(){ return name}
		}
		//闭包的缺点就是return出来的对象字面量是一直存在于内存的, 如果被多次实例化, 
		//那么每个实例化里都会开辟一次内存,从来影响效率
		//所以只希望用于单体模式,  因为只会被实例化一次.
	})()
	alert(bibao.getName());