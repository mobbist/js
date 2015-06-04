<!DOCYPTE HTML>
<html ng-app="myapp">
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="./js/angular.min.js"></script>
<script type="text/javascript" src="./js/demo1.js"></script>
</head>
<body>
	<div >
		<input ng-model="name" type="text" placeholder="用户名" />
		<span> {{name}} </span>
		<div ng-controller="fristCtrl" >
			<input ng-click="add(1)" type="button" value="添加" />你一共点击了{{counter}}下
		</div>
		<input ng-model="width" type="text" placeholder="宽度" />
		<input ng-model="height" type="text" placeholder="高度" />
		<input ng-model="background" type="text" placeholder="背景图" />
		<div create-box  box-width="width" box-height="200" ></div>

		<!-- 
			ng开头的都是angularjs的内置指令.
			ng-init, 参数如下,  声明$scope对象下的属性,键值对
			ng-checked  是否选中, 
			ng-disabled 是否禁用输入字段, 
			ng-readonly,ng-  是否只读, 
			ng-selected  是否对出现option标签的selected属性进行绑定

			接受boon类型
		-->
		<label>你选中了:{{someuser}}</label>
		<!-- ng-init 出现在这里 意思就是默认选中状态 -->
		<input type="checkbox" ng-init="someuser='true'" ng-checked="someuser" ng-model="someuser"  />
		<!-- 
			ng-href  当使用当前作用域的属性动态创建url时.  使用ng-href 替代原生态的href
			如果使用的的是ng-href  angular 会等到插值生效后再执行点连接的行为
			ng-src, 同上,等到插值生效之后, 再开始加载图片
		-->
		<a ng-init="url='http://baidu.com'" ng-href="{{url}}"><img src="" /></a>
		<br/>

		<!-- 
			ng-app  ng-controller 这2个是特殊指令, 它们会修改嵌套在它们内部的指令的作用域

			ng-app   任何具有ng-app属性的dom元素将被标记为$rootScope的起始点,  通过 run方法来访问$rootScope全局对象

			ng-controller  为了防止全局$rootScope被污染才出现的,  其作用是为嵌套在其中的指令创建一个子作用域
			
			由于原型继承的关系 修改父级对象中得parentControllerVal,会同时修改子对象中的值, 但, 反之则不行

		-->
		<div ng-controller="testController" >
			{{ parentControllerVal }}
			<input  type='button' ng-click="parentFunction()" value="点击"  / >
			<div ng-controller="childController">
			{{ parentControllerVal }}
			<input  type='button' ng-click="childFunction()" value="点击"  / >
			</div>

			<!--  ng-include   包含一个文件,  注意:双引号里还要跟一个单引号 -->
			<div ng-include="'includeBody.html'" ng-controller="includeBody" >
				{{name}}
			</div>
		</div>	
		<br/>
		<!-- ng-switch : 内置指令声明,  on : 检测满足的值
			ng-swith-default      默认值
			ng-swith-when="val"  需要满足的值   -->
		ng-switch<br/>
		<input type="text" ng-model="switch" />
		<div ng-switch on="switch" />
			<p ng-switch-default>你要打val,才能显示哦</p>
			<h1 ng-switch-when="val">你果然打了呢</h1>
		</div>
		<br/>
		<!--  ng-if ="true": 其值若是true,则在DOM中克隆生成元素, false则是移除元素   
			  和ng-show和ng-hide指令最本质得区别是, 他不是通过css显示或隐藏Dom节点, 而是真正得生成或者移除节点
		 -->
		 ng-if<br />
		 <div ng-if="false">123</div>
		 <div ng-if="true">456</div>
		 <br />
		 <!-- 
			ng-repeat 用来遍历一个集合或为集合得每个元素生成一个模板实例,集合中的每个元素都会被赋予自己得模板和作用域
			同时每个模板实例的作用域中都会暴露一些特殊得属性.
			内部的值, 可以在控制中$scope 数据模型对象中设置
		  -->
		  ng-repeat</br>
	  	<ul ng-controller="articleList">
		  	<li ng-repeat="article in artFrom">
		  		<h2>{{ article.title }}<h2>
		  		<p>{{ article.body}}</p>
		  	</li>
		</ul>
		<input  ng-model="to" />
		<div my-directive lactions='456' ng-model="to" ></div>

		<div art-menu >
			 <span>原始的内容，</span>
            <span>还会在这里。</span>
		</div>
		<div art-menu >
			 <span>其他内容</span>
            <span>其他内容</span>
		</div>

		<div text-list>

		</div>
</body>
</html>