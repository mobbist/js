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
#banner1{ width: 1200px; height:300px; position: relative; overflow: hidden;}
#banner1 .bannerBox{ position: absolute; height:300px; left:0px; top:0px; }
#banner1 li{  float: left; }
#banner1 li img { width:300px;}
.leftbtu{ position: absolute; left: 0px; top:50px; width:50px; height:100px; background-color: #f70; }
</style>
<script type="text/javascript" src="./mobbistLib.js"></script>
<script type="text/javascript" src="./banner.js"></script>
<script type="text/javascript">
</script>
</head>
<body>
	<div id="banner1">
		<ul class="bannerBox">
			<li><a href=""><img src="./images/1.jpg" /></a></li><li><a href=""><img src="./images/2.jpg" /></a></li><li><a href=""><img src="./images/3.jpg" /></a></li><li><a href=""><img src="./images/4.jpg" /></a></li>
		</ul>
		<div class="leftbtu">left</div>
		<div class="leftright"></div>
	</div>

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