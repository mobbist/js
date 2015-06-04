//仿jquery的一个小框架,  封装了一些dom操作和 一些运动函数 , 主要就是简化Jquery. 这个框架不封装选择器

/*
window.onload =function(){
	var box = document.getElementById("box");
	var opacity100 = document.getElementById("opacity100");
	var opacity30 = document.getElementById("opacity30");
	opacity100.onclick = function(){
		mobb().startMove(box,{"opacity":100},10)
	}
	opacity30.onclick = function(){
		mobb().startMove(box,{"opacity":0},-10)
	}
	var div1 = document.getElementById("div1");
	var div2 = document.getElementById("div2");

		div1.onmouseover = function(){
		mobb().startMove(this,{"left":0,"opacity":100},10);
	}

	div1.onmouseout = function(){
		mobb().startMove(this,{"left":-100,"opacity":10},-10);
	}

	var box3 = document.getElementById("box3");
	box3.onclick = function(){
		mobb().spring(this,388,8);
	}
}*/

//mobb的构造函数, 内部实际上是返回的是 mobb空间下面的一个init对象
var mobb  = function(){
	return new mobb.init();
}
//实际上被new的对象.
mobb.init = function(){}

//函数都是填写在其原型内部. 直接可以 mobb()不需要new关键字即可调用
mobb.init.prototype = mobb.prototype = {
	constructor : mobb,
	author:"mobbist",
	//透明度+运动同步缓动算法,   
	//传参数: obj: 元素对象,  
	//json对象, 内部接受键为: "left","top","opacity", 值为到达的目标值坐标: number类型 实例  {"lfet",30}
	//iSpeed  速度值, 这是移动到目标值的速度 , 建议10,  
	//bug: 透明度在减少时的BUG
	startMove: function(obj,json,iSpeed,fn){

		clearInterval(obj.iTime);
	var iCur;
	//将定时器的变量声明在对象下, 这样定时器关闭的时候 只会关闭自己的.
	obj.iTime = setInterval(function(){
		//在定时器开始以后, 进行第一步的时候, 开始遍历JSON对象里值,作用就是要知道哪些位置(定位,或者大小)是需要同时运动的
		for(var type in json ){
		//获取里面对齐type所要操作的值就是参数 {"lfet":100} 里的100.
		var opa = json[type];
			//遍历出type的值,判断是否有opacity,有的话说明要作透明度,需要注意的是, 这些是在一个定时器里的, 所以实现同步
			if(type == "opacity"){
				//开始之前, 需要把样式上的透明度获取,*100, 主要是因为小数做算法会有精度问题, 另外IE是乘以100的值显示
				//由于google浏览器有小数相乘的精度问题, 会影响到77行判断, 所以这里要进行数学函数的四舍五入法

				iCur = Math.round(mobb().css(obj,"opacity")*100);
			}else{
				//反之, 如果不是要作透明度. 哪说明是定位或者大小计算, 那么直接获取这个type值, 进行做计算就可以了

				iCur = parseInt(mobb().css(obj,type));
			}

			//缓冲算法,在定时器内部 速度减去当前的坐标值除以一个系数
			iSpeed = (opa - iCur)/8;

			//然后, 由于css和JS的对小数的认知度问题, offsetLfet方法是得到一个小数, 所以会运动不到位置点, 所以要对其进行取整, 
			//然而 往左右移 就是0的正负数, 这些向上下取整得方式页要判断一下
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);


			//然后将这个值和目标的透明度判断, 满足就完成了. 不满足就开始计算
			if(iCur == opa){
				//满足值以后 清除定时器
				clearInterval(obj.iTime);
				fn && fn();
			}else{
				if(type == "opacity"){
				//为了便于标准浏览器计算, 所以求出这个值,还必须除以100, 成为可以被标准浏览器的opacity所能识别的值
				obj.style.opacity = (iCur+iSpeed)/100;
				//IE下进行赋值
				obj.style.filter = "alpha(opacity="+(iCur+iSpeed)+")"
				}else{
					//obj.offsetLeft  获得当前元素相对父元素的坐标值, 这里也是要对其需要修改的type进行传值移动
					
					obj.style[type] = iCur+iSpeed+"px"; 
				}	
			}
		}
		//到这里, 第一步的动作就已经完成. 只要判断满足条件. 就会停止. 
	},30)
	},
	//获得obj元素的css属性值, 还可以获得自定义的值
	//arguments:  
	//obj : 元素对象
	//attr : 需要获得的元素名 , 字符串类型
	//实例 : css(box,"width") 获得box元素的width属性值
	css:function(obj,attr){

		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
	}
	},
	//弹性方法, 接受参数:  obj, 需要运动的元素, target, 运动到得目标点
	spring: function(obj,target,num){
		clearInterval(obj.iTime);
		//弹性运动, 因为速度值要累加累减(做加减速运算), 所以要定义在相对全局的位置上
		var iSpeed = 0;
		obj.iTime = setInterval(function(){
			//弹性的运动公式,  目标点 - 当前位置点 除以一个系数
			//这个目的就是根据距离来得出速度, 因为距离的远近跟速度的是成正比的
			//然后除以一个系数, 让它速度能够慢下来, 和缓动运动的原理相似
			iSpeed += ( target - obj.offsetLeft)/num;
			//理论上 如果不加入摩擦力的话, 这是一个无限运动, 所以要上速度损耗, 乘以一个小于1的值 就可以让速度每次运动损耗
			iSpeed *= 0.70;
			//判断, 当速度的绝对值(减速运动会有负数,所以取绝对正数)小于等于1, 说明已经很慢了
			//并且, 当目标点和当前的坐标值的绝对值也小于1, 说明距离目标也非常接近.  这个时候我们可以判断到达, 运动该停止
			if(Math.abs(iSpeed) <= 1 && Math.abs( target-obj.offsetLeft <=1) ){
				//然后进行清除的定时器, 和校准误差, 并且速度降于0, 关闭发动机
				clearInterval(obj.iTime);
				obj.style.left = target+"px";
				iSpeed =0;
			}

			obj.style.left = obj.offsetLeft+ iSpeed+"px";
		},30)
	},
	//通过Class获得元素,封装一个函数, arguments : 父类元素(doc), 标签类型(string), className(string), 返回的是一个数组
	getElementByClassName : function(tagName,type,className){
		//获取标签类型, 返回数组
		var arr = [];
		//指定父类的元素
		var aEls  = tagName.getElementsByTagName(type);

		//遍历这个标签的, 然后将里面每一个内容的Class值 切割成数组.
		for(var i=0; i<aEls.length; i++){
			//因为每个元素中不止一个ClassName 所以要进行切割成数组
			var aClassName = aEls[i].className.split(" ");
			//再一次遍历这个标签里的ClassName  看是否有同样的Class值, 有就插入新数组
			for(var j=0; j<aClassName.length;j++){
				if(aClassName[j] == className){
				arr.push(aEls[i]);
				//当已经完成插入动作以后, 就直接跳出这个循环, 防止出现同样的ClassName.  则需要直接break
				break;
			};	
			}
			
		}
		return arr;
	}
}


