var svgDiv = document.getElementById("svgDiv");

//动态创建SVG元素, 需要定义命名空间 SVG
var svgNS = "http://www.w3.org/2000/svg";
//第一个参数就是命名空间(svgNS), 第二个参数就是 svg标签, 这点和传统的html创建元素不同
var osvg = document.createElementNS(svgNS,"svg");
//然后给这个元素添加其相对应的属性,这里和传统的HTML一致
osvg.setAttribute("xmlns",svgNS);
osvg.setAttribute("width","100%");
osvg.setAttribute("height","100%");
//再把这个元素添加到父类元素里,就创建了一个svg跟节点元素

//然后再创建一个svg元素, 同样是命名空间参数, 下面都是一直
var osvg2 = document.createElementNS(svgNS,"circle");
osvg2.setAttribute("cx","200");
osvg2.setAttribute("cy","100");
osvg2.setAttribute("r","100");
//再一层层从最子类慢慢嵌套出去
osvg.appendChild(osvg2);
svgDiv.appendChild(osvg);
 

//由于创建这些svg元素过于重复繁琐, 所以建议封装成为函数进行调用
function createSVG(obj,AttrValue){
    var svg = document.createElementNS(svgNS,obj);
    for(var attr in AttrValue){
        svg.setAttribute(attr,AttrValue[attr]);
    }
    return svg
}
var rect = createSVG("rect",{"x":"0","y":"0","width":"100","height":"200","fill":"#f70"});
//函数内部返回这个元素, 添加到SVG画板上
osvg.appendChild(rect);


//当业务需要, 可以将多个元素封装成一个图形, 可以进行重复调用
function customTag(){
    //在内部进行创建元素, 然后进行返回, 添加到父类元素上的操作
}


var svg3 = createSVG("svg",{"xmlns":svgNS,"width":"500","height":"500"});

//创建一个环形占比图
// 获取的数据, 所有值组合在一起的值为100
var data = [20,20,20,20,20];
//一个圆形是360度,  想要获取每个扇形的角度, 哪就要数据/100 *360角度   获得角度值 
var angle = 360;
//设置圆心点XY坐标
var centerX = 250;
var centerY = 250;
//设置外圆内圆的半径
var outerR = 200;
var innerR = 80;
//设置起始的外圆XY坐标,数组
var outerXY = [{"x":"450","y":"250"}];
//设置起始的内圆XY坐标,数组
var innerXY = [{"x":"330","y":"250"}];
//每个扇形图的颜色数据,
var arrColor = ["#f00","#f90","#300","#3f0","#900"]
var countAngleNum = 0;

//将数据中所有的角度算出, 然后利用起始的XY坐标和角度, 算出下一个XY的值
for(var i=0;i<data.length;i++){
    var angleNum = data[i]/100*360;
    countAngleNum += angleNum;
    //cos接受一个-1.0到1.0之间的弧度值, 弧度值计算公式是: 2* Math.PI/360*角度, 
    // 简化一下就是  角度*Math.PI/180, 获得正余弦值需要乘以半径, 再加上圆心点
    var outerX = Math.cos(countAngleNum*Math.PI/180)*outerR+centerX;
    console.log(outerX);
    var outerY = Math.sin(countAngleNum*Math.PI/180)*outerR+centerY;
    outerXY.push({"x":outerX,"y":outerY});

    var innerX = Math.cos(countAngleNum*Math.PI/180)*innerR+centerX;
    var innerY = Math.sin(countAngleNum*Math.PI/180)*innerR+centerY;
    innerXY.push({"x":innerX,"y":innerY});

}
//然后再开启一个for循环, 循环数据并开始绘制图形
// <path d="M400 400A100 100 0 0 1 500 400 L475 425A50 50 0 0 0 425 425Z"  
// stroke="#ccc" fill="#790" style="box-shadow:1px 1px 1px"></path>
for(var i=0;i<data.length;i++){
    //这里需要判断当值大于50, 说明绘制的弧度要大于180%了, 所以要采用绘制大弧, 即0,变1
    if(data[i] > 50){
        var oPath = createSVG("path",{d:"M"+outerXY[i].x+" "+outerXY[i].y+"A"+outerR+" "+outerR+" 0 1 1 "+outerXY[i+1].x+" "+outerXY[i+1].y+"L"+innerXY[i+1].x+" "+innerXY[i+1].y+"A"+innerR+" "+innerR+" 0 1 0"+innerXY[i].x+" "+innerXY[i].y+"Z"
        ,stroke:"#fff",fill:arrColor[i]});
    }else{
         var oPath = createSVG("path",{d:"M"+outerXY[i].x+" "+outerXY[i].y+"A"+outerR+" "+outerR+" 0 0 1 "+outerXY[i+1].x+" "+outerXY[i+1].y+"L"+innerXY[i+1].x+" "+innerXY[i+1].y+"A"+innerR+" "+innerR+" 0 0 0"+innerXY[i].x+" "+innerXY[i].y+"Z"
        ,stroke:"#fff",fill:arrColor[i]});
    }
    svg3.appendChild(oPath);
}

svgDiv.appendChild(svg3);







