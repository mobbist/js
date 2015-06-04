(function(){
// javascript 操作字符串的一些函数
var str = "mobbist";
var newStr = null;
//indexOf("t")) 查找参数内的字符在字符串中得位置.   参数:字符,     返回值: 数字(下标值), 从0开始
newStr = str.indexOf("t");
//charAt(6) 查找参数下标值所对应的字符,     参数: 数字,   返回值: 数字(下标值)所对应的字符, 从0开始
newStr = str.charAt(6);
//substring(1,2)  截取字符串, 接受2个数字参数,   参数1: 开始截取的位置,   参数2: 结束截取的位置, 注意:不包括结束位置的内容
newStr = str.substring(1,7);
//split 分割字符串,  可以将一个字符串分割成数组.   参数1:  通过指定的内容来分割, 参数如果我写 " ", 说明是根据空格来分割成数组, 如果是 "", 说明是每个字符分割成数组. 参数2: 是返回的最大长度
newStr = str.split("",3);
alert(newStr);

// 字符串可以进行比较,  a<b,  根据字符内的编码进行比较, a的编码是97   b的编码是98
alert("a"<"b"); //true   
// 那么字符串可以进行比较的话, 哪就可以能检测出是否是数字类型, 
var  number= "10500";	
number < "9" && number>"0" ? alert(true) : alert(false);




})()