//原型链:  实例对象与原型之间的链接, 就要作原型链
//为什么在原型下面扩展一个方法, 其他实例对象都有了呢? 就是因为实例对象都保持着原型之间的链接, 就是原型链. 表现是 __proto__  (隐式链接)
//object对象类型是圆形链的最外层, 举个例子
var a = function(){
	this.number = 10;
}
a.prototype.number2 = 20;
//Object.prototype.number = 30;

var a1 = new a();
//可以尝试着把实例对象的属性和原型属性一一注释, 可以看到最外层的30, 当object的原型里的值也注释掉以后, 哪就返回空. 由此也就知道了原型链的优先级
//alert(a1.number);

//面向对象的一些常用属性和方法
alert(a1.hasOwnProperty("number2")); //这个方法是看是不是对象自身独有的属性. 如果写在原型链上,但是自己又没有的属性, 则是false,如果自身有哪就是true
alert(a1.constructor);//查看这个实例变量的构造函数, 也就是new后面的这个函数, 可以通过这个属性做判断,alert(a1.constructor == a); 返回true;说明是同对象

//每当声明好一个函数, 系统都会自动执行一句   函数名.prototype.constructor = 函数名,  并且在不经意会改变这个值
//比如在覆盖原型的时候, 如果在json里不写一句  constructor : 函数名, 那么constructor 会变成 object
a.prototype = {
	constructor: a,//所以, 每次需要复写的话, 都要重新写上指向, 这个值是无法被for in循环到的
	numbers : 20
}
var a2 = new a();
alert(a2.constructor); //这里就已经覆盖了系统生成的那句构造函数执行, 如果不在JSON内部定义, 那么constructor这个值 会指向object
alert(a2 instanceof a); //运算符,判断a2是不是和a是同一条原型链, 也就是看是不是由a这个构造函数所创建, 做类型判断用

//系统对象下得toString都是自带的, 自己写得对象都是通过原型链找到object下面的
alert(typeof a2.toString()); //返回string类型, 将对象转成string
//这个函数还可以做类型判断, 并且是最完美的类型判断, 在iframe跨域下 instanceof和 constructor 都会返回false, 
var arr3 = [];
alert(Object.prototype.toString.call(arr3));//直接返回该变量的类型, [object Array]

