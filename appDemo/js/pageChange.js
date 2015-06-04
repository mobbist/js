//因为pageChange.js是对所有进出场动画的统一管理, 将动画的统一动作写在这里,在其内部, 还要判断
define(function(require,exports,moduel){
	function show(menu,body){
		//进行头部哈希值判断, 将#去除
		var hash = window.location.hash.substring(1) || "index";
		for(var i=0;i<body.length;i++){
			//找到要运动的页面后, switch相对应的进场动画
			
			if(hash == body[i].dataset.hash){
			 	switch(hash){
			 		case "index" :
			 			require("indexIn.js").indexstart();
			 		break;
			 		case "shanghai" :
			 			require("indexIn.js").shanghaistart();
			 		break;
			 		default:
			 		break;
			 	}
			}
		}
	}

	function hide(body,parentHash){
		//进行头部哈希值判断, 将#去除

		var hash = window.location.hash.substring(1) || "index";
		for(var i=0;i<body.length;i++){
			//找到要运动的页面后, switch相对应的进场动画
			if(hash == body[i].dataset.hash){
			 	switch(hash){
			 		case "index" :
			 		 var selectStyle = document.getElementById("selectStyle");
			 		 selectStyle.style.left = "38px";
			 			require("indexIn.js").indexHide(body[i],parentHash);
			 		break;
			 		case "shanghai" :
			 		 var selectStyle = document.getElementById("selectStyle");
			 		 selectStyle.style.left = "-10px";
			 			require("indexIn.js").shanghaiHide(parentHash);
			 		break;

			 		default:
			 		break;
			 	}
			}
		}
	}
	exports.show = show;
	exports.hide = hide;
});