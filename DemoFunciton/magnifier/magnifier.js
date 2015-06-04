//magnifier 放大镜效果

window.onload = function(){
	
	 var oDiv1 = document.getElementById("div1");
	 var imgBox = document.getElementById("imgBox");
	 var img2 = imgBox.getElementsByTagName("img")[0];
	var mark =  oDiv1.children[1];
	 oDiv1.onmouseover = function(ev){
	 	var ev = ev|| window.event;
	 	imgBox.style.display = "block";
	 	mark.style.display = "block";
	 	var L = ev.clientX -oDiv1.offsetLeft; 
	 	 mark.style.left = L - mark.offsetWidth/2 +"px";
	 	 mark.style.top = ev.clientY - oDiv1.offsetTop- mark.offsetHeight/2 +"px";
	 }
	 oDiv1.onmousemove = function(ev){
	 	var ev = ev|| window.event;
	 	//鼠标基于浏览器的当前值减去外框到浏览器的定位值.这个算法有BUG, 若是出现滚动条, 会根据滚动条偏移, 需要修复一下
	 	var L = ev.clientX -oDiv1.offsetLeft; 
	 	var T = ev.clientY  -oDiv1.offsetTop;

	 	//控制透明层不出边界框的算法
	 	//首先判断 鼠标当前值  是否要小于这个宽度的一半了,  因为鼠标就是在这个一半的位置, 即层的中心. 理解下来也就是 判断是不是要到左边框了
	 	if(L< mark.offsetWidth/2){
	 		//要到了, 就赋值为0, 不让它变成负数, 即  一直定位在最左边
			mark.style.left = 0+"px";
		//再次判断  这个鼠标当前 是不是要大于 鼠标能走区域的 了,  即:  鼠标是不是要到最右边了	
	 	}else if( L > oDiv1.offsetWidth - mark.offsetWidth/2){
	 		//如果要到最右边了, 就让他变成能移动的最大值, 即:  一直定位在最右边
	 		mark.style.left = oDiv1.offsetWidth - mark.offsetWidth+"px";
	 	}else{
	 		//其他情况 就让他自由移动
	 		mark.style.left = L- mark.offsetWidth/2 +"px";
	 	} 
	 	 //上下同理
	 	if(T < mark.offsetHeight/2){
	 		mark.style.top = 0 +"px";
		}else if( T > oDiv1.offsetHeight - mark.offsetHeight/2){
	 		mark.style.top = oDiv1.offsetHeight - mark.offsetHeight+"px";
	 	}else{
	 	 	mark.style.top = T - mark.offsetHeight/2 +"px";
	 	} 


	 	//小图和大图是按同比例缩放的, 小图移动的距离和大图移动的距离之间有一个移动系数. 

	 	//要知道大图需要移动多少, 那么就是要  鼠标的可移动距离* 移动系数 = 就是大图移动的距离
	 	//移动系数可以通过,  鼠标当前存在的坐标值 除以  鼠标的可移动范围  就是它的移动系数比例.

	 	var scaleX = L/(oDiv1.offsetWidth - mark.offsetWidth/2);
	 	var scaleY = T/(oDiv1.offsetHeight - mark.offsetHeight/2);

	 	img2.style.left = -scaleX *(img2.offsetWidth- imgBox.offsetWidth)+"px";
	 	img2.style.top = -scaleY *(img2.offsetHeight- imgBox.offsetHeight)+"px";

	 }

	 oDiv1.onmouseout = function(ev){
	 	mark.style.display = "none";
	 	imgBox.style.display = "none";

	 }
}