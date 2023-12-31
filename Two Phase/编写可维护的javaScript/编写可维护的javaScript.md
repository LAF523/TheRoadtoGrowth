# 第一部分编程风格

> 代码整洁之道一书,前五章内容比较通用,后面的内容包含大量Java中的场景和代码,感觉并不适合前端仔,所以转换功法: 尝试在<编写可维护JavaScript>一书中继续学习构建优雅可读代码的门道

### 编程风格和编码规范

编程风格是编码规范的一种,用来规约单文件中的代码规划,编码规范包含的更广包含: 编程的最佳实践,文件和目录的规划以及注释等方面.本书主要讨论`JavaScript`的编码规范.

首先就是`编程风格部分`

## 基本格式化

### 缩进层级

缩进类型:

1.  制表符缩进: 各个系统对制表符的解释不一样
1.  空格缩进: 在所有文件系统中,表现没有任何差异

缩进长度:

-   2,4,8个空格

作者推荐使用**4个空格作为一个缩进层级**

### 语句结尾

JS语句不适用分号和使用分号都能正常运行,那JS代码到底需要分号吗?

答案是需要的,不仅需要分号还是JS中的一个词法单元,用来标记语句结束. 代码之所以不写分号也能运行那是依赖于自动分号插入(ASI)机制,ASI会自动插入分号,但难免会出现: 你不想插入分号,ASI却插入了分号的情况:

```
//原始代码
function fn(){
    return
    {
        title: 'a'
    }
}
//ASI转换后
function fn(){
    return;
    {
        title: 'a'
    };
}
转换后函数返回值是undefined
```

作者推荐:**写代码时不省略语句结尾分号**

### 行的长度

作者推荐:**将行的长度限定在80个字符**,主要是防止编辑器出现横向滚动条,保证一屏展示所有代码

### 换行

当一行的长度超过最大限制,就需要手动换行,

作者推荐: **换行的位置应选在语句的运算符之后,同时下一行增加两级缩进.对于赋值语句,换行后下一行应与赋值符号保持对齐**

```
//good
callAFunction(document, element, window, "some thing value", true,123,
        navigator)
//bad
callAFunction(document, element, window, "some thing value", true,123,
    navigator) //未缩进两个层级
//bad
callAFunction(document, element, window, "some thing value", true,123
        , navigator)//未在运算符之后换行
        
//good
const a = somethhing + anotherThing + yetAnotherThing + someThingElse +
          anotherThing //不用缩进两级,和赋值运算符对齐
```

### 空行

作者推荐: **将语义不相关的代码段通过空行进行分隔,语义相关的代码段之间不要有空行**,如一下场景:

-   在方法之间
-   在方法中的局部变量和第一条语句之间
-   在多行和单行注释之前
-   在方法内的逻辑片段之间

> 在代码整洁之道一书中,Bob大叔在格式一章也推荐通过空行来暗示代码片段之间的关系

### 命名

作者推荐:**使用小驼峰命名法即第一个单词首字母小写,之后的单词首字母都大写,在JS中进行命名**

JavaScript的核心组成ECMAScript就是遵照的小驼峰命名法

#### 变量和函数

-   变量命名前缀应该是名词,

-   函数命名前缀应该是动词

-   命名应尽可能的短小,并抓住要点.(个人看法: 以描述准确为第一位,之后尽量短小,实在抓不住要点还是老实的描述清楚的好)

-   尽量在变量名中体现出数据类型如: `count,length,size,name,title,message`

-   不要使用没有意义的命名: `foo,bar,tmp`,读者如果不联系上下文是很难明白需要表达的意思的

-   函数和方法名一些常见动词的约定

    -   | 动词 | 含义                 |
        | ---- | -------------------- |
        | can  | 函数返回一个布尔值   |
        | has  | 函数返回一个布尔值   |
        | is   | 函数返回一个布尔值   |
        | get  | 函数返回一个非布尔值 |
        | set  | 函数用来保存一个值   |

#### 常量

作者推荐: **使用全大写加下划线来表示常量,一眼就能看出这个是常量**

```
const Max_COUNT = 1
```

#### 构造函数

作者推荐:**以大驼峰对构造函数命名**,以便于将构造函数和普通函数区别出来

```
const me = Person('张三')
const you = getPerson('李四')
```

如果上述代码没有按照期望运行,我们检查时,可以一眼看出`Person`前面少了一个`new`运算符,因为可以一眼看出第一行是一个构造函数,构造函数实例化前面一定会有`new`

### 直接量

#### 字符串

作者推荐:**字符串使用双引号和单引号都可以,更重要的是从一而终**

#### 数字

由于JavaScript对八进制的支持并不好: `010并不代表10,而是8`,

```
console.log(010); //8
```

虽然各种校验会给出警告,但依然不影响运行

作者推荐: **由于八进制在代码中几乎很少用到,最好的做法是在代码中禁止八进制直接量**

#### Null

可以使用`null`的场景:

-   用来初始化一个可能赋值为对象的变量
-   用来和一个已经**初始化**的变量比较
-   当函数的参数期望是对象时,用作参数传入
-   当函数的返回值期望是对象时,用作返回值传出

