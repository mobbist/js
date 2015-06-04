//这是文件2, 这是个普通的seajs框架的模板
//同样 还是用seaJS的官方声明

define(function(require,exports,moduel){
	 var  name = function(){ return "mobbist"};
	 //通过 exports 对外提供接口
	 // 使用的时候就是:  require("moduel2.js").name();
	 exports.name  = name;
	 // 通过 moduel.exports提供整个接口,
	 // 使用的时候就是:  require("moduel2.js")

})