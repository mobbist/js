//以面向对象的方式,封装一个banner的组件

//IE7bug  json里最后一个内容后不能有,号     position的值  必须要给与left 和top值  不然 css方法会获取不到
window.onload = function(){
	var banner1 = document.getElementById("banner1");
	var bannerBox = banner1.firstElementChild || banner1.firstChild;
	b1 = new banner();
	b1.init({
		//在init方法内传入JSON, 这个参数就是配置参数.
		moveBox: bannerBox,   
		num :2 ,	
		time : 3000, //毫秒
	});

	var leftbtu = mobb().getElementByClassName(banner1,"div","leftbtu");

	leftbtu[0].onclick = function(){
		b1.sporting();
	}
	
	
}



var banner = function(){
	//在这里定义的也就像相对于banner对象是全局变量
	this.iTimer = null;
	//默认参数配置
	this.settings ={
		moveBox:null,	//必传变量, 运动的当前层
		num:4,		//每次滚动的个数
		iSpeed : 1000, //毫秒
		auto: true	//是否自动
	} 


}

banner.prototype.init = function(opt){
	//将配置参数赋值给默认参数, 覆盖掉默认参数值,没有覆盖掉得说明就是使用默认值, 这样就不会报错, 组件模式最重要的一点
	for(var attr in opt){
		this.settings[attr] = opt[attr];
	}
	//判断关键参数是否传入
	if(this.settings.moveBox == null){
		throw new Error("关键参数配置不全");
	}
	//先获得滑动层的宽度. 动态计算
	this.oImg = this.settings.moveBox.getElementsByTagName("img");
	this.sportingNum = this.oImg[0].offsetWidth * this.settings.num;

	this.getWidth = function(){
		var boxWidth = this.oImg[0].offsetWidth * this.oImg.length;
		this.settings.moveBox.style.width = boxWidth+"px"; 
	}
	this.getWidth();
	
} 

//开始运动函数, 无限向左右运动的开始无缝切换
banner.prototype.sporting = function(){

	//this.settings.moveBox.style.left = - this.sportingNum+"px";
	for(var i=0; i < this.settings.num; i++){
		//深度复制, 需要复制的元素 点上 cloneNode(true), 这个true就是子元素一并复制, 
		var oLi = this.settings.moveBox.children[i].cloneNode(true);
		//再把这个复制出来的内容 插入 appendChild
		this.settings.moveBox.appendChild(oLi);
		this.getWidth();
	}
	var moveBox = this.settings.moveBox;
	var num = this.settings.num;
	mobb().startMove(moveBox,{"left":- this.sportingNum},-10,function(){
		//执行回调函数
		for(var i=0; i < num; i++){
			//因为删掉一个元素, 会使整体布局往前进一格, 而且补上删掉得这个位置的元素, 就正好是0 这个值
	 		moveBox.removeChild(moveBox.children[0]);
	 		//然后 只要让他的LEFT值为0 即可, 非常精妙的算法
	 		moveBox.style.left = 0;
	 	}
	})

	
	// for(var i=0; i < this.settings.num; i++){
	// 	this.settings.moveBox.removeChild(this.settings.moveBox.children[0]);
	// }

}

banner.prototype.leftbutton = function(){
	
}

