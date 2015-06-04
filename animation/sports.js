window.onload = function(){

	var box = document.getElementById("box");
	var opacity100 = document.getElementById("opacity100");
	var opacity30 = document.getElementById("opacity30");
	opacity100.onclick = function(){
		startMove(box,{"opacity":100},10)
	}
	opacity30.onclick = function(){
		startMove(box,{"opacity":0},-10)
	}
	var div1 = document.getElementById("div1");
	var div2 = document.getElementById("div2");

	div1.onmouseover = function(){
		startMove(this,{"left":0,"opacity":100},10);
	}

	div1.onmouseout = function(){
		startMove(this,{"left":-100,"opacity":10},-10);
	}
	var box3 = document.getElementById("box3");
	box3.onclick = function(){
		spring(this,388,8);
	}






}

//javascript运动原理, 
//1.清除定时器, 确保同一时间只有一个定时间在工作
//2.开启定时器
//3.开始运动(同时在运动中加入判断, 以便在需要的时候或者是满足某个要求停止运动)



//透明度运动算法,  IE和标准对透明度的渲染3 ,注意, 这个是mobb框架内的运动版方法, 需要放入函数内部才能让其执行
function startMove (obj,json,iSpeed,fn){

		clearInterval(obj.iTime);
	var iCur;
	//将定时器的变量声明在对象下, 这样定时器关闭的时候 只会关闭自己的.
	obj.iTime = setInterval(function(){
		var bBtn = true;
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

			if(iCur != json["type"]){ bBtn = false;}
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
	}

function css(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

//弹性方法, 接受参数:  obj, 需要运动的元素, target, 运动到得目标点
function spring(obj,target,num){
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
}
