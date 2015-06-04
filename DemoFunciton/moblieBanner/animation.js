// window.onload = function(){
//    var oDiv3 = document.getElementById("box3");
//    startMove(oDiv3,{
//    		left: 300,
//    		width: 200,
//    		opacity:100
//    },2000,"elasticOut",function(){
//    	alert(this.id);
//    });
// }




//时间版运动框架,  arguments: obj : 需要运动的元素, json: { 需要运动的方向: 目标值,需要运动的方向: 目标值}, time : 多少时间内完成, fx: 运动形式  匀速还是加减速, fn : 回调
function  startMove(obj, json,times, fx, fn){
	//根据 tween算法,  需要依次给需要运动的元素加入初始值,  目标值,  和运动时间
	//建立一个JSON  icur  里面存放需要运动方向的和目标值
	var iCur = {};

	var startTime = now();
	
	for (var attr in json){
		iCur[attr] = json[attr];
		//判断是否有透明度的要求,这个和其他方向型运动不同 ,需要特殊处理
		if(attr == "opacity"){
			//获取定义透明度的值, 乘以100, 便于计算
			iCur[attr] = Math.round(css(obj,"opacity")*100);
		}else{
			//将元素的初始值获取到.并且parseInt掉 PX, 便于计算
			iCur[attr] = parseInt(css(obj,attr));
		}
	}
	//利用上面这个for循环,  初始值都获取到之后, 开启定时器, 并把参数赋予 tween算法, 运动核心
	clearInterval(obj.timer);
			
	obj.timer = setInterval(function(){
		var changeTime = now();
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
			var value  =  Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);
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
	
}
function now(){
	return new Date().getTime();
}	
function css(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
var Tween = {
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
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}