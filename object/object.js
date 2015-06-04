//javascript面向对象

//这一句相当于  var person = new Object()的一种简写方法, 比如   var arr = []就是  var arr= new array()一样
//创建了一个对象,  原本里面是空的. 现在添加了一个属性name, 值为 mobbist, 还添加了一个方法, 调用this.name,这样一个完整的对象就成立了
var person = {};
person.name = "mobbist";
//在函数里, this指向就是看谁调用他d, this就是指向谁, this在showName方法中, 那么this,指向的就是 showName方法的持有者,person, this就是Person
person.showName = function(){ alert(this.name);}
//这样一个对象下面的方法就成立了.   这也是单体模式,  即, 对象只有一个引用(person)无法创建其他变量.也就是静态方法.
//person.showName();



//在这里也是创建了一个对象, 并且,在调用的时候, 是通过New关键字来实例化的.
//这样也是工厂模式 工厂模式是用来封装对象的. 
function CreatePerson(name){
	this.name = name;
	this.showName = function(){
		alert(this.name);
	}

}

//函数型的对象, 需要通过New关键字来实例化才能变成对象. 不用new关键字 则只是函数,其内部的this指向都是指向调用该函数的点号前面的对象. 
//当new 去调用一个函数: 这个时候函数中得this就是创建出来的对象. 而且函数的返回值直接就是this. 这样也就是隐式返回, 
//所有的对象, 如果不写return 的话, 返回的都是undefined, 如果是new去调用的函数, 那么返回的就是这个对象本身, 称之为隐式返回 
//所有的系统对象(Data  Image)等等, 都是函数型对象.
var mobbist = new CreatePerson("mobbist2");
//既然这里可以隐式, 返回,那么就可以直接调用showName方法, 因为 mobbist 这个变量就持有 new出来的对象本身, 经管这个对象并没有return
//可以通过for in方法看到mobbist变量内部就是这个
//for(var i in mobbist){ alert(i)}
//mobbist.showName();
//而且 在new关键字后面所调用的方法  称之为构造函数


//javascript 引用问题:
//基本类型的值的引用是值的复制
var a = 5;
var b = a;
b+=2;
//alert(b)	//a=5  b=7可以看出a虽然5这个值给了b, 但是,b拿到的这个5只是a复制给他的, 他们之间并没有关联,并不会b增加了a也增加,这是基本类型的特性
var c =5;
//alert(a==c) //true   而且他们比较则是把他们的值做比较, 正确就是true, 经管他们在内存里的地址不一致. 这是基本类型的特性

var arrA = [1,2,3];
var arrB =  arrA;
arrB.push(4);
//alert(arrA); //1234 可以看出虽然是Bpush了一个值, 但是A也有了4, 这是因为对象类型 arrB = arrA, 不仅把值给他了, 并且内存里的地址也是一至的.所以AB同时增加
			
var arrC = [1,2,3];
var arrD = [1,2,3];
alert(arrC == arrD);//false , 虽然  arrC和arrD的值是一样的, 可是,他们在内存中是不同的地址, 所以要满足2个对象之间的相等, 必须要值和引用地址一致才是true

//在内存中如何让对象的方法只存在一份呢?  就会引出 原型概念
//原型: 在面向对象中得作用就是去改写对象下面公用得方法或者属性,  作用就是让公用得方法或者属性在内存中只存在一份, 好处就是提高性能
//可以把原型看做是CSS中得class, 普通方法就是style,  他们在CSS里的区别就是, style只能作用一个样式, class只要调用名字可以大量复制使用,style优先级比class高
function person2(name){
	this.name = name;
}
//原型方法必须要写在构造函数下面. 不然报错,  并且所有构造出来的方法都持有这个方法, 且内存里只存在一份, 且如果有重新该方法的话, 原型方法会被覆盖
person2.prototype.showName= function(){ alert(this.name);}

var p1 = new person2("mobbist");
p1.showName();
var p2 = new person2("jack");
p2.showName();
//可以看出, 虽然这2个方法所打印的值不同, 但是, 这个方法是存在于这个对象的原型上, 内存地址和方法内容都是一致的, 所以返回true;x`

alert(p1.showName == p2.showName)

