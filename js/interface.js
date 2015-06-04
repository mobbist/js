//接口
(function(){
//想要实现一个的函数,  这个函数定义了该类为接口  需要其他类来实现其接口
	//arguments: name   需要定义为接口的函数名
	//arguments: method 需要其他类来实现的方法, 数组
	var Interface = function(name,method){

		if(arguments.length != 2){
			throw new Error("_Interface must two arguments");
		}
		this.name = name; //定义一个接口名
		this.method = []; //定义一个空数组来转载函数名
		for(var i=0; i < method.length; i++){
			if(typeof method[i] !="string"){
				throw new Error("The methodName must String type");
			}else{
				this.method.push(method[i]);
			}
		}
	};
	//argunemnts 传入需要检验的对象, 最少2个,第一个为实现类, 第二个开始为接口对象
	Interface.check = function(object){
		if(arguments.length <2){
			throw new Error("arguments must 最少2个");
		}
		//从第二个开始遍历, 判断其是接口对象
		for (var i = 1;i<arguments.length; i++) {
			var inter  = arguments[i];
			if(inter.constructor != Interface){
				throw new Error("this not Interface type");
			}
			
			//遍历函数集合并分析
			for(var j=0;j<inter.method.length;j++){
				//将接口中出现参数inter.method[j], 作为传入进来的object(实现类)的函数下标,判断是否有该函数
				var method = inter.method[j];
				//判断完是否有该函数.  再判断一下类型是否是function,  2者成立, 就算实现该接口,  鸭式辨形法
				if(!object[method] || typeof object[method] !="function"){
					throw new Error("this class not win Interface");
				}
			}
		};
		


	}
	var person  = new Interface("Person",["getName","getAge"]);
	var pet = new Interface("Pet",["getOk"]);
	function Student(){
		this.getAge = function(){
			return 2;
		}
		this.getName = function(){
			
		}
		this.getOk = function(){

		}

		Interface.check(this,person,pet);
	} 
	var jim  = new Student();
	jim.getName();

	
	





})()