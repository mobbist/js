define(function(require,exports,module){
	//main.js唯一调用的核心主体JS, 这里负责加载一些公共JS, 
	var headerMenu = document.getElementById("headerMenu");
	var menuList =  headerMenu.getElementsByTagName("li");
	var bodyParent = document.getElementById("bodyParent");
	var sections = bodyParent.getElementsByTagName("section"); 

	//加载进场动画,show.js, 对进场动画进行统一管理 
	require("./pageChange.js").show(menuList,sections);
	



	//加载菜栏单点击事件.
	for(var i=0;i<menuList.length;i++){
		menuList[i].onclick = function(){
				//获取被点击菜单下得hash值,并复制给URL
				var parentHash = this.dataset.hash;
				//加载出场动画,hide.js, 对出场动画进行统一管理
				require("./pageChange.js").hide(sections,parentHash);
			}
		}
	//当hash值改变时候, 立刻刷新页面
	// window.onhashchange = function(){
	// 	window.location.reload();
	// }	
		
	//加载手机端手指滑动事件

	
});	