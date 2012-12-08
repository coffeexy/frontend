JavaScript 的核心，闭包和作用域
==========================================
这篇文章源于[@伯乐在线官方微博](http://e.weibo.com/jobbole?ref=http%3A%2F%2Fweibo.com%2F1581992285%2Fprofile%3Ftopnav%3D1%26wvr%3D5%231354965989570)一篇文章,[测试：你自认为理解了JavaScript？](http://blog.jobbole.com/30468/),原文链接这篇文章有给出.主要下面五段小代码.

```javascript
    if (!("a" in window)) {
        var a = 1;
    }
    alert(a);
```
```javascript
    var a = 1,
	    b = function a(x) {
	        x && a(--x);
	    };
	alert(a);
```
```javascript
    function a(x) {
	    return x * 2;
	}
	var a;
	alert(a);
```
```javascript
    function b(x, y, a) {
	    arguments[2] = 10;
	    alert(a);
	}
	b(1, 2, 3);
```
```javascript
    function a() {
	    alert(this);
	}
	a.call(null);
```

参考答案(在chrome下弹出的结果,别的木有测试过):
> undefined,

> 1,

> function a(x) { return x * 2; },

> 10,

> window

###下面是我的理解,以及用于理解而参考的一些资料:
####题目1
```javascript
    if (!("a" in window)) {
        var a = 1;
    }
    alert(a);
```
1.  变量申明先压入栈,即顶置变量申明.var a = 1;分为变量申明和变量赋值--var a; a = 1;执行的时候才进行赋值,所以"a" in window为true,没有对a赋值,所以弹出undefined,而非报错.
2.  我多嘴说一句,if是不区分作用域的.JS中并不是{}区分变量作用范围,而是函数.

####题目2
```javascript
    var a = 1,
	    b = function a(x) {
	        x && a(--x);
	    };
	alert(a);
```
我认为很简单,a(x)只是一个代号而已,不是变量,所以跟var a = 1一点关系没有,它可以是b(x),c(x).弹出的a始终为1.

如果把b改成a就不一样了.

####题目3
```javascript
    function a(x) {
	    return x * 2;
	}
	var a;
	alert(a);
```
函数申明,然后是变量申明.由于变量没有赋值,那a没有被覆盖.输出的是函数体.JS中变量是随时可以被改变,但这应该局限于执行的时候.

####题目4
```javascript
    function b(x, y, a) {
	    arguments[2] = 10;
	    alert(a);
	}
	b(1, 2, 3);
```

arguments[2] = 10;就是改变a了,好像没有什么好解释了.

####题目5
```javascript
    function a() {
	    alert(this);
	}
	a.call(null);
```

这个翻译过上一次的[文章](https://github.com/CoffeeXu/Front-end/blob/master/JavaScript%20Function%20Invocation%20Patterns.md),好像也很简单.this指向call函数第一个参数(这里为null).根据ECMAScript262规范规定：如果第一个参数传入的对象调用者是null或者undefined的话，call方法将把全局对象（也就是window）作为this的值.

此处再总结下this.

1.  对于obj.fun()此类方法函数调用,哪个`对象实例`(obj)调用this所在的函数(fun),this指向那个`对象实例`

2.  对于函数调用,this指向全局对象.(其实可以看做上一种,是window对象的方法函数,全局对象调用,则指向全局对象)

3.  对于构造函数调用,若该函数返回一个简单类型（number, string, boolean, null or undefined），忽略return值，返回this（指向新的对象）;如果该函数返回一个object实例（简单类型以外的任何类型），那么将返回该对象。

4.  apply和call调用,this指向apply和call第一参数.即手动设置this的值.

废话在后
=========================
写的时候发现网上有好多此类答案解析,比如汤姆大叔系列[《你真懂JavaScript吗？》答案详解](http://www.cnblogs.com/TomXu/archive/2012/02/10/2342098.html),话说有多少人从这个系列启蒙javascript的?

就当自己做笔记了.资料也看了些.总归是有长进.


完.



	

	

	