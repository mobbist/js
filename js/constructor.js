//var fun = new Function();

function  fun(){
	fun.prototype.name = "zhubiao"
	fun.prototype.getName = function(){
		return this.name;
	}

}
//这个方式相当于重新构造一个新的object, 而不在是fun, 所以下面的constroctor需要重新定义回 fun
fun.prototype = {
	age : "18",
	getAge : function(){
		return this.age
	}
}
//fun.prototype.constructor = fun;
f1 = new fun();
alert(f1.constructor);
