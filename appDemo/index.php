<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<title></title>
<link rel="stylesheet" type="text/css" href="./css/base.css">
<script type="text/javascript" charset="utf-8" src="./js/sea.js"></script>
<script type="text/javascript" >
//前端JS架构:  架构不是一个深奥的东西, 也没有一个具体的方法, 具体得看项目的情况,写一个适合的方案. 
//用户体验: 让用户用得爽, 速度快(一站式开发,hash, 让用户体验到类似flash网站的感觉)
//有大量特效: 合理性, 性能上 ( 不是随便找个特效一贴,要合理结合结构, 内容)
//用新的技术:  html5和css3,  用CSS3替代JS的运动
//开发过程中和后期维护上: 多人协作, 功能扩展
seajs.use("./js/main.js");

</script>
</head>
<body>

<article>
<header class="header">
	<h1>前端应用</h1>
</header>
<menu id="headerMenu">
		<li id="selectStyle"></li>
		<li data-hash="index"><h2>新闻</h2></li>
		<li data-hash="shanghai"><h2>列表</h2></li>
</menu>
<section id="bodyParent">
	<section id="index" data-hash="index" >
		<ul id="index_banner" >
			<li><img src="./images/index/tmp_img1.jpg" /></li>
		</ul>
		<div class="index_bg"><div class="index_bg_sub">web前端案例</br>Mobbist</div></div>
		<ul id="listBox">
			<li><div><img src="./images/index/tmp_img3.jpg" /></div>
				<div><h3>这是web前端开发个人测试案例!</h3>
					<p class="dec">
						前端开发攻城师绝不可忽视的技术
					</p>
				</div>
			</li>
			<li><div><img src="./images/index/tmp_img3.jpg" /></div>
				<div><h3>这是web前端开发个人测试案例!</h3>
					<p class="dec">
						前端开发攻城师绝不可忽视的技术
					</p>
				</div>
			</li>
			<li><div><img src="./images/index/tmp_img3.jpg" /></div>
				<div><h3>这是web前端开发个人测试案例!</h3>
					<p class="dec">
						前端开发攻城师绝不可忽视的技术
					</p>
				</div>
			</li>
			<li><div><img src="./images/index/tmp_img3.jpg" /></div>
				<div><h3>这是web前端开发个人测试案例!</h3>
					<p class="dec">
						前端开发攻城师绝不可忽视的技术
					</p>
				</div>
			</li>
			<li><div><img src="./images/index/tmp_img3.jpg" /></div>
				<div><h3>这是web前端开发个人测试案例!</h3>
					<p class="dec">
						前端开发攻城师绝不可忽视的技术
					</p>
				</div>
			</li>
		</ul>
	</section>

		
	<section id="shanghai" data-hash="shanghai" >
		<section id="leftList">
			<ol class="shanghai_listBox">
				<li><span>1</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>2</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>3</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>4</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>5</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>6</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>4</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>5</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>6</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
			</ol>
		</section>
		<div class="index_bg"><div class="index_bg_sub">web前端案例</br>Mobbist</div></div>
		<section id="rightList">
			<ol class="shanghai_listBox">
				<li><span>1</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>2</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>3</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>4</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>5</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>6</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>4</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>5</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
				<li><span>6</span>
					<img src="./images/index/tmp_img4"/>
					<div>
						<h3>javascript</h3>
						<p>前端必备技术</p>
					</div>
				</li>
			</ol>
		</section>
	</section>
</section>
<div id="loadBackground" style="display:none">
	<div id="load">
		<div id="pic"></div>
		<div id="pic2"></div>
		<div id="loadingNum">0%</div>
	</div>
	<div id="shadow"></div>
</div>
</article>
</body>
</html>
