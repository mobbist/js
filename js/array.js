//数组的定义
var arr = new Array();
var arr2 = [1,2,5,6,8,9];

/*
 *数组的属性
 *constructor 返回对创建此对象的数组的函数引用
 *index
 *input
 *length
 */
document.write(arr2.length); /*
 *数组的方法
 *concat  合并数组
 *join    把数组按照一定的格式进行串联,
 *push    数组的追加
 *pop     删除数组返回的最后一个元素
 */
arr.push(55);
arr.push(33);

document.write(arr2.join("%"));
