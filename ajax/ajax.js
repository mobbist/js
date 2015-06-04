//封装一个AJAX函数
window.onload = function(){
	var OButton = document.getElementById("OButton");
		OButton.onclick = function(){

		//正式调用封装好的函数demo 
		//arguments:  一个ajax对象内的属性,  method,url,callback
		//method:  以什么方式提交(get, post),  缺省值是get
		//url: 需要请求的地址
		//data: 需要发送的数据
		//callback: 数据返回以后执行的函数.回调函数里的参数是一个对象
	  	ajax({
	  		

	  		url : "getNews.php",
	  		//如果是get方法, 参数中如果要使用中文, 那么必须要 encodeURI进行中文编码,POST方法则不需要, 因为请求已经编码完成
	  		data: "name="+encodeURI("新闻"),
	  		callback : function(data){
	  			//将返回的数组转成对象
	  			
					var data = JSON.parse(data);
					var oUl = document.getElementById("oul");
					//建立一个空的字符串 用于存储遍历出来的带有DOM样式HTML的数据
					var html = "";
					for(var i=0; i<data.length; i++){
						//然后遍历这个返回的数据, 对齐进行DOM操作
						html += "<li>"+data[i].title+"<span>"+data[i].date+"</span></li>";
					}
					//返回整个数据, 然后添加到ul中
					oUl.innerHTML = html;
	 		}
		}
		)
	}


	//ajax方法: arguments:  method: 使用什么方式发送   url: 地址   callback: 回调函数
	function ajax(ajax){
			var xhr;
			if(window.XMLHttpRequest){
				xhr = new XMLHttpRequest();
			}else{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			//判断如果是缺省值那么就是get方法method:'get' , 然后将数据拼接在路径后,一并发送
			if(!ajax.method || ajax.method =="get"){
				var data = ajax.data || ""; 
				//由于get方法在每次发送的时候, 会把该请求页面缓存到本地, 所以需要在后面加上一个值, 表示请求的非同一张页面,
				//将需要发送的值直接拼接在URL后面就可以实现传值, POST则就不会有缓存问题
				 xhr.open("get", ajax.url+"?"+data+"&"+new Date().getTime() , "true");
				 xhr.send();
			//这里判断如果是参数写post方法, 那么按照post方法提交,参数写在send方法内
			}else if(ajax.method =="post"){

				var data = ajax.data || ""; 
				xhr.open("post", ajax.url , "true");
				//在准备发送之前, 要手动告诉服务器端,设置请求头, 不然就会不认识我的数据类型, POST方法特有的
				xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
				 xhr.send(data);
			}
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status==200){
						ajax.callback(xhr.responseText);
					 }else{
					 	ajax.callback("请求出错, 服务器状态码:"+xhr.status);
					 }
				}

			}
		}
	
}