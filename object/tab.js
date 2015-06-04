//开发面向对象的选项卡

//一个非常重要的概念是  this指向,  哪个函数调用this, this就是这个函数的点号前面的对象, 举个例子:
// person.getName = function(){ alert(this)}     这里面的this就是指向getName方法点前面的那个person. this指向person
//在事件中, this指向的是触发这个事件的元素, 定时器不认this


//开始写面向对象的程序之前, 可以先写一个普通的程序, 然后改成面向对象的
/*
第一步, 完成普通方式下得面向对象的函数

window.onload = function(){
	var oDiv = document.getElementById("div1");
	var oInput =  oDiv.getElementsByTagName("input");
	var oDivBox = oDiv.getElementsByTagName("div");

	for(var i=0; i<oInput.length;i++){
		oInput[i].index = i;
		oInput[i].onclick=function(){
			for(var i=0; i<oDivBox.length;i++){
				oInput[i].className = "";
				oDivBox[i].style.display = "none";
				oDivBox[this.index].style.display = "block";
			}
			this.className="inputStyle";
		}
	}
}
*/
//以上是一个面向过程的一个选项卡程序, 之后要改写成面向对象的, 先将普通程序变形, 变成有属性和方法的类面向对象, 然后在转
//1.函数尽量不要嵌套, 如果有嵌套的函数, 提取出来
//2.可以有全局变量
//3.在onload函数内不是赋值的语句放到单独的函数中,  函数初始化init函数

//第二步,普通方法进行变形, 并测试函数并无问题

/*
var oDiv,oInput,oDivBox
window.onload = function(){
	oDiv = document.getElementById("div1");
	oInput =  oDiv.getElementsByTagName("input");
	oDivBox = oDiv.getElementsByTagName("div");
	init();
}
function init(){
	for(var i=0; i<oInput.length;i++){
		oInput[i].index = i;
		oInput[i].onclick=change;
	}
}
function change(){
			for(var i=0; i<oDivBox.length;i++){
				oInput[i].className = "";
				oDivBox[i].style.display = "none";
				oDivBox[this.index].style.display = "block";
			}
			this.className="inputStyle";
		}
*/

//在测试无问题以后, 可以进行函数第三步, 改成面向对象
//1. 全局变量就是属性
//2. 函数就是方法
//3. 改变this指向, (重要), 要尽量让面向对象中得this指向对象
//4. 在onload中创建对象
window.onload = function(){
	//通过这样调用, 只要结构正确 那么就可以在页面上调用很多选项卡
  var t1 = new tab("div1");
  t1.init();
  var t2 = new tab("div2");
  t2.init();
  t2.autoChange();
  //并且如果想要新增方法 就直接调用,不要用的就不调用, 方便灵活

}
function tab(obj){
	this.oDiv = document.getElementById(obj);
	this.oInput =  this.oDiv.getElementsByTagName("input");
	this.oDivBox = this.oDiv.getElementsByTagName("div");
}

tab.prototype.init = function(){
		//在外部定义的一个this指向, 作用是在会发生this指向改变的时候, 通常是事件函数或者定时器
		var This = this;
		for(var i=0; i<this.oInput.length;i++){
			this.oInput[i].index = i;
			//!重点: 现在这个作用域里面的this指向的是对象,然后, 这个按钮元素所指向的这个change方法会导致在change方法的this指向改变成按钮
			//遵循第三点, 要劲量让面向对象中得this指向对象本身, 要怎么做? 不能直接让方法指向这个onclick事件.
			this.oInput[i].onclick = function(){
				//直接定义个方法, 在这个方法里, 这个this的变量就已经变成了按钮元素.直接做为参数传给change方法
				//这个被改变的对象本身的this则, 可以在外部定义一个局部变量指向this对象(第73行)
				//那么这个This变量就指向了对象函数.  而作为参数的this 就是指向的按钮元素, 完美解决~
				This.change(this);
			}
		}
	}

tab.prototype.change = function(input){
	//在change函数中 实际上这个this就是在外部的作用域中所定义好的This变量所引用的对象
	for(var i=0; i<this.oDivBox.length;i++){
		this.oInput[i].className = "";
		this.oDivBox[i].style.display = "none";
		//参数input就是触发按钮的元素, 这里是通过input传入
		this.oDivBox[input.index].style.display = "block";
	}
	input.className="inputStyle";
}
//可以给需要再定义的元素添加新的功能
tab.prototype.autoChange = function(){
	//在定时器内的this是指向window的, 所以无法使用,故要在外部定义
	var This = this;
	var num = 0;
	var iTimer = null;
	clearInterval(iTimer);
	iTimer = setInterval(function(){
		if(num  == This.oInput.length){
			num =0;
		}
		for(var i=0;i<This.oInput.length;i++){
			This.oInput[i].className = "";
			This.oDivBox[i].style.display="none";
		}
		This.oDivBox[num].style.display="block";
		This.oInput[num].className = "inputStyle";
		num++;
	},1000)

}