不应当使用null

-   使用null来检测是否传入了某个参数
-   用null来检测一个未初始化的变量

```
//good
function getPerson(age){
    if(age < 0){
        return null
    }
    return new Person()
}
//good
var person = new Person()
if(person === null){}

//bad
function doSomething(arg1,arg2,arg3){
    if(arg1 !== null){
        ....
    }
}
```

理解null的最好方式: **把null当作对象的占位符**

#### Undefined

```
var person;
console.log(typeof person)
console.log(typeof foo) //foo并未被定义
```

上述两行代码都会输出nudefined,奇怪的是一个是已经定义的变量,一个是还没有定义的变量,但运算结果都是undefined,这可能会引发一些问题: 在语句中使用foo会报错,使用person则不会,但使用typeof判断不出这个变量是否定义

作者推荐:**禁止使用特殊值undefined,可以有效确保只有一种情况下typeof会返回undefined**

同时`unedined`还有一个问题,被覆盖:

```
let undefined = true
var person;
console.log(person === undefined) //false
```

#### 对象的直接量

直接使用对象字面量`{}`创建对象

使用对象字面量时,第一个左括号独占一行,之后每个属性独占一行并保持一个缩进,最后一个花括号也独占一行

#### 数组直接量

与对象字面量相同,相比使用构造函数更推荐直接使用字面量定义数组

## 注释

### 单行注释

独占一行的注释用来解释下一行代码

1.  注释之前总有空行,且缩进层级和下一行保持一致
1.  在代码尾部注释时,与代码尾部之间至少有一个缩进,超过当前行的最大字符限制,需要将注释移动到上方

```
//bad 注释之前没有空行
if(isSame){
    //如果代码执行到这里表示通过了安全检查
    allowed();
}
//bad 代码与注释之间没有缩进
if(isSame){
    allowed();//如果代码执行到这里表示通过了安全检查  与代码之间添加空格
}
```

### 多行注释

以`/*`开头并独占一行,以`*/`结尾并独占一行,注释内容以`*`开头

多行注释前应该有一个空行

多行注释的缩进和要解释的代码一致

```
/*
* 这是第一行注释
* 这是第二行注释
*/
```

### 什么时候使用注释

通用原则是: 当代码不够清晰时,添加注释

```
//bad

// 初始化count
var count = 10;


//good

// 修改count会让链接跳转失败
var count =10;
```

在没有注释的情况下,万一修改了count,谁能想到他会让链接跳转失败呢? 这就是添加注释的原因,描述必要的信息.以下情况都应该使用注释:

1.  难于理解的代码

    ```
    /*
    * 如果mode为2时,这里只执行依次递归,用来执行对象到对象的合并操作,原型到原型的操作将不被执行
    */
    if(mode === 2){
        Y.mix(.....)
    }
    
    顺便一提: 这里使用解释变量感觉更合适
    const canMergTwoObj = mode === 2;
    if(canMergTwoObj){
        Y.mix(.....)
    }
    ```

1.  可能被认为是错误的代码: 在团队中,总有一些好心的开发者在编辑代码的时候发现他人的错误,就立即修复他,有时这并不是错误的源头,就导致引发更多的错误

    ```
    while(ele && (ele = ele[axis])){ //赋值操作
        ...
    } 
    ```

### 文档注释

就想下面的例子一样,为所有的方法,构造函数,包含多个文档注释的方法的对象,添加文档注释.注释的详细风格和用法需要根据最终选择的文档生成工具有关

```
/**
 * @description: 
 * @param {*} param1
 * @param {*} param2
 * @return {*}
 */
function showJSDoc (param1,param2){}
```

## 语句和表达式

对于所有流程控制语句都不应该省略花括号,包括但不限于:

-   if
-   for
-   while
-   do..while
-   try..catch...finally

### 花括号的对其方式

作者推荐: **将左花括号放置在块语句中第一句代码的末尾**

```
 //good
 if(isSame) {
     ...
 }
 //不推荐
 if(isSame)
 {
     ...
 }
```

### 块语句间隔

作者推荐: **在左圆括号之前和右圆括号之后各加一个空格,使条件和语法格式间隔起来**

```
 //good
 if (isSame) {}
```

### switch语句

#### 缩进

有两种缩进风格:

-   每个case语句与switch关键字缩进一个层级
-   从第二个case开始,每条case语句前后各有一个空行

```
 switch (num) {
   case "one":
     //代码
     break;
     
   case "two":
     //代码
     break;
     
   break:
     //代码
 }
```

-   每个case语句与switch关键字对齐
-   每个case语句之间不要有空行

```
 switch (num) {
 case "one":
   //代码
   break;
 case "two":
   //代码
   break;
 break:
   //代码
 }
```

作者比较倾向于第一种

#### case的连续执行

作者推荐: **只要是有意为之的case都添加明显的注释**

```
 switch (num) {
     
   // 连续执行case
   case 'one':
   case 'two':
     // 代码
     break;
     
   case 'third':
     //代码
     
     //fall through
   default:
     //代码
 } 
```

