window.onload = function(){

	var OButton = document.getElementById("OButton");
	OButton.onclick = function(){
		//拟人:打开浏览器    
		//程序:  创建一个ajax对象, 操作他的一些属性和方法  完成这个操作
		//这里要作一个IE6的兼容,  IE7以上的AJAX对象都已经统一
		var xhr;
		//首先要判断在window下是否存在这个变量,  如果直接写 哪会报错未定义, 那么属性的话会弹出undefind 不会报错
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		}else{
			//这里就是调用IE下的插件, ActiveXObject是IE下插件的总称,  还需要明确调用 Microsoft.XMLHTTP
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		//拟人:在地址栏上输入地址
		//open方法  三个方式:   1.打开方式   2.地址   3. 是否异步
		//由于get方法在每次发送的时候, 会把该请求页面缓存到本地, 所以需要在后面加上一个值, 表示请求的非同一张页面,
		//将需要发送的值直接拼接在URL后面就可以实现传值
		xhr.open("get","getNews.php?name=zhangsan&"+new Date().getTime(),"true");
		//拟人:提交
		//如果发送方式是POST方法, 那么要传送的POST值需要写在send方法内作为参数传递
		xhr.send();

		//拟人:等待服务器返回内容;
		//得到AJAX返回的数据
		//readyState: AJAX工作状态: 
			//0		(初始化)		还没有调用open()方法
			//1		(载入)		已调用send()方法, 正在发送请求
			//2		(载入完成)	send()方法完成, 已收到全部响应内容
			//3		(解析)		正在解析响应内容
			//4		(完成)		响应内容解析完成, 可以在客户端调用 
		//onreadystatechange	事件: 当readyState改变的时候触发	
		//status : HTTP服务器状态码
		//responseText:  AJAX请求返回的内容就被存放到这个属性下面, 返回字符串

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				//服务器的状态码返回200, 说明请求成功.
				if(xhr.status==200){
					//将返回的数组转成对象
					var data = JSON.parse(xhr.responseText);
					var oUl = document.getElementById("oul");
					//建立一个空的字符串 用于存储遍历出来的带有DOM样式HTML的数据
					var html = "";
					for(var i=0; i<data.length; i++){
						//然后遍历这个返回的数据, 对齐进行DOM操作
						html += "<li>"+data[i].title+"<span>"+data[i].date+"</span></li>";
					}
					//返回整个数据, 然后添加到ul中
					oUl.innerHTML = html;
				 }else{
				 	throw new Error("请求出错, 服务器状态码:"+xhr.status);
				 }
			}

		}

	}
	//JSON 4个字母都是大写, 是一种键值对的数据格式类型, IE7以下不支持, 需要引入JSON.org的 javascript JSON2.js这个文件.
	//可以看出IE7以上不引入任何文件 也是存在 JSON这个对象的, 主要就是使用他的2个静态方法, 字符串转数组(对象), 数组(对象)转字符串
	//alert(JSON);


	var arr = [1,2,3];
	//JSON.stringify():  方法 :可以把一个对象转成对应字符串
	//alert(typeof JSON.stringify(arr));
	var jack = { name:"jack",age:"28"}
	//这是将一个单体, 转成字符串.  并且JSON的键值必须要是双引号
	alert(JSON.stringify(jack));


	var string2 = "[1,2,3]";
	//JSON.parse();    方法:  可以将一个字符串转成对应的数组,
	var arr2 = JSON.parse(string2);
	//可以看到, 转成数组以后, 就可以直接访问下标第0个了
	alert(arr2[0]);
	//注意, 键值名 必须要加双引号, 单引号也不行.
	var jack2 = '{"name":"jack"}';
	jack2 = JSON.parse(jack2);
	//可以通过键名获取
	alert(jack2["name"]);

}