//底层滑动框架: Ms:  moblieSlip
(function(window,undefined){
    //obj: 滑动监听层,    touchBG: 滑动实际运动层 ,direction:滑动方向:X:横向  Y:竖向  默认:XY同时
    var Ms = function(obj,touchBG,oDirection){
    this.obj = obj;
    this.touchBG = touchBG;
    this.numY = 0;
    this.numX = 0;
    this.stepX = 0;
    this.stepY = 0;
    this.iSpeedY = 0;
    this.iSpeedX = 0;
    this.move = false;
    this.oDirection = oDirection || "all"; 
    this.direction = this.oDirection;
    //判断是否有滑动, 主要区别用户点击 还是滑动(XY同时相应模式下启动)
    this.scrollength = false;
    //在move事件中相应,一次就关闭(XY同时相应模式下启动)
    this.onceMove = true;
    this.move = function(moveFn,endFn){
        //移动中回调
        this.moveFn = moveFn;
        //抬起回调
        this.endFn = endFn;
        //初始化第一次滑动的位置
        this.touchBG.style.webkitTransform ="translate3d("+this.numX+"px,"+this.numY+"px,0px)" ;
        //运动时间
        var This = this;
        fl.bind(this.obj,"touchstart",function(ev){
            This.touchStart(ev);
        });
    }
    //开始滑动事件
    this.touchStart = function(ev){
        var This = this;
        var  touchs = ev.changedTouches[0];
        
        if(this.direction == "all"){
            this.startX = touchs.pageX;
            this.pervX = touchs.pageX;
            this.startY = touchs.pageY;
            this.pervY = touchs.pageY;
        }
        if(this.direction == "X"){
            this.startX = touchs.pageX;
            this.pervX = touchs.pageX;
        }else if(this.direction == "Y"){
            this.startY = touchs.pageY;
            this.pervY = touchs.pageY;
        }
        fl.bind(document,"touchmove",this.touchMoves = function (ev){
            This.touchMove(ev);
        });
        fl.bind(document,"touchend",this.touchEnds = function touchEnds(ev){
            This.touchEnd(ev);
        });
    }
    //获取传入参数滑动层,和方向值, 获取transform相对应的值
    this.getTransform = function(getTouchBG,xy){
        var val = getTouchBG.style.webkitTransform;
        if(xy == "X"){
            var  re = /^\w+|(\s)(.+)|px|,|\(|\)/g;
            val = val.replace(re,"");
            }else if(xy == "Y"){
            var  re = /^\w+|(\()(.?)(\d+)|0px\)|px,/g;
            val = val.replace(re,"");
            }
        
        return parseInt(val);
    }

    //开始移动实现
    this.touchMove =  function(ev){
        this.move = true;
        ev.preventDefault();
        var  touchs = ev.changedTouches[0];
        this.target = ev.target;
        if(this.direction == "all"){
            //同时监听XY轴滑动, 并且判断是X还是Y轴
            var iSpeedY = touchs.pageY - this.startY;
            var iSpeedX = touchs.pageX - this.startX;
            //让速度高于5, 再开始接收
            if(iSpeedY < 5){
                iSpeedY = touchs.pageY - this.startY;
                this.scrollength = true;
            }
            if(iSpeedX < 5){
                iSpeedX = touchs.pageX - this.startX;
                this.scrollength = true;
            }
            if(this.onceMove && this.scrollength){
                this.onceMove = false;
            //判断左右移动还是上下移动
            if(Math.abs(iSpeedX) > Math.abs(iSpeedY)  ){
                this.movefun = true;
                }else{
                    this.movefun = false;
                    this.topfun = true;
                };
            }
            //满足左右移动时候
            if(this.movefun ){
                this.topfun = false;
                this.direction ="X";
            }else{
                //满足上下滑动
               this.direction = "Y";
            }
        }
        this.moveFn && this.moveFn(this.direction);
        //判断是滑动方向
        if(this.direction == "X"){
            this.pageX =  touchs.pageX;
            this.spaceX = this.pageX - this.startX;
            //直接获取页面上X轴上的的值
            this.stepX = this.numX +  this.spaceX;
            if(this.pageX-this.pervX!=0){
                this.iSpeedX=this.pageX-this.pervX;
                this.pervX= this.pageX;
                
            }
        }else if(this.direction == "Y"){
            this.pageY =  touchs.pageY;
            this.spaceY =  this.pageY - this.startY 
            this.stepY = this.numY + this.spaceY ;
            if(this.pageY-this.pervY!=0){
                this.iSpeedY=this.pageY-this.pervY;
                this.pervY= this.pageY;
            }

            //console.log(this.getTransform(this.touchBG,"Y"));
        } 
        
        
        
    }

    this.touchEnd = function(ev){
        if(this.move){
            this.endFn && this.endFn(this.direction);
            this.move = false;
            this.scrollength = false;
            this.onceMove = true;
            this.X_left = false;
            this.X_right =false;
            this.Y_top =false;
            this.Y_bottom =false;
            
            if(this.oDirection == "all"){
                this.direction = "all";
            }
            fl.unbind(document,"touchmove",this.touchMoves);
            fl.unbind(document,"touchend",this.touchEnds);
        }
    }
}



window.Ms = Ms; 
})(window)