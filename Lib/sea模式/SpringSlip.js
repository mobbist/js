// 弹性滑动层, 基于MobileSlip滑动框架
define(function(require,exports,module){
    //引入MobileSlip滑动框架
    var fl = require("libraries/fl.min.js");
    var Ms = require("libraries/Ms.js");
    function SpringSlip(obj,touchBG,direction,sideMove){
        
        this.ms = new Ms(obj,touchBG,direction);
    }
    //参数: XY同时相应弹性区间
    SpringSlip.prototype.move = function(right,bottom,callback){
        //接受区间参数
        this.left = 0;
        this.top = 0;
        this.right = right;
        this.bottom = bottom;
        //判断参数sideMove  true: 开启根据滑动方向,所响应不同的层的方法, false: 关闭
        this.callback = callback || undefined;
        this.ms.move(this._moveFun(this),this._moveEnd(this));
    }

    //滑动中回调,使用回调函数参数direction,自行判断X轴还是Y轴滑动
    SpringSlip.prototype._moveFun = function(This){
        return function(direction){
            if(direction == "X"){
                //这里的this已经转为MS对象了
                if(this.stepX > This.left){
                     if(!this.X_left){
                        this.X_left =true;
                        this.startLeftX = this.pageX;
                     }
                    //判断滑时,若超出边界, 那么需要添加阻力算法
                     this.stepX = (this.pageX-this.startLeftX)*0.3;
                }else if(this.stepX < This.right){
                    // 大难点: 这里因为要添加阻力, 所以需要重新获取一下start的值,相当于从新开始计算偏移值
                    //        如果不这样做, 那么会滑出一大块, 这一大块就是之前的记录的移动值, so从新计算
                    //        而且, 这个值 只需要记录一次即可
                    if(!this.X_right){
                        this.X_right =true;
                        this.startRightX = this.pageX;
                    }
                    this.stepX =  This.right+(this.pageX-this.startRightX)*0.3;
                }
            }else if(direction == "Y"){
                //这里的this已经转为MS对象了

                if(this.stepY > This.top){
                    if(!this.Y_top){
                        this.Y_top =true;
                        this.startTopY = this.pageY;
                    }
                    this.stepY = (this.pageY-this.startTopY)*0.3;
                }else if(this.stepY < This.bottom){
                     if(!this.Y_bottom){
                        this.Y_bottom =true;
                        this.startBottomY = this.pageY;
                    }
                    this.stepY = This.bottom+( this.pageY - this.startBottomY)*0.3;

                }
            }

            if(This.sideMove==true){ 
                This.SideMoveFun(this); 
            }else{
                this.touchBG.style.webkitTransition ="-webkit-transform 0ms cubic-bezier(0.33, 0.66, 0.66, 1)" ;
                this.touchBG.style.webkitTransform ="translate3d("+this.stepX+"px,"+this.stepY+"px,0px)" ;
            };
        }
    }
    //滑动结束回调,使用回调函数参数direction,自行判断X轴还是Y轴滑动
    SpringSlip.prototype._moveEnd = function(This){
        return function(direction){

            if(direction =="X"){
                //获取手指滑动的速度值
                var absiSpeedX = Math.abs(this.iSpeedX);
                if(absiSpeedX >3){
                    this.stepX = this.stepX+this.iSpeedX*8;
                };
                if(this.stepX > This.left){
                    this.stepX= This.left;
                }else if(this.stepX < This.right){
                    this.stepX = This.right;
                }
                
                //this.numX = this.stepX 
            }else if(direction =="Y"){
                //获取手指滑动的速度值
                var absiSpeedY = Math.abs(this.iSpeedY);
                if(absiSpeedY >3){
                    this.stepY = this.stepY+this.iSpeedY*8;
                };

                if(this.stepY > This.top){
                    this.stepY=This.top;
                }else if(this.stepY < This.bottom){
                    this.stepY = This.bottom;
                }
               
            }
            if(This.sideMove==true){ 
                This.SideEndFun(this); 
            }else{
            this.touchBG.style.webkitTransition ="-webkit-transform 500ms cubic-bezier(0, 0.33, 0.33, 1) " ;
            this.touchBG.style.webkitTransform =" translate3d("+this.stepX+"px,"+this.stepY+"px,0px)" ;
            //通过获取元素的值, 来设置numX的值

            this.numX= this.getTransform(this.touchBG,"X");
            this.numY= this.getTransform(this.touchBG,"Y");
            }
             This.callback &&This.callback(this);


        }    
    };

    //当XY轴滑动时,根据滑动方向,所响应不同的层的设置方法
   SpringSlip.prototype.setSide = function(objSide){
        this.arr = [];
        this.arrVal = [];
        this.moveSpaceArr = objSide.moveSpaceArr;
        for(var i=0;i<objSide.sideArr.length;i++){
            //初始化不同层的属性值和3d值
            fl.attr(objSide.sideArr[i],"slip",i+1);
            objSide.sideArr[i].style.webkitTransform ="translate3d(0px, 0px, 0px)" ;
            this.arr.push(objSide.sideArr[i]);
            this.arrVal.push(0);
        }
        this.setDirection = objSide.direction;
        this.sideMove = true;
    }




    //当XY轴滑动时,根据滑动方向,所响应不同的层的调用方法
    SpringSlip.prototype.SideMoveFun = function(This){
        //当满足设置的滑动方向所对应的方向, 那么就满足这个不同层的滑动
        this.bottom = undefined;

        if(this.setDirection == This.direction){
            var target = This.target;
                
                while(fl.attr(target,"slip") == null){
                    target = target.parentNode;
                    if(target == document){
                         target = undefined;
                        break;
                    };
                };
                if(target != undefined){
                    //获取到该层元素,进行设置
                    this.item = fl.attr(target,"slip")-1;

                    this.bottom = this.moveSpaceArr[this.item]; 
                    target = this.arr[this.item];
                    This.numY = this.arrVal[this.item]; 
                    target.style.webkitTransition ="-webkit-transform 0ms cubic-bezier(0.33, 0.66, 0.66, 1)" ;
                    target.style.webkitTransform ="translate3d("+0+"px,"+This.stepY+"px,0px)" ;
                }
        }else{
            //因为这里判断是响应了X轴的事件, 所以就没必要实现Y轴的值了, 为0即可, 偷懒
            This.touchBG.style.webkitTransition ="-webkit-transform 0ms cubic-bezier(0.33, 0.66, 0.66, 1)" ;
            This.touchBG.style.webkitTransform ="translate3d("+This.stepX+"px, 0px, 0px)" ;

        }
    }

     //当XY轴滑动结束,根据滑动方向,所响应不同的层的调用方法
    SpringSlip.prototype.SideEndFun = function(This){
        if(this.setDirection == This.direction){
                if(this.item != undefined){
                    //获取到该层元素,进行设置
                    target = this.arr[this.item];
                    //将上一次滑动的值, 存入数组, 下次就直接能获取这个上次的值, 而不必再通过This.numY获取
                    this.arrVal[this.item] =  This.getTransform(target,"Y");

                    target.style.webkitTransition ="-webkit-transform 500ms cubic-bezier(0.33, 0.66, 0.66, 1)" ;
                    target.style.webkitTransform ="translate3d("+0+"px,"+This.stepY+"px,0px)" ;
                    this.arrVal[this.item]  = This.stepY;
                };
                
        }else{
            //因为这里判断是响应了X轴的事件, 所以就没必要实现Y轴的值了, 为0即可, 偷懒

            This.touchBG.style.webkitTransition ="-webkit-transform 500ms cubic-bezier(0, 0.33, 0.33, 1) " ;
            This.touchBG.style.webkitTransform =" translate3d("+This.stepX+"px,"+0+"px,0px)" ;
            This.numX= This.getTransform(This.touchBG,"X");
        }
    }    
    module.exports = SpringSlip;
})