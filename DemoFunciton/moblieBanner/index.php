<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
<head>
<title></title>
<style>
* { margin: 0px;  padding: 0px; list-style: none;}
#warp{position: absolute; left: 0px; top: 0px;}
#div1 { width:300px; height:300px;}
#div1  div{ width: 300px; height: 200px; position: absolute; left: 0px; }
.dn{display:none;}
.db{display: block;}
.inputStyle{ color:#f70;}
#banner1{ width: 320px; height:213px; position: relative; overflow: hidden;}
#banner1 #bannerBox{ position: absolute; height:213px; left:0px; top:0px; }
#banner1 li{  float: left; }
#banner1 li img { width:320px;}
#getWidth{ display: block;  width: 430px; height: 230px;}
</style>
<script type="text/javascript" src="./animation.min.js"></script>
<script type="text/javascript" src="./scrollIos.js"></script>
<script type="text/javascript" src="./jquery.js"></script>
<script type="text/javascript">
// window.onload = function(){
// var mb1 = new MBanner("banner1","bannerBox","li");
// 	mb1.init();
// }
$(function(){
	var getWidth = document.getElementById("getWidth");
	alert(getWidth.offsetWidth);
}) 
</script>
</head>
<body>
<div id="warp">	
	<div id="banner1">
		<ul id="bannerBox"><!--这里最好还是用class来调用, 因为页面上可能会出现多个结构同样的banner 此时用class 较妥当  这里为了测试用ID  -->
			<li><a href=""><img src="./images/1.jpg" /></a></li><li><a href=""><img src="./images/2.jpg" /></a></li><li><a href=""><img src="./images/3.jpg" /></a></li><li><a href=""><img src="./images/4.jpg" /></a></li>
		</ul>
		
	</div>

	<!-- <div id="div1">
		<input type="button" class="inputStyle" value="选项1" />
		<input type="button" value="选项2" />
		<input type="button" value="选项3" />
		<div class="db">这是元素内容1</div>
		<div class="dn">这是元素内容2</div>
		<div class="dn">这是元素内容3</div>
	</div> -->

	<a id="getWidth" href="http://www.baidu.com">百度地址</a>
	<div id="number">55</div>
	<ul>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
			<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
			<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
			<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
		<li> 广告内容 广告内容</li>
	</ul>
</div>	
</body>
<!-- <script type="text/javascript" src="./scrollIos.js"></script> -->
</html>