//图片对象   new Image()

// 如果网站上有大量图片, 会影响用户体验. 可以使用预加载机制 实现下载图片. 等需要用到的时候 就直接下载



// 比如网站上有这些几张很大的图片
var aPic = ["http://g.hiphotos.baidu.com/image/pic/item/a8ec8a13632762d0b1d17507a2ec08fa503dc69f.jpg",
"http://e.hiphotos.baidu.com/image/pic/item/29381f30e924b8993d7fca4f6c061d950a7bf602.jpg",
"http://c.hiphotos.baidu.com/image/pic/item/738b4710b912c8fce9a55ecafe039245d6882166.jpg",
"http://www.99world.com/data/upload/9ef330679c7f10126153dcb54574c2e6.jpg",
"http://www.99world.com/data/upload/2e4c0a447937bc429c3c9f3ee3c04a15.jpg",
"http://www.99world.com/data/upload/2cdcdacf57bf6e03cf291151a9d8f78e.jpg",
"http://www.99world.com/data/upload/3edbefa426649d434613cc4f956c20fc.jpg"]


var iNum = 0;
//需要定义个for循环, 来遍历这些地址
for(var i=0;i<aPic.length;i++){
	//每个地址都要生成一个image对象
	var oImg = new Image();
	//设置他的索引, 便于失败的时候 知道是哪张图片
	oImg.index = i;
	//设置他的SRC  进行预加载
	oImg.src = aPic[i];

	//加载成功触发的事件
	oImg.onload = function(){
		iNum ++;
		//假设有一个百分比加载
		oNum.innerHTML = parseInt(iNum/aPic.length*100)+"%";
		//加载全部完成触发
		if(iNum == aPic.length){

		}	
	}
	//加载失败触发, 这里可以弹出失败的图片索引值
	oImg.onerror= function(){
		alert(this.index);
	}
	
}
