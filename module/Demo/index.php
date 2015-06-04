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
<script type="text/javascript" src="./sea/sea.js"></script>
<script type="text/javascript">
//想要调用在sea定义的方法, 其实都不需要在标签中引入JS.  只需要seajs.use   这句就是引入javascript文件, 并且后面接受一个回调函数参数
//在回调函数里调用的这个参数, 就是定义时候的第二个参数 exports,  在回调函数内调用  这个命名空间下得方法名  就可以调用到了.
//通过调用的文件名不一致, 然后给他们每人一个独立的命名空间, 这样就不会互相印象.

seajs.use("./js/moduel1.js",function(ex){	//路径名要注意,  默认根目录是sea.js包裹的文件夹,  调用请加上相对路径
	 ex.tab();	//就可以调用到了			
});



</script>
</head>
<body>
</body>
</html>