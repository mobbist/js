//封装轮播器的组件
//注意:带有_的方法为内部方法,随时会修改,不建议外部调用.
define(function(require,exports,module){
var Banner = function(opt,fn){
	this.settings = {
		obj : opt.obj,
		shadow : opt.shadow || false,
		timer : opt.timer || 700
	}
	//定义当前图片的位置下标值
	this.num = 0;
	//定时器变量
	this.timer=null;
	//获取元素的长度
	this.step = parseInt(fl.css(fl.first(this.settings.obj),"width"));
	//当前下标值乘以元素的长度, 获得步长, 步长要做相对全局的变量
	this.thisStep = this.num * this.step;
	//开关,当运动结束后开启, 优化用户体验, 防止x双击出现BUG
	this.onOff = true;

	if(this.settings.shadow){
		//渐变型重置位置, 使叠层一起
		this.childs = fl.children(this.settings.obj);
		for(var i=0;i<this.childs.length;i++){
			this.childs[i].style.position = "absolute";
			this.childs[i].style.left="0px";
			this.childs[i].style.top="0px";
			this.childs[i].style.opacity="0";
			this.childs[i].style.filter = "alpha(opacity=0)";
			this.childs[i].style.zIndex = "1"; 
		}
		this.childs[0].style.opacity= "1";
		this.childs[0].style.zIndex = "2"; 
	}else{
		//设置移动层元素的总宽度
		var childs = fl.children(this.settings.obj);
		this.settings.obj.style.width = this.step * childs.length+"px";
	}
	
}
//外部调用函数:往左移动方法,接受回调函数参数
Banner.prototype.toRight = function(fn){
	if(this.onOff){
		this.onOff = false;
		var This = this;
		var childLength = fl.children(this.settings.obj).length
		//总步长等于当前步长加上(因为往左移动是负数, -号就是负数增长)移动步长,就是往左移动算法
		this.thisStep =  parseInt(this.thisStep) - parseInt(this.step);
		fn && fn();
		if(this.num < childLength-1 ){
			//判断切换样式, 为false则就是移动, ture就是渐变型
			if(this.settings.shadow){
				fl.next(This.childs[This.num]).style.opacity="1";
				fl.startMove(this.childs[this.num],{opacity:0},this.settings.timer,"linear",function(){
					This.childs[This.num].style.zIndex="1";
					fl.next(This.childs[This.num]).style.zIndex="2";
					This.num ++;
					This.onOff = true;
				});
				//alert(123);
			}else{
				fl.startMove(this.settings.obj,{left:this.thisStep },300,"easeOut",function(){
					This.num ++
					This.onOff = true;
				});
			}
		}else{
			//判断切换样式,
			if(this.settings.shadow){
				this.childs[0].style.opacity="1";
				fl.startMove(this.childs[this.num],{opacity:0},this.settings.timer,"linear",function(){
					This.childs[This.num].style.zIndex="1";
					This.childs[0].style.zIndex="2";
					This.num = 0;
					This.thisStep = 0;
					This.onOff = true;
				});
			}else{
				//无限移动算法: 已经判断到最后一个的时候, 
			//将第一个子元素的内容直接position:relative到多出哪一格的位置(也就是正好是元素的长度值),然后在运动结束以后, 将position还原. 
			var firstElement = fl.first(this.settings.obj);
				firstElement.style.position = "relative";
				firstElement.style.left = this.step * childLength+"px" ;
				fl.startMove(this.settings.obj,{left:this.thisStep },300,"easeOut",function(){
					//IE不能将position的值改为initial,会JS报错, 只能为空
					firstElement.style.position = "";
					This.settings.obj.style.left = "0px";
					This.num = 0;
					This.thisStep = 0;
					This.onOff = true;
				});
			}
		}
	}
}	
//外部调用函数:往右移动方法
Banner.prototype.toLeft = function(fn){
	if(this.onOff){
		this.onOff = false;
		var This = this;
		var childLength = fl.children(this.settings.obj).length
		//总步长等于当前步长加上移动步长
		this.thisStep = parseInt(this.thisStep) + parseInt(this.step) ; 
		fn && fn();
		if(this.num <= 0){
			//判断切换样式,
			if(this.settings.shadow){
				This.childs[childLength - 1].style.opacity="1";
				fl.startMove(this.childs[0],{opacity:0},this.settings.timer,"linear",function(){
					This.childs[0].style.zIndex="1";
					This.childs[childLength - 1].style.zIndex="2";
					This.num = childLength - 1;
					
					This.onOff = true;
				})
			}else{
				var lastElement = fl.last(this.settings.obj);
				lastElement.style.position = "relative";
				var lastLeft = "-"+this.step * childLength+"px" ;
				lastElement.style.left = lastLeft;
				fl.startMove(this.settings.obj,{left:this.thisStep},300,"easeOut",function(){
					lastElement.style.position = "";
					This.thisStep = parseInt(lastLeft) + parseInt(This.step)
					This.settings.obj.style.left =  This.thisStep+"px";
					This.num = childLength - 1;
					This.onOff = true;
				});
			}
		}else{
			if(this.settings.shadow){
				fl.prev(This.childs[This.num]).style.opacity="1";
				fl.startMove(This.childs[This.num],{opacity:0},this.settings.timer,"linear",function(){
					This.childs[This.num].style.zIndex="1";
					fl.prev(This.childs[This.num]).style.zIndex="2";
					This.num --;
					This.onOff = true;
				});
			}else{
				fl.startMove(this.settings.obj,{left:this.thisStep},300,"easeOut",function(){
					This.num --;
					This.onOff = true;
				});
			}
		}
	}
}
//内外都可调用函数:左无限移动运动方式, 内部通过参数auto的设置 
Banner.prototype.auto  = function(iSpeed,fn){
	if(typeof arguments[0] == "function"){
		var fn = arguments[0];
		var iSpeed = 5000;
	}else{
		var iSpeed = iSpeed || 5000;
	}
	var This =this;
	//定时器,左移动方法
	This.timer = setInterval(function(){
		This.toRight();
		fn && fn();
	},iSpeed);

	//鼠标移入清除定时器
	fl.parent(this.settings.obj).onmouseover = function(){
		clearInterval(This.timer);
	}
	//鼠标再移出添加定时器
	fl.parent(this.settings.obj).onmouseout = function(){
		This.timer = setInterval(function(){
			This.toRight();
			fn && fn();
		},iSpeed);
	}
}
//外部调用函数: 点击缩略图列表显示对应位置的图片事件, 参数: event事件函数, 回调.回调参数指向evenetBox
Banner.prototype.index = function(ev,fn){

	if(this.onOff){
		this.onOff = false;
		var ev = ev || event;
		var This = this;
		//利用事件函数获取点击的当前元素, 标准和IE的兼容处理
		var eventBox = ev.target || ev.srcElement;
		if(fl.attr(eventBox,"data-id") != this.num && fl.attr(eventBox,"data-id") != null){
			fn && fn.call(eventBox);
			if(this.settings.shadow){
				var num = fl.attr(eventBox,"data-id");
				This.childs[num].style.opacity="1";
				fl.startMove(This.childs[this.num],{opacity:0},this.settings.timer,"linear",function(){
					This.childs[This.num].style.zIndex="1";
					This.childs[num].style.zIndex="2";
					This.num = num;
					This.onOff = true;
				});
			}else{
				this.num = fl.attr(eventBox,"data-id");
				this.thisStep = "-"+this.num * this.step;
				fl.startMove(this.settings.obj,{left:this.thisStep},300,"easeOut",function(){
					This.onOff = true;
				});
			}
		}else{
			This.onOff = true;
		}
	}
}
module.exports = Banner;
})(window)