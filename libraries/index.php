<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
<title></title>
<style>
#box{ width:100px; height: 100px; position: absolute; left: 0px;  background-color: #f70; opacity: 0.1;  filter:alpha(opacity=10);}
#background{ margin: 100px; position: relative;}
#box3{ width:100px; height: 100px; position: absolute; left: 0px; top: 400px;  background-color: #f70;}

#div1{ width:100px; height:200px; background-color: red;  position: absolute; left: -100px; top:200px; opacity: 0.1;  filter:alpha(opacity=10);}
#div2{ width:20px; height: 60px; background-color:black; position: absolute; right: -20px; top:70px; color:#fff; text-align: center;  }																																																		{}
</style>
<script type="text/javascript" src="./mobbistLib.js">
</script>
</head>
<body>
	<input type="button" id="opacity100" value="透明度100%" />
	<input type="button" id="opacity30" value="透明度30%" />
<div id="box" ></div>

<div id="div1">
<div id="div2">分享到</div>

</div>
<div id="box3"></div>
</body>
</html>