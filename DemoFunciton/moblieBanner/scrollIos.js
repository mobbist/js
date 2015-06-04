//给document文档对象添加滚动条事件, 因为取消了IOS默认的效果, 用手动的JS方式来完成这个效果
var oWarp = document.getElementById("warp");
var number = document.getElementById("number");
var touchY;
var thisTop = 0;
var iSpeed = 0;
var pervY = 0;
var timer =
oWarp.ontouchstart = function(ev){
	//获取第0个手指 单指响应
	var  touchs = ev.changedTouches[0];
	touchY = touchs.pageY;
	thisTop = this.offsetTop;
	//在按下得时候存一下上一点的y坐标
	pervY = touchs.pageY;
	var btu = true;
	oWarp.ontouchmove = function(ev){
		//ev.cancelBubble = true;
		var  touchs = ev.changedTouches[0];
		//将当前移动的点减去上一个点, 得到速度值, 然后再把当前点赋给上一个点. 得到手指滑动的速度值
		iSpeed = touchs.pageY - pervY;
		pervY = touchs.pageY;

		 number.innerHTML = iSpeed;
		if(this.offsetTop >= 0 ){
			if(btu){
				btu = false; 
				touchY = touchs.pageY;
			}
			this.style.top = (touchs.pageY - touchY)/3 +thisTop+"px";
		}else if(this.offsetTop <= document.documentElement.clientHeight - this.offsetHeight){
			if(btu){
				btu = false; 
				touchY = touchs.pageY;
			}
			this.style.top = (touchs.pageY - touchY)/3 + thisTop+"px";

		}else{
			this.style.top = thisTop + touchs.pageY - touchY+"px";
		}
	}
	oWarp.ontouchend = function(ev){

		//startMove(this,{"top":0},400,"easeOut");
		var  touchs = ev.changedTouches[0];
		//得到速度iSpeed以后, 进行缓动运动, 因为涉及到速度, 所以无法使用线程版的tween的运动框架
		var This = this;
		clearInterval(timer);
		timer = setInterval(function(){
			//定时器内部实现一个判断, 判断什么时候停止? 显然是速度很小 , 小于1的时候停止咯
			//取Math.abs绝对值的意思就是, 我们也不知道他是往上还是往下, 正负值的关系, 所以我们就一律取正, 就是绝对值, 小于等于1就停止,清除定时器
			//速度这里停止以后, 还有2个条件, 满足的话 要进行清除定时器.
			//1. 当滑动的范围已经超出头部多少, 要立刻停止缓动效果 并且用tween将其拉回内容区.
			//2. 还有一个就是超出底部多少, 也要拉回, 超出的值  可以设置也就是80
			if( Math.abs(iSpeed) <= 0.3 || This.offsetTop > 80 || This.offsetTop <document.documentElement.clientHeight - This.offsetHeight-80){
				//停止以后就清除定时器
				clearInterval(timer);
				//清除定时器以后,要做一个判断, 如果说, 当这个top值,大于等于0, 哪就说明他已经滑出最上面的顶端了, 需要把她拉回来
				if(This.offsetTop >=0  ){
					startMove(This,{"top":0},400,"easeOut");
				}else if(This.offsetTop <= document.documentElement.clientHeight - This.offsetHeight){
					startMove(This,{"top":document.documentElement.clientHeight - This.offsetHeight},400,"easeOut");
				}
			}else{
				//乘以一个小于1的数, 让速度能够衰减
				iSpeed *=0.92;
				//然后, 既然是脱手以后的缓动, 那么 肯定是  当前的top值加上速度值, 然后不停的调用, 直到速度衰减为0  
				This.style.top = This.offsetTop + iSpeed +"px";
			}

		},13);



		this.ontouchmove = null;
		this.ontouchend = null;
	}

}
/*	滑屏效果其实和banner滑动效果还是很像的, 主要关键的区别 就是  手指滑动出手的速度和缓动效果
	如何求出手指滑动的出手速度呢?
		其实ontouchmove(包括PC端的mousemove) 是有反应时间的, 当从一个点拖到另外一个点, 由于拖动速度的关系, 点于点之间的距离和速度成正比, 速度越快, 点之间的距离就越大
		基于这个原理, 我们可以通过在手指出手的一瞬间, 找到最后2个点, 计算他们的坐标差值, 这个差值就是最后手指出手的速度
		1.首先设置相对的全局变量, 速度和上一个点的坐标值
		2.然后在按下的时候存一下 上一个点得坐标
		3.在move事件中进行计算: 当前移动的值减去上一个点, 得出距离, 赋值给速度    iSpeed  =  touchs.pageY -  perv
	重点:4.重点在这里,由于 perv 上一个点的坐标, 这个值是在按下时候存的, 当继续移动,会出现 更多的点, 那么始终是按下的第一个点和 当前移动的点进行比较, 那么速度就会出问题	
	解决: 当在第三步, 计算完速度并且赋值了以后, 将上一个点(perv) 赋值给当前值, 上一个点. 就是前面的最后一个点, 和按下的点没有关系了

*/
