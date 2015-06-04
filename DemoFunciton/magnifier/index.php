<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
<title></title>
<style>
#div1{ position: relative; width:230px; height: 372px;}
#mark{ width:150px; height: 150px; opacity: 0.3;  background-color: #f00; position: absolute; left: 0px; top: 0px; display: none;}
#imgBox{ width: 500px; height: 500px; position: absolute; left:300px; top:10px; overflow:hidden; display: none; }
#imgBox img{ position: absolute; left: 0px; top: 0px; }
</style>
<script type="text/javascript" src="./magnifier.js">
</script>
</head>
<body>
<div id="div1"><img src="./1.min.jpg"><span id="mark"></span></div>
<div id="imgBox">
	<img src="./1.jpg" />
</div>
</body>
</html>