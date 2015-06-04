//两种函数声明的方式, 第一种需要在方法调用之前, 否则会函数未定义 第二种  前后都可以
var fn = function(x,y){
	alert(x+y);

}

function fn(x,y){
	alert(x+y);
}


// 回调函数
(function(){
	//接收回调函数的函数, 对象number = {x:"",y:""}
	function add(number,fn){

		// 如果没有给参数就是给1  
		//定义变量 this.x 和   var  x  区别就是  后者(内部用var定义的)是私有变量, 而用this.定义的是公有变量 
		this.x = number.x || 1;
		this.y = number.y || 1;

		//判断是否有fn这个函数变量, 有的话就执行,并且传参数
		if(fn){
			fn(this.x*this.y);
		}
	}
	//这里的回调函数参数V 也就是ADD方法内的回调函数参数
	 add({x:5,y:10},function(v){
	 	alert(v);
	 });
})()
	

//eval  可以将字符串转成函数, 数组.    最常用的是数据库获取长得像数据的字符串.   直接转成数组
var arr = "[1,2,3,4,5]"
var array = eval(arr);








