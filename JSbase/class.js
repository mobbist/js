window.onload = function(){
	//通过Class获得元素,封装一个函数, arguments : 父类元素,标签类型, className
		function getElementByClassName(tagName,type,className){
			//获取标签类型, 返回数组
			var arr = [];
			//指定父类的元素
			var aEls  = tagName.getElementsByTagName(type);

			//遍历这个标签的, 然后将里面每一个内容的Class值 切割成数组.
			for(var i=0; i<aEls.length; i++){
				//因为每个元素中不止一个ClassName 所以要进行切割成数组
				var aClassName = aEls[i].className.split(" ");
				//再一次遍历这个标签里的ClassName  看是否有同样的Class值, 有就插入新数组
				for(var j=0; j<aClassName.length;j++){
					if(aClassName[j] == className){
					arr.push(aEls[i]);
					//当已经完成插入动作以后, 就直接跳出这个循环, 防止出现同样的ClassName.  则需要直接break
					break;
				};	
				}
				
			}
			return arr;
		}
		var oUl1 = document.getElementById("ul1");
		var  liBox = getElementByClassName(oUl1,"li","liBox");
		console.log(liBox);
		for(var i=0; i<liBox.length;i++){
			liBox[i].style.background = "blue";
		}

	//封装一个添加Class元素的方法   arguments:  要添加的元素对象, 和class名
	function addClass(obj,className){
		//先判断一下有没有class属性, 没有就直接创建, 有就做else的
		if(obj.className ==""){
			obj.className = className;
		}else{
			//如果原本有class, 要添加的class和原本的class一致的解决方案:
			//需要先把元素的Class分离成一个数组, 然后对数组进行判断,
			var arrClassName = obj.className.split(" ");
			var arrindexOf = addClass._arrIndexOf(arrClassName,className);
			if(arrindexOf == -1){
				obj.className += " "+className;
			};
			
		}

		
	}
	//一个addClass的一个静态函数,用于判断数组里是否有传入V的字符串
	addClass._arrIndexOf = function(arr, v){
		//检索整个数组, 如果数组中和传入的V一致, 则立刻返回,  如果没有就返回 -1 表示没有一致的内容
			for(var i=0; i<arr.length;i++){
				if(arr[i] == v){
					return i;
				}
			}
			return -1;
		}
	//那么在这步, 如果这个方法里的className已经存在于元素, 那么则不会添加, 多次调用也不会	
	addClass(oUl1,"ok");




	//封装一个移出Class的方法,arguments:  要移出的元素对象, 和class名
	function removeClass(obj,className){
		if(obj.className !=""){
			//同样的, 需要先把元素的Class分离成一个数组, 然后对数组进行判断
			var arrClassName = obj.className.split(" ");
			var arrindexOf = addClass._arrIndexOf(arrClassName,className);
			//arrindexOf方法一定要返回下标值, 说明他是有需要移出的Class值,  不然不存在谈何移除呢
			if(arrindexOf != -1){
				//splice: 数组的移出方法, arguments:坐标值, 移除的个数  
				arrClassName.splice(arrindexOf,1);
				//移除以后, 数组中已经没有需要移除的值了, 然后将数组拼接成字符串(join方法),用空格链接,传入的参数空格
				obj.className = arrClassName.join(" ");
			}
		};
	}
	removeClass(oUl1,"ok");
}