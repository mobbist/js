//理解一下原型和原型链
(function(){
		//constructor
		var Book  = function(){
			this.name = "book";
			this.getName = function(){
				return this.name;
			}
		}

		var  a = new Book();
		//可以看出Book是不具有JS意义下的constructor属性的，为什么这么说呢。alert(Book.constructor)这行代码还是有东西的
		//这是因为Book是个函数，所以他的构造器就是本地的Function对象，也就是说Book是由Function构造出来的。
		//但是这个对我们意义不大，因为这已经不再JS层面上了。所以这里可以认为Book不具有JS意义下的constrcutor属性。
		//alert(Book.constructor);
		//alert(a.constructor);
		//alert(a.prototype)通过这行我们可以看出，obj实例是不具有原型属性的。
		//因为原型都是基于构造函数, 如果在实例上出现, 哪就无法被子类所调用了
		//alert(a.prototype);
		//每个实例对象都有一个constructor属性，并且指向构造器（函数）。而且每个new出来的实例都是某个原型constructor的实例
		//alert(a instanceof Book.prototype.constructor); //true
		//alert(Book.prototype.constructor === a.constructor);	//true
		


		// var Student = function(){}
		// Student.prototype = new Book();
		// Student.prototype.constructor = Student;
		// var b = new Student();
		//构造一个Student类, 继承自Book类.  然后Student的原型指向就是Book类型
		// alert(Student.prototype instanceof Book);


		//闭包, 返回一个person构造函数
		var Person = (function(){
			var name = "mobbist3"
			//在这个自调用匿名函数中, 必须要由return返回,否则引用不成立, undefined
			return function Person(){
				this.getName = function(){ return Person.say(); }
			}
		})()
		//任何地方都能调用静态函数
		Person.say = function(){ return 123 }

		Person.prototype = {
			//如果不写这句, 实际上就已经重写了构造函数, 变成了object,就无法访问到构造函数了, 所以这里要加一句
			constructor : Person,
			name : 'mobbist',
			age :20
		}
		
		var mobbist = new Person();
		console.log(Person);
		alert(Person.say());
		//如果像44行在重写了构造函数,或者不经意改变他得constructor构造函数, 那么将无法访问到构造函数内的属性方法,切记
		alert(mobbist.getName());
		//如此, 就能调用构造函数, 和原形方法
		alert(mobbist.name);


		

		//var student = create(Person);
		
})()