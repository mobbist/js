
//焦点: 使浏览器能够区分用户输入的对象, 当一个元素有焦点的时候, 那么他就可以接受响应用户的输入操作
//我们可以通过一些方式给元素设置焦点,  点击 , tab, JS. 当然, 不是所有元素都能够接受焦点. 能够响应用户操作的元素才有焦点
//1. 获得焦点事件:  		元素.onfocus   当元素获得焦点的时候触发
//2. 失去焦点事件:  		元素.onblur    当元素失去焦点的时触发
//3. 获得元素焦点方法:  	元素.focus()   给指定的元素设置焦点方法.  注意: 这是一个强制当前元素获得焦点的方法
//4. 取消元素焦点方法: 	元素.blur()    取消指定元素的焦点,       注意: 这是强制取消当前元素的焦点
//5. 操作元素的事件: 		元素.select()  给当前元素的值,复制到剪贴板上 等等


//event:   事件对象,   当一个事件发生的时候, 和当前这个对象发生的这个事件有关的一些详细信息都会被临时保存到一个地方, 就是Event对象,供需要的时候调用
//event对象必须在一个事件调用的函数里面使用才有内容. 否则在IE/Chrome下是 undefined  null;  在标准浏览器: 下则是未定义
//事件函数: 事件调用的函数, 一个函数是不是事件函数, 不在定义的时候决定的,  而且取决于调用的时候

//如果一个函数是被事件调用的, 哪么这个函数定义的第一个参数就是事件对象
//为了兼容所有浏览器:在函数的参数上调用
document.onclick = function(ev){
	//, 然后在内部判断 是不是这个为true, 如果不是那说明就是非标准浏览器或者chrome  那就直接赋值event对象
	var ev = ev || event;
	//看一下 这个对象里有写什么属性和值
	for(attr in ev){
		console.log(attr+":"+ev[attr]);
	}
	//鼠标到可视区域的left的值, 哪怕把屏幕移动下去, 如果在左上角点击还是获得0, Y同理
	//alert(ev.clientX);

}
document.onclick = null;




// onmousemove :   当鼠标在一个元素上面移动的时候触发
//触发的频率不是像素, 而是间隔时间, 在一个指定时间内(很短), 如果鼠标的位置和上一次的位置发生了变化, 那么就会触发一次


//事件冒泡:  当一个元素接受到事件的时候,除了会执行这个事件之外, 会把他接受到的所有传播给他得父级, 他的父级页会传播给父级, 一直到顶层window
//实际上我们在给元素添加事情只是给他添加事件的处理函数,  元素即使没有添加处理函数 本身也是可以响应事件的. 没有添加过处理函数的元素 是什么也不做,
//但是, 不影响他接受事件, 所以既然他能响应事件, 当然可以传播给父级事件
//  document.onlick = 某某事件 :

//阻止事件冒泡:  页面上存在很多元素的时候, 有时候在嵌套的元素中由于事件冒泡机制 会有很多情况出现, 这时, 需要阻止事件冒泡
//阻止冒泡demo:
//假设有一个需求, 我要在一个元素上点击弹出一个层,  在点击其他位置的时候, 这个层要消失. 这个怎么做
window.onload = function(){
	var oBotton = document.getElementById("obutton");
	var oul2 = document.getElementById("ul2");
	//定义弹出的一个方法
	oBotton.onclick = function(ev){
		var ev = ev || event;
		//由于事件冒泡影响, 当我点击了显示的按钮, 那么他同时也会传送给父级直到document, 那么document就是会执行隐藏这个层,
		//所以这里需要阻止事件冒泡.
		ev.cancelBubble = true;  //注意:  只是阻止当前元素的当前事件的冒泡机制, 其他事件还是会响应冒泡机制的

		oul2.style.display = "block";
	}
	//再定义一个全局的 点击其他地方要取消这个层
	document.onclick = function(){
		//那么冒泡机制不会响应这里, 所以只有当点击上页面的其他元素, 才会执行函数  直接隐藏
		oul2.style.display = "none";
	}


	//事件绑定demo
	var  oLi = document.getElementsByTagName("li");

	//在使用这2个绑定,取消函数的时候, 在需要解除绑定的函数上最好封装成一个值, 匿名函数无法接触绑定, 因为在内存里是2个地址
	var fn2 = function(){ alert(this.className)}
	for(var i=0; i<oLi.length;i++){
		bind(oLi[i],"click",fn2);
	}
		//这里只是解除下标值为0的方法
		unbind(oLi[0],"click",fn2);
	
	
	
	
}

