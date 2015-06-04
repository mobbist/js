var aPic = ["http://g.hiphotos.baidu.com/image/pic/item/a8ec8a13632762d0b1d17507a2ec08fa503dc69f.jpg",
"http://e.hiphotos.baidu.com/image/pic/item/29381f30e924b8993d7fca4f6c061d950a7bf602.jpg",
"http://c.hiphotos.baidu.com/image/pic/item/738b4710b912c8fce9a55ecafe039245d6882166.jpg",
"http://www.99world.com/data/upload/9ef330679c7f10126153dcb54574c2e6.jpg",
"http://www.99world.com/data/upload/2e4c0a447937bc429c3c9f3ee3c04a15.jpg",
"http://www.99world.com/data/upload/2cdcdacf57bf6e03cf291151a9d8f78e.jpg",
"http://www.99world.com/data/upload/3edbefa426649d434613cc4f956c20fc.jpg"]


var oNum =  document.getElementById("loadingNum");
var oLoad =  document.getElementById("load");
var oPic =  document.getElementById("pic");
var oPic2 =  document.getElementById("pic2");
var oShadow =  document.getElementById("shadow");

var iNum = 0;
for(var i=0;i<aPic.length;i++){
	var oImg = new Image();
	oImg.index = i;
	oImg.src = aPic[i];
	oImg.onload = function(){
		iNum ++;
		oNum.innerHTML = parseInt(iNum/aPic.length*100)+"%";
		if(iNum == aPic.length){
		oShadow.style.MozAnimationPlayState = "paused";
		oPic2.style.MozAnimationPlayState = "paused";
		oPic.style.MozAnimationPlayState = "paused";
		oLoad.style.MozAnimationPlayState = "paused";
		oLoad.style.display="none";
		oShadow.style.display="none";
		}	
	}
	oImg.onerror= function(){
		alert(this.index);
	}
	
}