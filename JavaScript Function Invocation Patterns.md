#JavaScript： 函数调用模式

JavaScript被描述为一个面向函数语言（有别于面向对象的语言）。因为函数在JavaScript中不仅仅是独立的逻辑执行单元，函数是一等公民，它也提供作用域，且能创建对象。如此依赖函数有好有坏：好的是它使的语言轻且快速（也是该语言发展的初衷），坏的是如果你不知道你在做什么，你很容易把自己绕进去。

JavaScript函数一个需要关心的问题是，不同的调用模式可以产生截然不同的结果。这篇文章介绍了四种模式，如何使用它们，要注意些什么。四种调用模式如下：

1、方法调用（Method Invocation）

2、函数调用（Function Invocation）

3、构造函数调用（Constructor Invocation）

4、apply和call调用（Apply And Call Invocation）


##函数执行

Javascript（像现今所有语言）函数有逻辑模块化的功能，它可以在执行的任何时候被调用。调用函数时，暂停执行当前函数，传递控制和参数给被调用的函数。此外，this参数也被传递给函数。调用操作符是一对圆括号（） ，它可以包含0个或多个以逗号分隔的表达式。

不幸的是，有多种模式可用来调用函数。这些模式并不是nice-to-know：绝对有必要了解它们。因为不同模式调用函数可以产生截然不同的结果。我认为这是JavaScript在语言设计上的错误，如果设计语言时多些思考（少些匆忙），也不会产生这么大的问题。

##四种调用模式

虽然只有一个调用操作符（），但有四种调用模式。每种模式在初始化this参数时有所不同。

###方法调用

对象中的函数，称为方法。方法调用是调用对象中的函数的模式。例如：
```javascript
    var obj = {
        value: 0,
        increment: function() {
            this.value+=1;
        }
    };

    obj.increment(); //Method invocation
```

若函数前面有对象实例object，则称为方法调用。JavaScript将this参数指向调用方法的对象。如上例，this指向obj。Javascript在执行时绑定this（也被称为晚绑定）。

###函数调用

使用（）调用函数，称为函数调用：

```javascript
    add(2,3); //5
```

使用函数调用模式，this指向全局对象。这是JavaScript语言中的错误！盲目绑定this到全局对象会破坏当前上下文。尤其是在方法函数内使用`内部函数`。下面这个例子做了很好地解释：

```javascript
    var value = 500; //Global variable
    var obj = {
        value: 0,
        increment: function() {
            this.value++;

            var innerFunction = function() {
                alert(this.value);
            }

            innerFunction(); //Function invocation pattern
        }
    }
    obj.increment(); //Method invocation pattern
```

你认为屏幕上显示什么？答案是1的，不好意思你错了（但不要太为难自己，这是JavaScript没有处理好）。真正的答案是500。注意，innerFunction使用函数调用模式，因此this被设置为全局对象。结果就是innerFunction（再次强调，它是函数调用模式）没有指向当前对象的this参数。相反，它（this）被设置到全局对象，其value值被定义为500。我要强调，这是很糟糕的语言设计；增量函数采用方法调用模式来调用，很自然地认为在内部使用它时，this应该总是指向当前函数。

有一个简单的方法来避开这个问题，但在我看来是一种hack。在函数内部定义一个变量（按照惯例，命名为that），将this赋值给这个变量。（题外话：这种方式可行使因为JavaScript中的函数是闭包）：

```javascript
var value = 500; //Global variable
var obj = {
    value: 0,
    increment: function() {
        var that = this;
        that.value++;

        var innerFunction = function() {
            alert(that.value);
        }

        innerFunction(); //Function invocation pattern
    }
}
obj.increment();
```

如果this可以绑定到调用的当前对象作用域，函数和方法调用是一样的。

###构造函数调用

注意：这是JavaScript另一个特点！JavaScript不是class式面向对象的语言。相反，它是一个propertype式面向对象的语言，但JavaScript的创建者认为，熟悉传统的面向对象经验的人（绝大多数）可能对纯粹的原型形式不满。这导致JavaScript对其原型特征不确定，最糟糕的事情发生了：它混合了经典的面向对象的语法和自身原型性质。结果：一塌糊涂！