#### default

是否需要default也是一个经常讨论的话题,作者更倾向于: **当不写default的时候,使用注释表述清楚**

```
 switch (num) {
   case 'one':
     //代码
     break;
   
   //没有default
 }
```

### with

with语句这里直接不推荐使用,非常影响性能: js在编译阶段做了很多优化,其中有些优化就是根据词法做静态分析,并预先确定所有变量和函数的位置,以便于需要时快速找到

但如果使用了`with`,只有在运行的时候才能知道with的作用域是什么,便不能在词法阶段确定作用域是否修改,如何修改,进而无法预先确定所有变量和函数定义的位置

### continue

continue可以跳过当次循环进入下一次循环,作者认为使用continue不如使用条件判断来的直接且更容易理解,所以应尽量避免使用continue,但并不完全禁止

### for-in

for-in用于遍历对象的键,但是还能遍历出从原型继承的属性,这往往使代码出现不符合预期的结果,推荐使用for-in循环时配合`hasOwnProperty`过滤出实例自身方法

```
 for (let key in obj) {
   if (obj.hasOwnProperty(key)) {
     //执行代码
   }
 }
```

还有一种常见的用法,有些开发者会使用for-in遍历数组,这是不推荐的,for-in只用来遍历对象

## 变量,函数和运算符

### 变量声明

这本书的创作时间比较久远那时还没有`let,const`,因此作者在这一节推荐的是`var`的用法.已经过时了,本人更推荐: `cosnt一把梭,梭不过去了回头改成let,绝不用var`

### 函数声明

虽然函数存在变量提升,但不推荐在函数定义之前调用函数,

同时禁止在语句块内声明函数,如`if`块内:

```
 const con = true;
 if (con) {
   function doSomeThing () {
     console.log('我是第一个函数')
   }
 }else {
   function doSomeThing () {
     console.log('我是第二个函数')
   }
 }
 // 对于上述代码: 作者说不同浏览器执行的行为不同,对于火狐会根据con的结果进行执行,其他大多数浏览器会使用第二个声明
```

**针对作者说的情况试验了一下: Chrom,Edge,Firefox对上述代码执行的结果是相同的**

### 函数调用间隔

函数调用时在函数和左括号之间不要保留空格,这样是为了与块语句区分开来

### 立即调用函数

使用立即执行函数时推荐在函数外用圆括号包裹起来

```
 const val = (function(){}())
```

为了让立即执行函数能立刻被认出来

### 严格模式

严格模式的指令`"use strict"`不要用在全局作用域,因为当十个文件联合成一个文件的时候,只要有一个文件使用了严格模式,那么所有文件都会使用严格模式进行解析,可能会导致错误

### 相等

只使用全等运算符: `=== 或 !===`

### eval,with

禁止使用eval和with

### 原始包装类型

原始包装类型的存在是为了方便操作原始值,但不要使用原始包装类型的构造函数创建原始包装类型,这会使我们在对象和原始值之间"跳来跳去",直接使用字面量进行定

# 第二部编程实践

## UI层的松耦合

本章作者主要讲解了:

- css和JavaScript之间的相互抽离
- HTML和JavaScript之间的相互抽离

虽然现代前端框架已经对这些进行了抽离,但作者的思想还是很值得学习的: **保证对应的代码在对应的位置: 样式相关代码只出现在css文件中,交互逻辑只出现在js中**,有时我们在css中查找原因,但最终发现问题原因深埋在js中,这时就会发现做相互的抽离是很重要的!

### 什么是松耦合

当修改了一个组件而不需要修改其他组件时,就做到了松耦合,本质上每个组件知道的越少,越有利于降低系统整体的耦合性.当然不可能没有无耦合的系统,我们的目标是确保一个组件的修改不会经常性的影响其他部分.

### JavaScript从CSS中抽离

- 不要在css中使用js(在老版本IE中支持)

### CSS从JavaScript中抽离

- 在JS中操作样式最佳的方式是操作类名,对于css无法实现的效果才在js中实现

*className是css和js之间的通信桥梁,以便于保证css与js的松耦合*

### JavaScript从HTML中抽离

举一个紧耦合的例子:

```js
<button onclick="doSmeothing" >Click</button>
```

为什么说这种写法是紧耦合的呢,原因有两点:

1. 试想一下,当包含`doSomething`函数的代码从外部文件加载失败,那么用户点击就会发生错误,或者点击没有响应
2. 如果后期`doSomething`函数的名字更换了,我们既要修改js又要修改HTML

如何抽离:

**绝大多数的js应该包含在外部文件中并在页面中通过<script>标签引入**

### HTML从JavaScript中抽离

将HTML嵌入js代码中主要存在两个问题: 

1. 增加了文本和结构性问题追踪的复杂度
2. 代码可维护性较低,如果想要修改一个标签,你只希望去一个地方修改,那就是可以控制你HTML代码的地方,如果HTML文件和js文件都参与很深,排查的时候就不得不将两个地方都进行排查了

作者推荐通过模板的方式,完成js与HTML的解耦,现代框架基本已经实现这个思想了





