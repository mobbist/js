define(function(require,exports,module){
	function indexstart(){
		var index = document.getElementById("index");
		var listBox = document.getElementById("listBox");
		index.style.display = "block";
		var indexBanner = document.getElementById("index_banner");
		setTimeout(function(){
			indexBanner.className = "bannerHover";
			indexBanner.style.transition = "2s";
			listBox.className = "hover";
			listBox.style.transition = "2s";
		},100);

	}

	function shanghaistart(){
		var index = document.getElementById("shanghai");
		var leftList = document.getElementById("leftList");
		var rightList = document.getElementById("rightList");
		var selectStyle = document.getElementById("selectStyle");
 		selectStyle.style.left = "38px";
		index.style.display = "block";
		setTimeout(function(){
			leftList.style.transition = "2s";
			leftList.className = "hover";
			rightList.style.transition = "2s";
			rightList.className = "hover";
		},100);
	}
	
	function shanghaiHide(parentHash){
		var index = document.getElementById("shanghai");
		leftList.className = "";
		rightList.className = "";
		setTimeout(function(){
			leftList.style.transition = "";
			rightList.style.transition = "";
			
			index.style.display = "none";
			window.location.hash = parentHash;
			eval(parentHash+"start()");
		},2000)	
	}


	function indexHide(obj,parentHash){
		var index = document.getElementById("index");
		var indexBanner = document.getElementById("index_banner");
		var listBox = document.getElementById("listBox");
			indexBanner.className = "";
			listBox.className = "";
		setTimeout(function(){
			indexBanner.style.transition = "";
			listBox.style.transition = "";
			index.style.display="none";
			window.location.hash = parentHash;
			eval(parentHash+"start()");

		},2000)	

		
	}
	exports.shanghaiHide =shanghaiHide;
	exports.shanghaistart = shanghaistart;
	exports.indexHide =indexHide;
	exports.indexstart = indexstart;
})