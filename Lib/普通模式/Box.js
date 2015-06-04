(function(window,undefined){
	//obj:事件响应层, 
	//objparent:弹出层的加载层, 通常是响应层的父类
var Box = function(obj,objparent){
	this.setting ={
		obj:obj,
		objparent : "" || obj.parentNode
	};
	this.selectEvent = null;
	//是否需要位移到上部(手动)
	this.move = true;
	//传入的参数arr是否有一个title json,如果有, 需要有返回的方法
	this.title = false;
	//创建一个统一的背景层, 不需要每次都添加, 一次添加,显隐切换
	if(!Box.prototype.BG){
		var body = document.getElementsByTagName("body")[0];
		var boxBG = document.createElement("a");
		fl.addClass(boxBG,"createBoxBG");
		fl.attr(boxBG,"href","javascript:");
		//boxBG.style.height = document.body.scrollHeight+"px";
		boxBG.id = "createBG";

		body.appendChild(boxBG);
		Box.prototype.BG  = boxBG;

	}

}
//模拟下拉菜单. 参数 eventName:触发事件名, arr:li标签索要循环数组  fn: 回调函数
Box.prototype.select = function(eventName,arr,fn) {
	var This = this;
	//先解除再绑定, 防止多次触发,多次绑定
	fl.unbind(This.setting.obj,eventName,This.selectEvent);
	//绑定弹出事件
	fl.bind(this.setting.obj,eventName,this.selectEvent = function(ev){
		ev.preventDefault();
		fl.addClass(Box.prototype.BG,"BGhover");
		var box = document.createElement("ul");
		box.id = "createBox";
		fl.addClass(box,"createBoxSelect");
		for(var i=0; i<arr.length;i++){
			if(arr[i]["title"]){
				This.title = true;
				for(var j=0; j < arr[i]["title"].length;j++){
					var arrLiName = document.createElement("li");
					fl.addClass(arrLiName,"createBoxName");
					arrLiName.innerHTML ="<span>"+arr[i]["title"][j]["key"]+"</span>";
					fl.attr(arrLiName,"optValue",arr[i]["title"][j]["value"]);
					box.appendChild(arrLiName);
				}
				//console.log(arr[i]["title"].length);
			};
			if(arr[i]["list"]){
				for(var j=0;j<arr[i]["list"].length;j++){
					var arrList = document.createElement("li");
					var arrListA = document.createElement("a");
					fl.addClass(arrListA,"createBoxLi");
					arrListA.innerHTML =arr[i]["list"][j]["value"];
					fl.attr(arrListA,"href","javascript:");
					fl.attr(arrListA,"optValue",arr[i]["list"][j]["key"]);
					arrList.appendChild(arrListA);
					box.appendChild(arrList);
				}
			}
		}
		This.setting.objparent.appendChild(box);
		if(This.move){
			var num = 0;
			var timer = null;
			var top = document.body.scrollTop
			timer = setInterval( function(){
				document.body.scrollTop =  num + top;
				num += 10;
				if(num+top >= This.setting.objparent.offsetTop-60){
					clearInterval(timer);
				}
			},13);
		}
		
		
		//fl.unbind(document,"click",This.callback);
		//绑定dom,让dom代理点击事件,事件结束以后, dom事件需要解绑
		fl.bind(document,"click",This.callback = function(ev){
			var ev = ev || event;
			if(ev.target.className == "createBoxLi"){
				if(This.setting.obj.nodeName == "INPUT"){
					This.setting.obj.value = ev.target.innerHTML;
				}else{
					console.log(typeof This.setting.obj);
					This.setting.obj.innerHTML = '<div class="selectBox done"><div class="st"></div>'+ev.target.innerHTML+'</div>'
				}
				This.setting.objparent.removeChild(box);
				fl.removeClass(Box.prototype.BG,"BGhover");
				fl.unbind(document,"click",This.callback);
				fl.bind(This.setting.obj,eventName,This.selectEvent);
				//获取点击节点的父节点
				if(This.title){
					var prev = fl.prev(ev.target.parentNode);
					while(prev.className != "createBoxName"){
					 	prev = fl.prev(prev);
					};
					fn && fn.call(This,fl.attr(prev,"optValue"),fl.attr(ev.target,"optValue"));
				}else{
					fn && fn.call(This,fl.attr(ev.target,"optValue"));
				}
				
			}else if(ev.target.id == "createBG"){
				This.setting.objparent.removeChild(box);
				fl.removeClass(Box.prototype.BG,"BGhover");
				fl.unbind(document,"click",This.callback);
			}
		});
	});
	
};
//解除模拟下拉菜单select事件 
Box.prototype.unSelect = function(eventName,string){
	fl.unbind(this.setting.obj,eventName,this.selectEvent);
	this.setting.obj.innerHTML = '<div class="selectBox"><div class="st"></div>'+string+'</div>'
	//fl.unbind(obj,eventName,This.selectEvent);
}


//简易弹出层,内容不定
Box.prototype.alertBox = function(eventName,closeBox,fn,choseFn){
	var This = this;
	var boff = true;
	//先解除再绑定, 防止多次触发,多次绑定
	fl.unbind(This.setting.obj,eventName,This.alertEvent);
	//绑定弹出事件
	fl.bind(this.setting.obj,eventName,this.alertEvent = function(ev){

		if(boff){
			Box.prototype.BG.style.visibility = "visible";
			Box.prototype.BG.style.opacity = "0.8";
			fn && fn.call(This.setting.obj);
		}else{
			choseFn && choseFn.call(This.setting.obj);
		}
		boff = !boff;
		fl.bind(document,"click",This.alertback = function(ev){
			var ev = ev || event;

			if(ev.target.id == "createBG" || fl.attr(ev.target,"type") == closeBox){
				This.closeBG();
				fl.unbind(document,"click",This.alertback);
				choseFn && choseFn.call(This.setting.obj);
				boff = !boff;
			}
		});
	});

}
Box.prototype.closeBG = function(){
	Box.prototype.BG.style.opacity = "0";
	setTimeout(function(){
		Box.prototype.BG.style.visibility = "hidden";	
	},500)


}

//document全局响应弹出层. 类似alert框
Box.prototype.alertLine = function(string,butString){
	fl.addClass(Box.prototype.BG,"BGhover");
	Box.prototype.BG.style.zIndex = "999";
	var body = document.getElementsByTagName("body")[0];
	var cDiv = document.createElement("div");
	var cp = document.createElement("p");
	var cBut = document.createElement("div");
	cp.innerHTML=string;
	cBut.innerHTML= butString;
	cBut.id="closeBut"
	fl.addClass(cDiv,"alertstyle");
	cDiv.appendChild(cp);
	cDiv.appendChild(cBut);
	body.appendChild(cDiv);
	var This =this;
	fl.bind(cDiv,"click",This.alertLineback =function(ev){
		var ev = ev || event;
		ev.stopPropagation()
		if(ev.target.id == "closeBut"){
			fl.unbind(cDiv,"click",This.alertLineback);
			This.closeBG();
			body.removeChild(cDiv);
			Box.prototype.BG.style.zIndex = "50";
		}
	})
}

window.Box = Box;
})(window)