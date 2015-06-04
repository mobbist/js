window.onload = function(){
	var oUl = document.getElementById("oUl");
	var oLi = oUl.getElementsByTagName('li');
	var page = 1;
	//需要定义一个开关, 是关闭的, 当初始化事件结束以后, 为ture,可以执行滚动条事件. 滚动完毕 立刻为false, 再次加载完毕为FALSE
	var onoff = false;
	getPBL();
	function getPBL(){
		ajax({url:"getPics.php",data:"cpage="+page,callback:function(data){
			var data = JSON.parse(data);
			//判断如果没有数据了就return出去, onoff值则是一直是false 不会再触发事件
			if(data.length){
				 return 
			}
			for(var i=0;i<data.length;i++){
				//在循环开始之前. 执行获得最小高度下标值的函数
				var _index = getShort();
				var oDiv = document.createElement("div");
				var oImg = document.createElement("img");
				oImg.style.width = "225px";
				//高度的变化应该根据宽度的比例进行计算: 原始的高度 *乘以他缩放的比例, 就是缩放以后的高度, 
				//比例可以通过宽度缩放以后的值(225)除以原始的宽度值得出比例.
				oImg.style.height = data[i].height *(225/data[i].width)+"px";
				oImg.src = data[i].image;
				oDiv.appendChild(oImg);
				var oP = document.createElement("p");
				oP.innerHTML = data[i].title;
				oDiv.appendChild(oP);
				//数据添加完毕以后, 直接往最小高度的值坐标的LI
				oLi[_index].appendChild(oDiv);
				//最后数据添加完毕以后, 把这个值改为true, 可以让下次继续加载
				onoff = true;
			};
			}
		});
		page++;
	}
	//监听一个滚动条事件
	window.onscroll = function(){
		//获取当前最短的LI的高度, 
		if(onoff){
			var _index = getShort();
			var scrollTop =  document.documentElement.scrollTop || document.body.scrollTop;
			//然后如果最短LI的高度(还要加上她的TOP值,元素到顶端的TOP是getTOP函数),小于当前可视区域的高度+上滚动条的高度, 哪就说明是拉到底了
			if(getTop(oLi[_index])+oLi[_index].offsetHeight < document.documentElement.clientHeight+scrollTop ){
				getPBL();
				onoff = false;
			}
		}
	}


	//获取元素到浏览器的绝对值
	function getTop(obj){
		var num = 0;
		while(obj){
			//在外部定义的一个计数器, 计算到上一个父类的偏移值, 累加
			num += obj.offsetTop;
			//然后将  当前元素的元素指向新的父级元素,  直到没有  循环结束
			obj = obj.offsetParent;
		}
		//然后将计数器中得值返回
		return num;
	}

	//获取一个数组里最小的值
	function getShort(){
		//先声明2个变量. index代表数组下标值, value就是需要比对的元素列表的高度值,
		var index = 0;
		var value = oLi[index].offsetHeight;
		for(var i=1; i< oLi.length;i++){
			//判断, 如果第2个值开始(i是从1开始的),比第一个值(一开始value的值就是数组下标第一个)小, 
			if( oLi[i].offsetHeight < value ){
				//那么就把当前的这个值, 改成之后要跟下一个值比较的value, 并且把坐标值也改成当前最小的
				value = oLi[i];
				index = i; 
			}
		}
		//返回最小的值的下标, 同理 可以推出下标中最大的值
		return index;
	}
	
	
}