(function(){
	window.onload = function(){
		//DOM    		Document Object Model    文档对象模型
		//文档:    		html页面
		//文档对象:  		页面中的元素 
		//文档对象模型: 	一套定义, 由w3c创建,   为了能够让程序(JS)去操作页面中的元素.

		//DOM会把文档看作是一个树状结构, 同时定义了很多方法来操作这颗树状结构的每一个元素(节点)
		//getElementById   getElementByTagName  都是DOM中所定义的方法
		//DOM节点就是节点树中的每一个元素, 不仅仅是元素才是节点,  DOM所定义的节点类型有12种

		//1  元素.childNodes :   只读    属性  返回数组  获得子节点的列表集合, 只包含一级子节点, 不包含孙级以下的节点
		//在标准浏览器下: 节点包含了文本和元素类型的节点, 也会包含非法嵌套的元素子节点
		//在非标准下(IE8以下):    只包含元素类型的节点, IE7以下不会包含非法嵌套子节点
		var oUl1 =  document.getElementById("ul1");
		//alert(oUl1.childNodes.length);  //弹出7,  数组 li标签与标签之间是有一个空隙, 这个空隙算一个文本节点, 在非标准则不算
		//2  元素.nodeType: 只读   属性    当前元素的节点类型
		//alert(oUl1.nodeType);   //弹出1,  意思就是当前节点的类型是1   (1:元素节点 2:属性节点  3:文本节点)
		//alert(oUl1.attributes.length)  //弹出3  数组  意思就是当前节点的属性个数为3
		//alert(oUl1.attributes[0].value) //获取该节点的元素下标值0的value,名字就是name

		//3  元素.children  只读  数组  属性   获得子节点的元素节点(注意,只包含元素节点,这是和childNodes的区别)
		//在标准浏览器下:  	  只包含元素的子元素节点
		//在非标准下(IE7以下):  只包含元素的子元素的节点, 经测试  这个方法可以返回元素的子元素列表, 是个数组
		//alert(oUl1.children.length);  //弹出3  只有子一级的元素节点

		//4  元素.firstChild   只读  属性    获得该元素的第一个子节点
		//在标准浏览器下: 只包含元素的第一个文本节点(也就是空格)
		//在非标准下:  只包含元素的第一个元素的节点

		//5  元素.firstElementChild  只读  属性,  获得该元素的第一个元素节点
		//在标准浏览器下: 只包含元素的第一个元素的节点
		//在非标准下:   则是无法获得
		//结合第四点, 哪么可以做这样的兼容:  
		var  first  = oUl1.firstElementChild || oUl1.firstChild;
		first.style.background = "red";

		//6 在标准浏览器下: 元素.lastElementChild  只读  属性  获得该元素下最后一个元素子节点
		//7 在非标准浏览器下: 元素.lastChild 
		//结合以上 那么可以做这样的兼容:
		var last = oUl1.lastElementChild || oUl1.lastChild;
		last.style.background ="yellow";   

		//8 在标准浏览器下:  元素.nextElementSibling  只读 属性  获得该元素下一个的兄弟元素, 重点是同级的下一个
		//9 在非标准下:     元素.nextSibling 
		//结合 以上  那么可以做这样的兼容:
		var next = first.nextElementSibling || first.nextSibling;
		next.style.background = "blue" ;

		//10 在标准浏览器下: 元素.previousElementSibling  只读 属性  获得该元素上一个的兄弟元素, 重点是同级的上一个
		//11 在非标准下:     元素.previousSibling 
		//结合 以上  那么可以做这样的兼容:
		var prev = last.previousElementSibling || last.previousSibling;
		prev.style.background = "orange"

		//从 first 开始的这几个方法  都有一个bug 就是, 如果要获取的这些元素不存在于页面上 则会取 文本元素, 所以劲量避免获取不到元素

		//12 元素.parentNode: 获得当前元素的上一级父节点.  无浏览器兼容问题
		var parent = prev.parentNode;
		//alert(parent.id);  

		//13 元素.offsetParent: 只读   属性   离当前元素最近的一个有css定位属性(position)的父节点元素,  如果没有定位则是body
		//IE7以下,如果当前元素没有定位, 则是body, 如果有定位则是html
		//如果当前元素的某个父级 触发了 haslayout(zoom:1), 那么offsetParent 就会被指向到触发了的那个元素上
		var offParent = prev.offsetParent;
		//alert(offParent.id);
		//14 元素.offsetLeft   只读   属性,   当前元素到定位父级(offsetParent)的左偏移值, 
		//如果没有定位父级的话  标准浏览器是  offsetleft 到html的距离
		//如果有定位父级:   ie7以下如果自己没有定位,那么offsetLeft[top]是到body的距离,如果双方都有定位, 则是正常
		// 其他浏览器是 到定位父级的距离
		//元素.style.width   获取样式的宽  就跟获取 其他一样 
		//元素.client.width  获取盒模型样式的宽,  也就是包含padding值
		//元素.offsetWidth   样式宽+padding+border  以上3个都没有兼容性问题
		//这是封装了一个获取元素到浏览器的绝对值, 如果其中有定位父级,也是可以直接获取的
		function getpos(obj){
		var num = 0;	
			while(obj){
				//在外部定义的一个计数器, 计算到上一个父类的偏移值, 累加
				num += obj.offsetLeft;
				//然后将  当前元素的元素指向新的父级元素,  直到没有  循环结束
				obj = obj.offsetParent;
			}
			//然后将计数器中得值返回
			return num;
		}
		var od1  = document.getElementById("od3");
		//alert(getpos(od1));

		//操作元素样式:
		//一般操作style的只能是写在<div class="a" style=""></div>  style双引号内的样式. 无法访问到a里面的元素.
		//如果想要获得a里的样式, 需要封装一个函数  css(a,"background"), 可以读取自定义的CSS键值
		
		function css(obj,attr){
			//IE和op所支持的方法
			if(obj.currentStyle){
				return obj.currentStyle(attr);
			}else{
				//其他浏览器支持的方法.
				return getComputedStyle(obj,false)[attr];
			}
}

		//操作属性的方式:
		//元素.属性名:   只读   点式法    获取当前元素的属性值, 比如   obj.id  获取obj元素的ID ,不能使用自定义属性
		//元素[属性名]   只读   中括号    功能和上面相同, 只是属性名是可变变量的话  用这种不会出错
		//元素.属性名 = 属性值  ||  元素[属性名] = 属性值    后面加上等于就是给设置值. ,不能使用自定义属性
		//元素.getAttribute(属性名)   只读   方法    获取当前元素的指定值,可以使用自定义属性
		//元素.setAttribute(属性名)   只读   方法    设置当前元素的指定值,可以使用自定义属性
		//元素.removeAttribute(属性名) 移出当前元素的属性名,可以使用自定义属性



		//创建元素的方法:
		var ul2 = document.getElementById("ul2");
		var obutt = document.getElementById("obutton");
		var otext = document.getElementById("otext");
		obutt.onclick = function(){
			//document.createElement("标签名")  这个方法和getElementById所获得对象几乎一致, 它所有的方法创建出来的也有
			//只是, 一个已经存在于文档中, 而另外一个还存在于JS 并没有PUSH到文档中
			var oLi = document.createElement("li");
			//对其一系列的操作, 比如, innerHTML一些内容.
			oLi.innerHTML = "这是添加出来最前面的数据"+otext.value;
			//然后, 把这个元素,添加到哪里去呢? 很显然, 要添加给某个父元素,做为某个父元素最后的子节点  父元素.appendChild(要添加到最后的元素)
			//ul2.appendChild(oLi);
			//还可以,添加到最前面,  方法是  父级.insertBefore(新的元素 ,要在那个元素前面插入) : 在指定元素前面插入.
			//注意: IE下如果第二个参数的节点不存在(也就是说没有子元素,当然取不到下标值0的元素节点),会报错.  
			//在标准浏览器下如果没有子元素的话, 则会以appedChild形式添加,所以这里要作个兼容判断.如果不存在就先APPend 存在了再添加在第一条上面
			if(ul2.children[0]){
				ul2.insertBefore(oLi,ul2.children[0]);
			}else{
				ul2.appendChild(oLi);
			}
			var oA =  document.createElement("a");
			oA.innerHTML = "删除";
			oA.href = "javascript:;";
			oA.onclick = function(){
				//在这个点击时间里, 要作一个删除掉刚添加的这条添加出来的数据, 要使用 删除元素的方法
				//父类.removeChild(要删除的子类);
				ul2.removeChild(this.parentNode);
			}
			oLi.appendChild(oA);
		//元素替换, 将一个新的元素替换成一个老得元素    父类.replaceChild(新的元素, 被替换的元素);
		document.body.insertBefore(ul2,ul1);
		//appendChild, insertBefore ,  replaceChild 都可以操作动态创建出来的节点, 也可以操作已有节点.
		//而且是类似于剪贴的操作, 即在原来的地方移出, 然后在指定的地方出现.并不会重复

		}
	
		
		
	}
})()