传统的面向对象，对象是类的实例。在C++和Java中，这个实例是通过使用new操作符生成。这似乎是构造函数调用模式背后的灵感...

构造函数调用模式是，在被调用的函数之前用new操作符。例如：

```javascript
var Cheese = function(type) {
    var cheeseType = type;
    return cheeseType;
}

cheddar = new Cheese("cheddar"); //new object returned, not the type.
```

虽然Cheese是一个函数对象（有人将函数作为运行模块化的代码块），通过调用带new关键字的函数，来创建一个新的对象。this参数将指向新创建的对象，而函数的return操作符，will have its behaviour altered。关于构造函数调用的return操作符行为有两种情况：

1、如果该函数返回一个简单类型（number, string, boolean, null or undefined），忽略return，返回this（指向新的对象）。
2、如果该函数返回一个object实例（简单类型以外的任何类型），那么将返回的对象，而不是返回this。这种模式是不经常使用，但当它与闭包相结合的时候非常有用。

例如：
```javascript
var obj = {
    data : "Hello World"
}

var Func1 = function() {
    return obj;
}

var Func2 = function() {
    return "I am a simple type";
}

var f1 = new Func1(); //f1 is set to obj
var f2 = new Func2(); //f2 is set to a new object
```

我们可能会忽略JavaScript创建者给予该语言的独特之处：利用任意原型链创建对象，而只使用对象字面量来创建对象。这种模式很直观但也存在潜在问题。不过可以通过扩展对象的创建方法，实现构造函数调用模式的方法，[例子](http://doctrina.org/JavaScript:Why-Understanding-Scope-And-Closures-Matter.html#closureandconstructor)。JavaScript 1.8.5实现了Object.create。构造函数调用仍然频繁使用。

###apply和call调用

apply模式相比之前的模式，没有那么糟糕。apply方法允许，通过传递参数数组给函数来手动调用函数，明确设置this参数。因为函数是一等公民，他们也是对象，因此也可以运行方法（函数）。事实上，每一个function都指向Function.prototype,因此方法可以很容易扩展函数。apply方法就是一个函数扩展方法-我的猜想-它定义在Function.prototype中。

apply有两个参数：第一个参数是this参数绑定的对象，第二个参数是一个数组，它被映射为第一个对象的参数：

```javascript
var add = function(num1, num2) {
        return num1+num2;
}

array = [3,4];
add.apply(null,array); //7
```

上面的例子中，this为空（该函数不是一个对象，所以它不需要）和数组为num1与num2。第一个参数可以更有趣：

```javascript
var obj = {
    data:'Hello World'
}

var displayData = function() {
    alert(this.data);
}

displayData(); //undefined
displayData.apply(obj); //Hello World
```

上面的例子使用apply绑定this到obj。结果产生一个this.data值。apply的实际应用价值,就是能明确分配一个值给this.。要是没有这个功能，我们可以直接使用（）来调用函数。

JavaScript还有种调用方法是call，类似apply方法,不过它传递的不是一个参数数组,而是一个参数列表。如果JavaScript可以实现的函数重载，我认为call应该是apply方法的重载。因此，人们谈论的apply和call其实是一样的。

##结论

无论好坏，JavaScript都已经流行了。了解语言的特征,并避免这种特性带来的异常非常重要。学习四种函数调用方法哪里不同，以及如何避免缺陷是使用JavaScript的基础。

原文：[http://doctrina.org/Javascript-Function-Invocation-Patterns.html](http://doctrina.org/Javascript-Function-Invocation-Patterns.html)

废话在后
========================
总结下this.
1.  对于obj.fun()此类方法函数调用,哪个`对象实例`(obj)调用this所在的函数(fun),this指向那个`对象实例`

2.  对于函数调用,this指向全局对象.(其实可以看做上一种,是window对象的方法函数,全局对象调用,则指向全局对象).避免这种语言设计不合理的一个小技巧就是,进入函数后就申明一个变量_this,赋值this给它(_this),保存下来.

3.  对于构造函数调用,若该函数返回一个简单类型（number, string, boolean, null or undefined），忽略return值，返回this（指向新的对象）;如果该函数返回一个object实例（简单类型以外的任何类型），那么将返回该对象。

4.  apply和call调用,this指向apply和call第一参数.即手动设置this的值.

完.