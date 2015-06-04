<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
<title></title>
<!-- IE的hack写法, 如果小于(lte) IE7的版本就自动添加JSON这个JS文件, 因为IE7以下的版本都是不支持JSON的-->
<!--[if lte IE 8]>
<script type="text/javascript" src="./JSON.js"></script>
<![endif]-->

<script type="text/javascript" ></script>
<script type="text/javascript" >


function mobbist(data){
	window.onload = function(){
	var oUl = document.getElementById("oul");
	console.log(data);
		if(data.subjects.length){
			for(var i=0; i<data.subjects.length; i++){
				
				var oLi = document.createElement("li");
				var oImg = document.createElement("img");
				oImg.src = data.subjects[i].images["large"];
				oLi.appendChild(oImg);
				oUl.appendChild(oLi);
			}
		}
	}
}
</script>
<script type="text/javascript" src="https://api.douban.com/v2/movie/search?q=泰坦&callback=mobbist&alt=xd"></script>
</head>
<body>
<input type="text"  id="q"  /><input type="button"  id="q" value="搜索" id="btn" />
<ul id="oul"></lu>
</body>
</html>