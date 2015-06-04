window.onload = function(){
	var mb = new MBanner("banner1","bannerBox","li");
	mb.init();
}

function MBanner(obj,ul,clildType){
	this.b1 =  document.getElementById(obj); 
	this.bannerBox = document.getElementById(ul);
	this.oLi =  bannerBox.getElementsByTagName(clildType);
	
	this.num = 0;
	this.touchsLeft  = 0;
	this.boxLeft =0;
	this.clickTime = 0;
	 this.timer = null;
	this.btu = true;
	this.init();
	

}

/* 几个仿IOS效果banner细节要关注一下:
	1. 手指触摸到哪里, 图片就同步移动到哪里, 在头部和尾部的时候, 移动则会感到非常困难的感觉(原理就是除一个N的系数, 慢N倍)
	2. 实现以上的效果以后,往左拉动是没有问题的, 如果这时先往右拉动一部分. 在往左拉, 会出现一个跳跃的效果.
	   出现的理由就是, 实际在移动中存的是按下时候的touchsLeft. 一旦触发if里面的(35行)小于等于0, 变成了一个N倍的减小, 而这个时候还是按下时候的值, 所以会有跳跃感
	   解决方法是: 在触发了小于0以后 再存一下当前按下的值
	3. 滑动了以后, 要判断左滑还是右滑, 这时需要比较按下的值, 和抬起的值, 小于就是左, 大于就是右.
	4. 然后, 如果滑动的时候. 他的滑动距离如果没有超过广告的一半, 他就会回归. 
	   这个需要判断滑动的距离(按下的减去抬起的,) 如果是左滑的距离则是(抬起的减去按下的, 不然会出现负数), 得出距离以后进行判断是否是广告宽度的一半	(oLi[0].offsetWidth/2 )
	5. 然后. 虽然他有时候没有划过一半, 但是他得滑动速度很快, 即使不满足一半 也是可以滑动过去的
	   这个效果做法就是, 定义一个相对全局变量, 然后在按下的时候存一下 Date.now()  然后让抬起的 Date.now()减去按下时候存的now, 则可以获取滑动时间
	6. 如果他没有划过过一半, 只是轻轻点了一下元素, 这时候也会滑动(), 因为根据时间的判断是满足条件的, 所以还要再加上一个  && (必须)要滑动超过30元素 才可以       				
*/

MBanner.prototype.init = function(){
	
	this.bannerBox.style.width = this.oLi[0].offsetWidth * this.oLi.length+"px";
	var This = this;
	this.bannerBox.ontouchstart = function(){
		This.moveStart();
	};

}


MBanner.prototype.moveStart = function(){
	
	//这里要获取到触摸下得鼠标坐标之前,  移动端在获取到event对象之后不能直接访问坐标等属性,  要先获取一个event对象下的changedTouches[0]
	//这是手指操作的集合, 类数组,  有几个手指就是几项, 单指操作的话, 就获取[0] 即可, 就可以获得这个对象 在这个对象下才有获取坐标等属性
	var touchs  = event.changedTouches[0];
	
	//先存一下鼠标按下的坐标值
	this.touchsLeft  = touchs.pageX;
	//再存一下当前box的坐标值
	this.boxLeft = this.bannerBox.offsetLeft;
	//声明一个用于记录元素当前的位置值
	this.clickTime = Date.now();
	
	clearInterval(this.timer);
	//alert(boxwidth);
	var This = this;
	this.bannerBox.ontouchmove = function(){

		This.moving();
	}
	this.bannerBox.ontouchend = function(){
		This.moveEnd();
	} 
	//阻止鼠标按下默认事件

	return false;
}

MBanner.prototype.moving =function(){
	
	event.cancelBubble = true;
	event.preventDefault();
	//取消浏览器默认的事件, 防止出现滑动出现卡顿现象
	var touchs  = event.changedTouches[0];
	
	//当判断运动层的left的值大于0, 说明移动层要向右移动, 那么左边就要露出白块, 这时候要加入运动减速, 仿IOS效果 
	if(this.bannerBox.offsetLeft >= 0 ){
		
	if(this.btu){ this.btu = false; this.touchsLeft = touchs.pageX;}
		//让实时跟踪手指速度的.  除以3这个系数, 就是比手指滑动速度慢3倍
		
		this.bannerBox.style.left = (touchs.pageX-this.touchsLeft)/3+ this.boxLeft+"px";

		//同理, 如果 当前的Left的值要快显示光了, 最右边要没了, 露出白块了要
		//算法就是 移动总宽度 减去一个 显示框体的宽度, 那么这个left就在最后一张图的最左上角. 再移  就要缓动了,
		//要注意:   不能总宽度去减,  因为会得出正数,  而一直在左移的left则是负到很后面, 这时候要   框体-去总宽度, 这样就能得负
	}else if(this.bannerBox.offsetLeft <= this.b1.offsetWidth - this.bannerBox.offsetWidth ){
		alert(123);
		if(this.btu){ this.btu = false; this.touchsLeft = touchs.pageX;}
		this.bannerBox.style.left = (touchs.pageX-this.touchsLeft)/3+ this.boxLeft+"px";
	}else{
		//document.title = touchs.pageX-touchsLeft + boxLeft;
	//让层的left值 跟随手指移动,  算法是:移动的当前量 减去按下时候的值得到的滑动的距离, 再加上当时层的LEFT值  作为一个left值累加
		this.bannerBox.style.left = touchs.pageX-this.touchsLeft + this.boxLeft +"px";
		
	}

	
}

MBanner.prototype.moveEnd = function(){
	//阻止冒泡事件, 因为已经监听到了banner元素, 父级通常会有滚动条事件, 不希望冒泡给父级的滚动条响应
	event.cancelBubble = true;
	var touchs  = event.changedTouches[0];
	//当滑动结束以后, 需要判断是左滑还是右滑, 然后进行运动, 当这个按下的值小于当前这个值, 说明是左边滑动
	if(this.touchsLeft < touchs.pageX){
		if(this.num != 0){
			if(touchs.pageX - this.touchsLeft > this.oLi[0].offsetWidth/2 || Date.now() - this.clickTime < 300 && touchs.pageX - this.touchsLeft> 30){
				this.num--;
			}
		}	
	startMove(this.bannerBox,{"left":- this.oLi[0].offsetWidth*this.num},400,"easeOut");
	}else{
		if(this.num != this.oLi.length-1){
			if(this.touchsLeft - touchs.pageX > this.oLi[0].offsetWidth/2 || Date.now() - this.clickTime < 300 && this.touchsLeft - touchs.pageX > 30){
				this.num++;
			}
		}
		startMove(this.bannerBox,{"left":-this.oLi[0].offsetWidth*this.num},400,"easeOut");
	}
	this.touchsLeft  = 0;
	this.boxLeft =0;
	this.bannerBox.ontouchmove = null;
	this.bannerBox.ontouchend = null;
}