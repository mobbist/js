<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
<title></title>
<!-- IE的hack写法, 如果小于(lte) IE7的版本就自动添加JSON这个JS文件, 因为IE7以下的版本都是不支持JSON的-->
<!--[if lte IE 8]>
<script type="text/javascript" src="./JSON.js"></script>
<![endif]-->
<script type="text/javascript" src="./ajax.min.js"></script>
<script type="text/javascript" src="./pobu.js"></script>
<script type="text/javascript">
</script>
<style>
ul,li{ margin:0px; padding: 0px; list-style: none;}
#oUl { width:1200px; overflow: hidden; margin:0 auto; }
#oUl li { float:left; width:227px;  margin-right: 10px;  }
#oUl li p{ text-align: center;}
#oUl li div{ margin-bottom: 10px; border:1px solid #999;}
</style>
</head>
<body>
	<ul id="oUl">
		<li id="a"></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</body>
</html>