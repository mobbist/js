(function(){
	function map(){
		var arr = [];
		this.add = function(val){
			arr.push(val);
		
		}

		this.seclect = function(){
			return arr
		}

		this.remove = function(){

		}
	}

	var m = new map();
	m.add(55);
	m.add(22);
	m.add(55);
	m.add(5544);
	alert(m.seclect());
})()
