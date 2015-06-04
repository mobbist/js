//原型链: 实例对象与原型之间的链接,叫做原型链 (_proto_)

// 原型链理解:
//有一个构造函数
function Person(){
}
//把一个属性写在原型下面
Person.prototype.name = "person",
//然后通过new这个person出来的实例对象,可以访问到这个name = person
var  jeck = new Person();
alert(jeck.name); // "person"

// 可是为什么?  为什么这个jeck能找到这个name? 他下面并没有叫name属性.原因就是原型链, 我们再来理解这句话
// 实例对象就是jeck, 原型就是 Person.prototype ,  他们之间的链接就要原型链(_proto_), jeck这个实例下并没有name, 
// 所以原型链就向上查找,直到person.prototype上面找到.这就是原型链的作用
// -------------------------------------------------

// 如果在Person的构造函数已经定义了这个值
function Person(){
	this.name = "jack"
}
person.prototype.name = "person"
var  jeck = new Person();
alert(jeck.name); // "jack"
// 这时候, 因为能够在Person的构造函数里找到name的值, 所以原型链就不会向上查找,  这就是原型链的机制.也就是 为何权重比prototype高
// -------------------------------------------------

//原型链的最外层:  Object原型对象
//如果我给object的原型对象赋值
Object.prototype.name = "Object"
// 同时构造和原型里都没有声明该值.
var  jeck = new Person();
alert(jeck.name); // "Object"
//由于构造函数和原型里都找不到这个值, 原型链就继续向上查找, 直到最父级Object找到. 如果Object都找不到的话, 哪就是undefined
// -------------------------------------------------

// constructor : 返回该实例对象的构造函数
function Person(){
}
//创建了一个jeck的实例
var  jeck = new Person();
//这里访问了jeck的constructor, 也就是new 后面所带的这个对象
alert(jeck.constructor)    //Person构造函数
// 可是为什么?  为什么 jeck下面会有constructor?  我们并没有显式的赋值 原因就是:
// 每个函数在生成之后, 系统都会自动生成这句话
function Person(){}
Person.prototype.constructor = Person    //这句话是系统自动生成的, 系统也只会自动生成这一句
//所以我们能够访问  jeck.constructor,   这是因为在Person.prototype上已经找到了constructor = Person 
// -------------------------------------------------

//由于是系统自动创建的, 我们也可以修改, 覆盖他.  但这是没有必要的, 而且会破坏原型链

function Person(){}
Person.prototype.constructor = Object
var  jeck = new Person();
//这里手动改变了Person的构造函数为Object,那么 Person的原型就无法访问到, 也就破坏了原型链. 
alert(jeck.constructor)   //Object

//不要去手动修改 这点比较容易做到,  不过有时 也会手动prototype覆盖导致constructor被同时覆盖
function Person(){}
//有时, 我们希望通过对象字面量去实现原型,  下面这个意思把一个新的对象字面量直接赋值给原型, 那么constructor自然是找不到了, 也就破坏了
Person.prototype = {
	name : "Person",
	age : "20",
	//所以在这里需要手动添加以下才不至于原型链被破坏, 而且这个属性是无法被for in函数遍历到得
	constructor : Person
}
// ----------------------------------------------
//Object.hasOwnProperty() 查看是不是对象自身下独有的属性,  也就是说如果是Prototype的属性就是false. 这个是Object原型方法.

//instanceof 对象于构造函数是否在同一条原型链上
function  Person(){}
var p1 = new Person();
alert(p1 instanceof Person );  //true,  他们是在同一条原型链
alert(p1 instanceof false );  //false
alert(p1 instanceof Object);   //true,  任何函数都是和Object在同一原型链, 因为他是所有对象的父级
// ----------------------------------------------


//原型继承 : 理由javascript的原型链机制来实现的继承方式

//开始声明一个person类,  里面他自己的原型方法
function Person(){

}
Person.prototype.number = "10";
var p1 = new Person();
//然后, 我又有一个jeck类, 他想要继承这个Person类, 具体看里面怎么写
	var jack = extend(p1);

	//继承方法
	function extend(obj){
		//声明一个f的空函数
		var f = function(){};
		//然后将obj这个类, 直接赋值给F的原型
		f.prototype = obj
		//然后返回这个f的实例
		return new f();
	}
jack.name	

//原型链解释原型继承
// jack  ->  f  -> f.pro  -> obj -> obj.pro-> obj.pro.name   
// jack ->f 	的理解:
// var jack = extend(Person) 当我们调用extend方法的时候, 在函数最后 return new f()实际上就已经赋值给jack了,所以jack = f   
// jack ->f.pro 的理解:
// 既然 jack等于f函数, 那么自然也是等于 f.pro 这里原型链开始作用, 开始查找f.pro 那在extend方法里, 肯定是没有的, 所以再向上查找
// jack ->obj 	的理解:
// 我们已经知道jack就是内部的F方法, 那么 f.pro = obj, 这句进行了原型链接,  这句也就是最核心的一部, 能让f.pro在 obj上面继续查找
// jack ->obj.pro.name  的理解:
// 最终, 我们在obj.pro内部找到了值name, jack.name=person.name,如果我们在jack下定义name ,那么就不会原型查找, 直接返回.也就等于实现继承 



//继承
// (function(){
// 	//创建一个人员类
// 	function Person(name){
// 		this.name = name;
// 		//私有方法是无法被继承的
// 		var sayName = function(){
// 			alert(123);
// 		}
// 		this.sayHello = function(){
// 			return this.name;
// 		}
// 	}

// 	function extend(subClass,supClass){
// 		//目的:叫子类原型类属性等于父类原型类属性
// 		//先创建一个空的中间类, 为了转换主父类关系
// 		var f = function (){};
// 		//让空类等于主父类
// 		f.prototype = supClass.prototype;
// 		//让子类继承F类, 这样做的目的就是减低类之间的耦合度, 不必在这个类中实现CALL方法. 
// 		subClass.prototype = new f();

// 		subClass.prototype.constructor = subClass;
// 		//为子类添加一个属性, 可以让子类操父类原型, 便于使用call方法
// 		subClass.supClass = supblass.prototype;
		
// 		//增加一个保险, 就算原型类是超类, 哪也要把其构造函数降下来,防止原型链破坏
// 		if(subClass.prototype.constructor == Object.prototype.constructor){
// 			subClass.prototype.constructor = subClass;
// 		}

// 	}

// 	/*   原始不用extend方法使teacher类,继承自person类
// 	//创建一个教师类
// 	function Teacher(name,books){
// 		//Person.call(this,name)的 意思就是使用 Person 对象代替this对象，
// 		//那么 Teacher 中不就有Person 的所有属性和方法了吗， 实例化对象就能够直接调用Person 的方法以及属性了，
// 		Person.call(this,name);
// 	}
// 	//使老师继承人员类
// 	Teacher.prototype = new Person();
// 	Teacher.prototype.constructor = Teacher;
// 	var  t1 = new Teacher("zhubiao");
// 	*/

// 	/*使用extend方法继承*/
	
// 	function  Student(name,books){
// 		//学生类只要使用了entend方法就有supClass属性, 便于操作继承父类的原型
// 		Student.supClass.constructor.call(this,name);
// 		//alert(Student.supClass.constructor);
// 	}
// 	extend(Student,Person);	
// 	var mobbist = new Student("mobbist");
// 	//父类方法被子类继承测试
// 	alert(mobbist.sayHello());
	
// })()