//事件绑定的第一种方法:  obj.onclick = fn
//这种赋值型的方法有一个小弊端, 就是如果我要再这个元素上添加2个方法, 那么后一种方法会覆盖前一种.
//为了解决这种给一个对象的同一个事件绑定多个不同的函数, 出来第二种方法:
//IE 下:   obj.attachEvent(事件名称, 事件函数);   				1.没有捕获,  2. 事件名称写全,  3.无法捕获, 可以冒泡  4.this指向window
//标准下:  obj.addEventListener(事件名称, 事件函数, 是否捕获);  1.有捕获     2. 去除on        3.可以捕获, 可以冒泡,  4.this指向该事件的元素

//解决这些兼容问题需要引入一个方法    call():
//call() 函数下的一个方法,就像数组下有,push方法一样, 是一个内置方法  call方法第一个参数可以改变函数执行过程中得内部this的指向
function fn1(a,b){ alert(this); }
// fn1()  就是普通调用了fn1函数,  他指向的就是window
//fn1.call(document)   相当于调用了fn1函数下的一个call方法. 
//重点是: 如果对其进行传参的话, 那么fn1函数的this指向就会变成这个传入的参数  很高端的用法. 从call方法第二个参数开始就是原函数的参数, 
//如果第一个参数传入NULL   那么这个就指向原函数所指向的this指向. 

//封装浏览器之间的差异的 bind方法:  arguments: obj: 需要绑定的元素名    evname :事件名称, 去除on    fn:需要执行的事件
function bind(obj,evname,fn){
	//判断是否有这个方法, 如果有说明是标准  就直接执行并传参就可以
	if(obj.addEventListener){
		//一个点击发生时 实际上是触发了2次, 一次是从最外层(body)到目标元素, 成为事件捕获(进来), 第二次是从目标元素到最外层(body),称为冒泡(出去)
		//false就是冒泡, 出去的事件触发   true 就是事件捕获, 进来的事件触发
		obj.addEventListener(evname,fn,false);
	}else{
		//IE浏览器就执行attachEvent, 传入参数加入on
		obj.attachEvent("on"+evname,function(){
			//然后修改fn的this指向, 改成这个传入元素名.
			fn.call(obj);
		});
	}
}

//事件绑定的取消 第一个种方法:  obj.onclick = null 
//因为是赋值型的, 所以无法运用于addEventListener
//同样的, 如果要取消由addEventListener所绑定的函数, 那么还要有第二种方法:
//IE下: 		obj.detachEvent(要取消的事件名称,和要取消的事件函数);
//标准下:    obj.removeEventListener(要取消的事件名称,和要取消的事件函数,是否捕获)  
//这个是否捕获取消的就是是不是有捕获(进来)事件所触发的, 因为同样一个函数, 可以有捕获和冒泡, 这是不同的2个函数, 所以要询问  是否捕获
//封装一下浏览器之间的差异的   unbind 方法
function unbind(obj,evname,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(evname,fn,false);
	}else{
		obj.detachEvent("on"+evname,fn);
	}
}

//以上都是操作鼠标事件,还有键盘事件
//当有键盘按键被按下的时候触发:    document.onkeydown = function(){} 
//当键盘按键抬起的时候触发: 	   document.onkeyup = function(){}
//在evnet对象里的记录事件发生时的按键值  event.keycode    数值类型  键盘按键的值
//在event对象里记录3个功能键,  在触发事件的时候.判断是否按了这3个功能键, 返回布尔类型     event.ctrlkey  event.shiftkey   evnet.altkey
//并不是所有元素都能响应键盘事件的.  只有能和用户交互的元素如  input 
//只要把键盘事件加到doc元素上 就可以实现了.  
document.onkeydown= function(ev){
	var ev = ev || event;
	switch(ev.keyCode){
		 case 37: alert("左");
	}
	switch(ev.keyCode){
		 case 38: alert("上");
	}
	switch(ev.keyCode){
		 case 39: alert("右");
	}
	switch(ev.keyCode){
		 case 40: alert("下");
	}
}
//onkeydown :  如果按下不抬起,  那么会连续触发    		