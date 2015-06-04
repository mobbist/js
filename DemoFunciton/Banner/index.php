<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
<title></title>
<style>
* { margin: 0px;  padding: 0px; list-style: none;}
#div1 { width:300px; height:300px;}
#div1  div{ width: 300px; height: 200px; position: absolute; left: 0px; }
.dn{display:none;}
.db{display: block;}
.inputStyle{ color:#f70;}
#banner1,#banner2{ width: 300px; height:400px; position: relative; overflow: hidden;}
#banner1 .bannerBox,#banner2 .bannerBox{ position: relative; height:200px; left:0px; top:0px; opacity: 1;  }
#bannerBoxIndex,#bannerBoxIndex2{ position: absolute;  left:100px; top:200px; }
#banner1 li ,#banner2 li{  float: left; }
#banner1 li img ,#banner2 li img{ width:300px; display: block;}
#leftbtu,#leftbtu2{ position: absolute; left: 0px; top:50px; width:50px; height:50px; background-color: #f70; z-index: 50; }
#rightbtu,#rightbtu2{ position: absolute; left: 250px; top:50px; width:50px; height:50px; background-color: #f70; z-index: 50; }
.bannerBoxIndex li{ margin-right: 5px;}
#test1{position: absolute; background: url(./images/1.jpg); width: 600px; height: 300px}
</style>
<script type="text/javascript" src="./fl.js"></script>
<script type="text/javascript" src="./Banner.js"></script>
<script type="text/javascript">
window.onload = function(){
var odiv1 = document.getElementById("banner1");

var odiv1Child = fl.first(odiv1);
//正式调用, 参数是一个对象,  obj是移动层元素, 速度是
var banner1 = new Banner({obj:odiv1Child,shadow:false,timer:1000});
//banner1.auto("1000");
var oButt1 = document.getElementById("leftbtu");
var oButt2 = document.getElementById("rightbtu");
oButt1.onclick =function(){
	banner1.toLeft();
}
oButt2.onclick =function(){
	banner1.toRight();
}
var boxIndex = document.getElementById("bannerBoxIndex");
boxIndex.onclick = function(ev){
	banner1.index(ev,function(){
		//alert(fl.attr(this,"data-id"));
	});

}
// var odiv2 = document.getElementById("banner2");
// var odiv1Child2 = fl.first(odiv2);
// var banner2 = new Banner({obj:odiv1Child2,shadow:true});
// banner2.auto();
// var oButt12 = document.getElementById("leftbtu2");
// var oButt22 = document.getElementById("rightbtu2");
// var boxIndex2 = document.getElementById("bannerBoxIndex2");
// oButt12.onclick =function(){
// 	banner2.toLeft();
// }
// oButt22.onclick =function(){
// 	banner2.toRight();
// }
// boxIndex2.onclick = function(ev){
// 	banner2.index(ev,function(){
		
// 	});

// }
//banner1和banner2都是指向的是原型,原型方法在调用再多的banner时, 都只占用一份内存
//alert(banner1.toLeft() === banner2.toLeft());  //true
//banner1和banner2在内存中是2个不同地址的, 所以在2块内存
//alert(banner1 === banner2);			//false
}
</script>
</head>
<body>
	<div id="banner1">
		<ul class="bannerBox">
			<li><a  href="1"><img src="./images/1.jpg" alt="1"/></a></li>
			<li><a href="2"><img src="./images/2.jpg"  alt="2"/></a></li>
			<li><a href="3"><img src="./images/3.jpg"  alt="3"/></a></li>
			<li><a href="4"><img src="./images/4.jpg"  alt="4"/></a></li>
		</ul>
		<div id="leftbtu">left</div>
		<div id="rightbtu"></div>
		<ul id="bannerBoxIndex" class="bannerBoxIndex">
			<li><span data-id="0">1</span></li>
			<li><span data-id="1">2</spanspan></li>
			<li><span data-id="2">3</span></li>
			<li><span data-id="3">4</span></li>
		</ul>
	</div>
	<!-- <div id="banner2">
		<ul class="bannerBox">
			<li><a  href=""><img src="./images/1.jpg" /></a></li>
			<li><a href=""><img src="./images/2.jpg" /></a></li>
			<li><a href=""><img src="./images/3.jpg" /></a></li>
			<li><a href=""><img src="./images/4.jpg" /></a></li>
		</ul>
		<div id="leftbtu2">left</div>
		<div id="rightbtu2"></div>
		<ul id="bannerBoxIndex2" class="bannerBoxIndex">
			<li><span data-id="0">1</span></li>
			<li><span data-id="1">2</spanspan></li>
			<li><span data-id="2">3</span></li>
			<li><span data-id="3">4</span></li>
		</ul>
	</div>	 -->
	<!-- <div id="div1">
		<input type="button" class="inputStyle" value="选项1" />
		<input type="button" value="选项2" />
		<input type="button" value="选项3" />
		<div class="db">这是元素内容1</div>
		<div class="dn">这是元素内容2</div>
		<div class="dn">这是元素内容3</div>
	</div> -->


</body>
</html>