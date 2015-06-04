//functionLibraries : 封装了一个js常用函数的单体对象 fl
(function(window,undefined){
var fl = {
	//获取元素css样式
	css:function(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	},
	//添加元素class
	addClass:function(obj,className){
		//先判断一下有没有class属性, 没有就直接创建, 有就做else的
		if(obj.className ==""){
			obj.className = className;
		}else{
			var arrClassName = obj.className.split(" ");
			var arrindexOf = this._arrIndexOf(arrClassName,className);
			if(arrindexOf == -1){
				obj.className += " "+className;
			};
		}
	},
	removeClass : function(obj,className){
		if(obj.className !=""){
			//同样的, 需要先把元素的Class分离成一个数组, 然后对数组进行判断
			var arrClassName = obj.className.split(" ");
			var arrindexOf = this._arrIndexOf(arrClassName,className);
			//arrindexOf方法一定要返回下标值, 说明他是有需要移出的Class值,  不然不存在谈何移除呢
			if(arrindexOf != -1){
				//splice: 数组的移出方法, arguments:坐标值, 移除的个数  
				arrClassName.splice(arrindexOf,1);
				//移除以后, 数组中已经没有需要移除的值了, 然后将数组拼接成字符串(join方法),用空格链接,传入的参数空格
				obj.className = arrClassName.join(" ");
			}
		};
	},
	_arrIndexOf : function(arr, v){
			for(var i=0; i<arr.length;i++){
				if(arr[i] == v){
					return i;
				}
			}
			return -1;
	},
	//操作元素内容,有string参数时是写, 没有则读
	html : function(obj,string){
		if(string){
			return obj.innerHTML = string;
		}else{
			return obj.innerHTML;
		}
	},
	//获取元素标签内的内容, 去除HTML标签
	text : function(obj){
		return obj.innerText || obj.textContent
	},
	//获取当前元素的子一级元素,返回数组
	children :function(obj){
		return obj.children;
	},
	//获取当前元素的子一级元素的第一个元素
	first :function(obj){
		return obj.firstElementChild || obj.firstChild;
	},
	//获取当前元素的子一级元素的最后一个元素
	last :function(obj){
		return obj.lastElementChild || obj.lastChild;
	},
	//获取当前元素的下一个元素
	next :function(obj){
		return obj.nextElementSibling || obj.nextSibling;
	},
	//获取当前元素的上一个元素
	prev : function(obj){
		return obj.previousElementSibling || obj.previousSibling; 
	},
	//获取当前元素的父元素
	parent : function(obj){
		return obj.parentNode; 
	}, 
	//元素运动函数时间版 : obj : 需要运动的元素, json: { 需要运动的方向: 目标值,需要运动的方向: 目标值}, time : 多少时间内完成, fx: 运动形式  匀速还是加减速, fn : 回调
	startMove : function(obj, json,times, fx, fn){
		//根据 tween算法,  需要依次给需要运动的元素加入初始值,  目标值,  和运动时间
		//建立一个JSON  icur  里面存放需要运动方向的和目标值
		var iCur = {};

		var startTime = this.now();
		
		for (var attr in json){
			iCur[attr] = json[attr];
			//判断是否有透明度的要求,这个和其他方向型运动不同 ,需要特殊处理
			if(attr == "opacity"){
				//获取定义透明度的值, 乘以100, 便于计算
				iCur[attr] = Math.round(this.css(obj,"opacity")*100);
			}else{
				//将元素的初始值获取到.并且parseInt掉 PX, 便于计算
				iCur[attr] = parseInt(this.css(obj,attr));
			}
		}
		//利用上面这个for循环,  初始值都获取到之后, 开启定时器, 并把参数赋予 tween算法, 运动核心
		clearInterval(obj.timer);
		var This = this;		
		obj.timer = setInterval(function(){
			var changeTime = This.now();
			//这里计算的是tween的当前时间如何计算? 这里要分几个步骤
			//1. 在定时器外部,先定义一个开始时间的时间戳, 然后在定时器开始一瞬间也定义一下,  通过定时器的运转,  changeTime的值会越来越大,他与startTime的毫秒数的差距也就越大
			//2. 用开始的时间减去变更时间, 得到随着定时器越来的越大得负数, 再加上总时间, 就会得到    比如:  2000 , 1988 , 1975  这样一直递减的值
			//3. 当然, 随着定时器,  这个值 会变成负数,  通过 math.max  那么计算要到负数了, 就会取 0 , 到0了, 说明定时器要停了, 因为到了目标点了 时间都走光了
			//4. 当然, 这个值是从 2000开始的 所以呢,  要让他从  0 , 13 , 26  这样开始  还要再用总时间减去一个才可以.
			var t = times - Math.max(0,startTime  - changeTime + times); 
			//上面这个forin函数是设置元素需要运动的初始值, 这个forin是获取函数的目标值, 因为同时要对多个运动方式同时操作
			for(var attr in json){
				//这里面的就是详细的运动核心, 返回值:就是当前时间元素根据运动形式所得到的坐标值
				//fx: 根据函数参数, 索要进行的运动形式,   t:当前时间  b:初始值(参数获取) c:变化值(初始值-目标值)   d: 持续时间(参数获取)
				var value  =  This.Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);
				if(attr == "opacity"){
					//为了便于标准浏览器计算, 所以求出这个值,还必须除以100, 成为可以被标准浏览器的opacity所能识别的值
					//因为根据tween算法, 100这个正数就是它的目标值.也是透明度的值, 所以用100来计算比较稳妥
					obj.style.opacity = value/100;
					
					//IE下进行赋值
					obj.style.filter = "alpha(opacity="+value+")";
				}else{
					//将根据算法获得的值, 赋予元素, 得到的就是当前事件的坐标值
					obj.style[attr] = value+"px";
				}
			}
			//当t到达了这个时间点, 那么定时器就要关闭, 并且执行回调函数
			if(t == times){
			clearInterval(obj.timer);
			fn && fn.call(obj);
		}
		},13);
		
	},
	now : function(){
		return new Date().getTime();
	},
	Tween : {
		linear: function (t, b, c, d){  //匀速
			return c*t/d + b;
		},
		easeIn: function(t, b, c, d){  //加速曲线
			return c*(t/=d)*t + b;
		},
		easeOut: function(t, b, c, d){  //减速曲线
			return -c *(t/=d)*(t-2) + b;
		},
		easeBoth: function(t, b, c, d){  //加速减速曲线
			if ((t/=d/2) < 1) {
				return c/2*t*t + b;
			}
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	}
}


window.fl = fl;
})(window)