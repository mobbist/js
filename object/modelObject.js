//以面向对象的方式,封装一个banner的组件
window.onload = function(){
	b1 = new banner();

	b1.init({
		//在init方法内传入JSON, 这个参数就是配置参数.
		width:300,
		height:300
	});
	b1.gotu();

	
}



//构造函数里, 配置一些默认的参数,在函数调用时候, 保证某些参数不传参, 不会导致程序出错
var banner = function(){
	//在这里定义的也就像相对于banner对象是全局变量
	this.iTimer = null;
	//默认参数配置
	this.settings ={
		width:200
	} 

}

//这是组件的初始化方法, 手动调用. 并传参, 这个参数是配置参数
banner.prototype.init = function(opt){
	//将
	for(var attr in opt){
		this.settings[attr] = opt[attr];
	}

} 


banner.prototype.sporting = function(){
}


