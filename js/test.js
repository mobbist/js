(function(){
	//document.getElementById("divs").innerHTML = "HELLO WORLD" ;
	/*双向选择框体
	if(confirm("确定删除?")){
		alert("已经删除");
	}else{
		alert("取消删除");
	}
	*/	
window.onload = function(){
	//原生态获取id的标签
	var gid = document.getElementById("divs");

	//原生态获取html标签<li> <div> 等等
	  var liArr = 	document.getElementsByTagName("li");
	  for(var i = 0 ; i < liArr.length;i++){
	  	 liArr[i].style.background = "red";
	  }
	//原生态获取DOC元素的top, left坐标值
	alert(gid.offsetTop); 
	alert(gid.offsetLeft); 

  }

})()
