<!DOCTYPE HTML>
<html>
<head>
<meta  charset="utf-8"/>
<script type="text/javascript" src="fl.js"></script>
<script type="text/javascript">
window.onload = function(){
	var oDiv1 = document.getElementById("div1");
	//alert(fl.css(oDiv1,"position"));
	//alert(fl.getpos(oDiv1));
	fl.addClass(oDiv1,"abcd fjdk fdsa");
	fl.removeClass(oDiv1,"fdsa");
	//alert(fl.text(oDiv1));
	var a = fl.next(fl.next(fl.first(oDiv1)));
	//alert(fl.text(fl.parent(a)));
	fl.startMove(oDiv1,{left:"300"},500,"easeOut");

}
</script>
<style type="text/css">
#div1{ width: 300px; height:300px; position: absolute; top:100px; background-color:red; }
</style>
</head>
<body>
	<div id="div1" class="abb"><span>1</span><span>2<span>21</span><span>22</span><span>23</span></span><span>3</span><span>456</span><span>456</span>
	</div>
</body>
</html>