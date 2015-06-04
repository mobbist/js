//模拟从服务器取得的数据用json方式添加到前段

window.onload = function(){
	var data = [
	{"id":"1","name":"mobbist","age":28,"sex":"男"},
	{"id":"2","name":"sam","age":18,"sex":"女"},
	{"id":"3","name":"rob","age":82,"sex":"女"},
	{"id":"4","name":"jeck","age":58,"sex":"男"},
	]
	var oTable = document.getElementById("oTlable");
	//JS下专门获得tbody, 是一个数组
	var oTbody = oTable.tBodies[0];

	for(var i=0; i<data.length; i++){
		var oTr = document.createElement("tr");
		var oTd1 = document.createElement("td");
		oTd1.innerHTML = data[i]["id"];
		var oTd2 = document.createElement("td");
		oTd2.innerHTML = data[i]["name"];
		var oTd3 = document.createElement("td");
		oTd3.innerHTML = data[i]["age"];
		var oTd4 = document.createElement("td");
		oTd4.innerHTML = data[i]["sex"];
		oTr.appendChild(oTd1);
		oTr.appendChild(oTd2);
		oTr.appendChild(oTd3);
		oTr.appendChild(oTd4);
		oTbody.appendChild(oTr);


	}


}