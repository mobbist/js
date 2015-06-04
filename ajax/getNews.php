<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

$news = array(
	array('title'=>'张三','date'=>'2012-5-29'),
	array('title'=>'李四','date'=>'2012-5-29'),
	array('title'=>'王五','date'=>'2012-5-29'),

	array('title'=>'王五','date'=>'2012-5-29'),

	array('title'=>'王五sa','date'=>'2012-5-29'),

	array('title'=>'王五fdsa','date'=>'2012-5-29'),
);

//echo json_encode($news);
if($_GET["name"] == "新闻"){
	echo json_encode($news);
}

