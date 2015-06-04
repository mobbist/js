<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
<title></title>
<script type="text/javascript">
window.onload = function(){
	var div1 = document.getElementById("div1");
	var disX = 0;
	var disY = 0;
	
	//鼠标按下事件
	div1.onmousedown =  function(ev){
		 var ev = ev || window.event;
		 //ev.clientX 就是鼠标在该元素内到浏览器的X值, Y同理
		 //div1.offsetTop 就是该元素距离游览器左边的值.  两者相减就是 鼠标点击的元素内到元素边的值
		 disX = ev.clientX - div1.offsetLeft;
		 disY = ev.clientY - div1.offsetTop;
		 //解决IE8下拖拽层内元素出现BUG
		 //setCapture:全局捕获.  实际上就是在浏览器可视区域生成一个层, 判断一下是不是IE浏览器, 就是有没有这个方法
		 if(div1.setCapture){
		 	div1.setCapture();
		 }
		 //在鼠标在该元素内移动的事件,将该事件绑定在doc上, 不然鼠标会移出div1元素外, 则会来不及反应触发事件, 所以绑定到doc上 
		 document.onmousemove = function(ev){
		 	 var ev = ev || window.event;
		 	 //设置该元素的left值为当前鼠标在该该元素内到浏览器的X值减去点击时元素内到元素边的值, 得到 元素边到浏览器边的值 
		 	 div1.style.left = ev.clientX - disX +'px';
		 	 div1.style.top = ev.clientY - disY +'px';
		};
		//鼠标抬起事件
		 div1.onmouseup = function(){
		 	//把该元素的移动事件和抬起事件都取消掉. 抬起事件里如果不取消的话 会有更多的抬起事件, BUG
		 	document.onmousemove = null;
		 	div1.onmouseup = null;
		 	//如果IE8下面有这个方法 说面之间有这个层已经添加了. 因为是全局的 所以要删除这个层
		 	if(div1.releaseCapture){
		 		div1.releaseCapture();
		 	}
		 	startMove();		
		 };
		 //阻止拖拽的默认事件, 使拖拽图片时不会执行默认事件
		 return false;
	}
	
	var ispeedX = 10;
	var ispeedY = 10;
	var timer = null;
	//碰撞函数,
	function startMove(){
		clearInterval(timer);

		timer = setInterval(function(){
			//物体在自由落体的时候 其实是加速运动
			ispeedY +=3;
		 	//设置left 和top值, 无限变大, 速度是匀速
		 	var left = div1.offsetLeft + ispeedX;
		 	var top = div1.offsetTop + ispeedY;
		 	//判断当top的值(匀速运动的值)大于零界点(浏览器的高度减去自身的高度), 那就要反弹
		 	if(top>document.documentElement.clientHeight - div1.offsetHeight){
		 		//反弹就是将原先不断增加的速度值, 现在不断减少, 就是让其变成负数
		 		top = document.documentElement.clientHeight - div1.offsetHeight
		 		ispeedY *= -1;
		 		ispeedX *= 0.75;
		 		ispeedY *= 0.75;
		 		//再次判断如果top的值如果小于0, 说明已经在顶点了. 然后在让其反弹  就是取反
		 	}else if(top < 0){
		 		top = 0;
		 		ispeedY *= -1;
		 		ispeedX *= 0.75;
		 		ispeedY *= 0.75;
			}
			if(left>document.documentElement.clientWidth - div1.offsetWidth){
		 		//反弹就是将原先不断增加的速度值, 现在不断减少, 就是让其变成负数
		 		left = document.documentElement.clientWidth - div1.offsetWidth
		 		ispeedX *= -1;

		 		//再次判断如果left的值如果小于0, 说明已经在顶点了. 然后在让其反弹  就是取反
		 	}else if(left < 0){
		 		left = 0;
		 		ispeedX *= -1;
		 		
			}

		 	

		 	div1.style.left = left+"px" ;
		 	div1.style.top  = top+"px" ;
		},16)
	}

}
</script>
</head>
<body>
<div id="div1" style="width:200px; height:200px; position:absolute; background-color:#f70">HMA</div>

</body>
</html>