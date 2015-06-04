(function(window,undefined){
function iosMove(obj,parent){
var downY =0;
var downTop = 0;
var pervY = 0;
obj.ontouchstart = function(ev){
	//获取第0个手指 单指响应

	var  touchs = ev.changedTouches[0];
	downY = touchs.pageY;
	downTop = this.offsetTop;
	pervY = touchs.pageY;
	var btu = true;
	this.ontouchmove = function(ev){
		var  touchs = ev.changedTouches[0];
		if(this.offsetTop >= 0 ){
			if(btu){
				btu = false; 
				downY = touchs.pageY;
			}
			this.style.top = (touchs.pageY - downY)/3 +"px";
		}else if(this.offsetTop <= parent.offsetHeight - this.offsetHeight){
			if(btu){
				btu = false; 
				downY = touchs.pageY;
			}
			this.style.top = (touchs.pageY - downY)/3 + (parent.offsetHeight - this.offsetHeight)+"px";

		}else{
			this.style.top = downTop + touchs.pageY - downY+"px";
		}
	}
	this.ontouchend = function(ev){
		var  touchs = ev.changedTouches[0];
		var This = this;
		if(this.offsetTop >= 0){
				this.className = "totop";
				this.addEventListener("webkitAnimationEnd",function(){
					This.style.top = "0px";
					this.className = "";
				},false);
		}
		this.ontouchmove = null;
		this.ontouchend = null;
	}
}
}

window.iosMove = iosMove
})(window)