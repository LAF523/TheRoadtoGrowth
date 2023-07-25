# Typescript

添加了类型系统的js,适用于任何规模的项目

- js的超集,支持所有js的语法

- 强类型与弱类型

  > **类型系统根据是否存在隐式转换,将语言分为强类型语言和弱类型语言**TS完全支持js,不会改变js的特性,因此TS也是弱类型的语言,但是TS提供的类型系统结合ESLint的代码检查可以使TS接近于强类型语言

- 静态类型检查

  > **类型系统根据类型检查时机分为动态类型和静态类型:编译时检查类型称为静态类型检查,运行时检查类型称为动态类型检查**
  >
  > js是解释性语言,没有编译阶段因此js是动态类型语言,TS提供了编译阶段,可以在编译时发现类型错误,是静态类型语言

- 适用于任何项目

  > 为大型项目提供更高的可维护性

## 安装

安装TS

```cmd
npm i typescript -g
```

编译ts

```cmd
tsc ts文件路径
```

实时编译ts

```cmd
tsc --init   初始化tsconfig.json文件配置文件(并配置一下输出路径outDir)

tsc -p 配置文件路径 --watch
```

## 原始数据类型

TS中通过`:`规定了变量的类型.规定了类型的变量只能赋值为对应的数据类型,否则报错

### 布尔值

使用`:boolean`定义一个值只能是布尔值的变量

```ts
let boo:boolean = true;
boo = false   不报错
boo = "sadasd"  赋值为字符串 报错
```

需要注意的是: 使用`new Boolean()` 声明的布尔值是一个对象,并不是boolean类型

```js
let boo: boolean = new Boolean(1) 报错
let bpp: boolean = Boolean(1)     不报错
```

### 数值

使用`:number`定义一个数值类型的变量

```js
let num: number = 0
let num: number = 0xf11  十六进制
let num: number = 0b1010 二进制
let num: number = 0o777  八进制
let num: number = NAN
let num: number = Infinity
```

### 字符串

使用`:string`定义一个字符串类型的变量

```js
let str: string = "qqqqqq";
在ts中不同类型相加会直接报错
```

### 空值

使用`:void`定义一个值空值类型的变量,只能将它的值赋为`null`或`undefined`,(在strictNullChecks 未指定时)

> strictNullChecks  tsconfig中的配置表示严格空值检查,null和undefined不能赋值给其他类型

```js
let a: void = null
```

通常用来定义没有任何返回值的函数

```js
function fn():void {
    console.log("我是没有返回值的函数")
}
```

### Null和Undefined

使用`:null,:undefined`来定义类型为null和undefined类型的变量

```js
let u: null = null
let u: undefined = undefined
```

与`void`的区别就是,**`null`和`undefined`是所有类型的子类**,可以将任意类型的值赋值为`null`和`undefined`

```js
let a: null = undefined 不报错
```

## 任意值

通过`:any`定义一个只可以是任意类型的变量

```js
let a: any = 1
a = "pp"
a = true  都是可以的
```

### 任意值的属性和方法

任意值类型的变量可以调用所有方法,访问任何属性

### 未声明类型的变量

未声明类型的变量且未赋值,默认是任意类型,赋值的变量TS会根据类型推断将该变量声明为所赋值的类型

```js
let a;
等同于
let a:any

let b = 0
等同于:
let b: number = 0
```

## 类型推论

在某种情况下对未声明类型的变量,TS会推断该变量的类型

1. 声明变量未赋值

   > 将变量推断为`any`类型,

2. 声明变量并赋值

   > 将变量推断为所赋值的数据类型

   ```js
   let a = "qqqqqq"
   相当于
   let a" string ="qqqqqq"
   重新赋值为其他类型报错:
   a = 0 报错
   ```

## 联合类型

使用`|`定义多种类型的变量,可以使变量取值为多种

```js
let a: string|number = 1
a = "ppp" 不报错
```

### 访问属性和方法

只能访问联合类型所包含的类型中共有的方法

```js
function fn(a: number|string) {
    console.log(a.length) 报错:length不是number,string类型的共有方法
}

function fn(a: number|string) {
    console.log(a.toString()) 不报错
}
```

**声明了联合类型的变量,对变量赋值的时候,TS会根据类型推断,推断出一种类型,在下次赋值为其他类型之前只能访问该类型的方法和属性**

```js
let a: number|string;
a = "service"
a.length 正常
a = 7
a.length 报错
```

## 引用数据类型

### 数组

最常用: 使用`类型+[]`来定义数组类型

```js
let arr: number[] = [1,23,4,45,56,4]

定义一个数字类型的数组,其中的元素只能是数字类型
```

#### 泛型定义数组

```js
let arr: Array<number> = [1,2,3,4]
```



#### 接口定义数组

> 不常用,定义类数组的时候会用

```js
interface sum {
    [index:number]: number
}
let arr: sum = [1,2,3,43]
```

#### 接口定义类数组

> 使用接口定义类数组

```js
function fn(s:number): void {
  let arr: likeArr = arguments
  console.log(arr)
}
```

### 对象

使用接口来定义对象的类型,接口是行为的抽象,类是行为的实现,对象是类的实例,接口不仅可以对类进行描述,也可以对对象进行描述

> 自我理解: 接口就是对对象的约束

#### 定义接口

使用`interface`定义一个接口,对象必须遵循接口的约束,

```js
interface Person {  表示该中类型的对象只能有两个属性,name和age且属性的值必须是string,对象的形状要和接口保持一致
    name: string,
    age: string
}

let tom: Person = {
    name: "aaa"   报错,缺少属性
}

let tom: Person = {
    name: 0,      报错,类型错误
    age: "9"
}

let tom: Person = {
    name: "jjj",   报错: 多余属性
    age: "0",
    hhh: "000"
}
```

#### 可选属性

使用`?`声明可选属性,表示对象中这个属性可以用可以没有,但同样不能声明为定义的属性

```js
interface Person {
    name: string,
    age?: string
}
    
let tom: Person = {
    name: "qqqq"
}
```

#### 任意属性

使用`[任意变量名: 键类型]: 值类型`定义可以是任意类型的属性,也可以不写

```js
interface Person {
    name: string,
    [propName: string]: string
}

let a: Person = {
    name: "jjj",
    hhh: "p"
}
```

**注意: 使用任意属性时,哪些确定属性和可选属性的类型只能是任意属性的类型的子集**

```js
interface Person {
    name: number, //报错
    [propName: string]: string
}
interface Person {
    name: number,   不报错
    [propName: string]: string |number
}
```

#### 只读属性

使用`readonly`定义只读属性,**只读属性的约束存在对象第一次初始化时,而非第一次属性赋值的时候**

```js
interface Person {
    readonly name: string,
    age: number
}

let tom: Person = {
    age: 0
}
tom.name = "ppp" 
上述代码一共报两个错误:
1.对象缺少name属性
2.给只读属性name赋值
```

### 函数类型

JS中函数常用两种声明方式: 函数声明式,函数表达式:

**函数类型声明后参数必须按照声明来提供,不能多也不能少**

- 函数声明式

  ```js
  function fn(a:string):string{} //表示声明一个函数,这个函数接收一个string类型的参数,返回一个string类型的返回值
  ```

- 函数表达式

  等式左边对fn这个变量进行类型声明,等式右边对这个匿名函数进行类型声明

  ```js
  let fn: (a: string) => string  = function(a:string):string {}  //表示定义一个函数,这个函数接收一个string的参数,返回一个string的返回值
  ```

  首次可能会这样写:

  ```js
  let fn = function(a:string):string {} 
  这时候等式右边时对函数进行类型声明,而等式左边的变量是ts通过类型推断推断出来的
  ```

#### 用接口定义函数类型

使用`interface`结合`()`对函数进行类型声明

```js
interface Fn {
    (a:string): string
}

let fn1:Fn
fn1 = function(a:string):string {}
```

#### 可选参数

使用`?`定义可选参数,**可选参数必须在必选参数之后**

```js
function fn(a:string,b?:string):void{}
```

#### 参数默认值

在参数的类型声明后面使用`=`赋予默认值

```js
function fn(a:string="111"):string{}
```

**设置了默认值的参数,TS会识别为可选参数,但默认参数后面仍然可以跟必选参数**

#### 剩余参数

使用`any[]`和`rest`参数定义剩余参数

```js
function fn(a:string,...rest:any[]):string{}
```

#### 重载

可以使函数在接收不同参数的时候,做不同的处理,重载包含**声明和实现**两个部分: **多个重载签名**+**实现签名**+**函数体**

- 多个重载签名: 精确的显示函数接收什么样的输入会得到什么样的输出
- 实现签名: 将所有的输入输出类型做一个全量的定义
- 函数体: 具体的函数实现逻辑

```js
function fn(a:string|number):number|string {} 定义一个函数,参数是number时输出string,参数是string时输出number

使用函数重载实现:
function fn(a:number):string;
function fn(a:string):number;
function fn(a:number|string): string|number{}

逻辑更清晰,更易维护
```

**实际调用时是其中一个重载签名+实现,TS会优先从最前面的声明开始匹配,多个函数如果有包含关系,要优先把精确的定义写在前面**

## 类型断言

指定一个变量是什么类型,ts会对其按照所断言的类型规则进行校验

- `(变量名 as 类型)`最常用的一种方式,也是最推荐的方式

  ```js
  function fn(a:string|number):void {
      console.log((a as string).length) //正常情况下,联合类型只允许访问共有属性,访问number没有的属性length会报错,但使用断言可以告诉ts使用string类型的规则进行校验
  }
  ```

- `<类型>变量` :tsx语法不支持,同时与泛型易混淆,不推荐

### 类型断言的条件

类型A断言为类型B需要满足一下条件:

- ``类型A兼容类型B或类型B兼容类型A`(详细的举例请参照`类型断言原理`一节)

##### 兼容

- 如果类型A拥有类型B的所有属性那么可以称为B兼容A


```js
interface A {
    name: string,
    tallk: ()=> viod
}
interface B {
    name: string
}

类型A包含类型B的所有属性,所以类型B兼容类型A
```

### 类型断言的用途

#### 联合类型断言为其中一种

将一个联合类型断言为其中一个类型,如上述例子,可以"欺骗"TS成功的访问到非共有属性

#### 父类断言为子类

因为子类继承父类,拥有父类的所有属性和方法,相当于子类包含父类,因此可以将父类断言为更加具体的子类

```js
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```

#### any断言为任意类型

有时候由于诸多原因会产生很多any比如说,第三方库,历史遗留的代码,ts因为类型限制未能精确定义的类型,都可以通过将any定义为更精确的类型,提高代码的可维护性

#### 任意类型断言为any

一种场景向`window`上挂载`a`属性:

```js
window.a = 1
在ts中由于window上本身没有a属性,所以访问时就会报错,但我们可以确认的是这样不会出现错误,此时就可以将window断言成any类型来解决
(window as any).a = 1
```

**不要滥用as any造成隐患**

#### 断言的原理

总结一下用途:

- 联合类型断言成其中一种类型
- 父类可以断言成子类
- 任何类型都可以被断言为any
- any可以被断言为任何类型

那是不是任何一种类型都可以断言为任何另一种类型呢?并不是的

可以相互断言的要求:

**若A兼容B,那么A能够被B断言为A,B也能够被A断言为B**

```js
举个例子
interface Animal {
    name: string
}

interface Cat {
    name: string
    run():void 
}

let tom: Cat = {
    name:"aa",
    run: () => console.log("run")
}
let animal: Animal = tom
```

Typescript中是结构类型系统,**类型之间的对比只会比较他们的最终结构,而忽略他们定义时的关系**

上面的例子对于TS来说等价于:

```js
interface Animal {
    name: string
}
interface Cat extends Animal {
    run():void
}
```

所以说可以将Cat类型的cat对象赋值给Animal类型的animal对象了,这叫做**Animal兼容Cat**,

**要使得A能够断言为B,只要A兼容B或者B兼容A**,本节开头总结的断言特点都是这个定义的特例

#### 双重断言

可以使用双重断言打破"断言的原理:要使A能断言为B,只要A兼容B或者B兼容A",**但非常不建议使用**

```js
interface Cat {
    run(): void;
}
interface Fish {
    swim(): void;
}

function testCat(cat: Cat) {
    return (cat as any as Fish);
}

这时就打破了原理
```

### 类型断言的比较

#### 类型断言与类型转换

类型断言只会影响TS编译时的类型,类型断言语句在编译后的文件会被删除掉,

类型转换会直接改变变量的类型

#### 类型断言和类型声明

两种方式成立的条件不同

```js
// 类型断言和类型声明的区别
interface Anmai  {
  name: string
}
interface Cat {
  name: string,
  tallk: (a:string) => void
}

//生成两个实例
let anmai: Anmai = {
  name: "jjj"
}
let cat: Cat = {
  name: "ppp",
  tallk: () => {console.log("ppp")}
}
// 将Anmai类型的变量赋值给Cat类型的变量
let cat: Cat = anmai 报错类型Anmai中没有tallk属性
//将cat类型的变量赋值给Anmai类型的变量
let anmai1: Anmai = cat 因为Cat类型包含所有Anmai类型的属性所以Cat可以赋值给Anmail类型

//将cat断言成Anmai
let c = cat as Anmai
// 将Anmai断言为Cat类型
let cat1 = anmai as Cat
```

##### 类型声明的条件

A类型的值想赋值给B类型的变量需要满足以下条件:

- A类型兼容B类型

#### 类型断言和泛型

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

我们还有第三种方式可以解决这个问题，那就是泛型：

```ts
function getCacheData<T>(key: string): T {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData<Cat>('tom');
tom.run();
```

通过给 `getCacheData` 函数添加了一个泛型 `<T>`，我们可以更加规范的实现对 `getCacheData` 返回值的约束，这也同时去除掉了代码中的 `any`，是最优的一个解决方案。

## 声明文件

这里先记录一点皮毛

- 是什么

  描述第三方JS模块内所有导出接口的类型信息,文件后缀为`.d.ts`

- 为什么:

  当引入第三方库的时候,由TS编写的库打包时会带上类型声明信息,而一些第三方库可能不是TS编写的,并没有类型声明信息,不能在TS中直接使用,需要手写声明文件

### 声明文件搜索

大部分声明文件都可以搜索到直接用: 网址https://www.typescriptlang.org/dt/search?search=

### 安装

#### 有声明文件

1. 通过`package.json`文件中有`types`字段或者有一个声明文件`index.d.ts`,这种情况下不需要额外安装其他包,是最为推荐的,我们构建自己的npm包的时候,最后也将声明文件和包绑定在一起
2. 使用命令`npm i @type/xxx -D`尝试安装,若安装失败,表示没有声明文件,需要我们自行定义.一般情况下,常用的第三方库都有这个

#### 无声明文件

使用`<script>`标签引入或上述两种情况下都没有找到声明文件,需要我们自行编写,也可以去声明文件搜索小节进行搜索

#### 声明文件的管理

一般在与src同级的目录下新建`types`文件夹,将`xxx`的声明文件放在`types/xxx/index.d.ts`中,同时在`tsconfig.json`中配置`paths`和`baseUrl`字段,如:

目录结构：

```autoit
├── src
|  └── index.ts
├── types
|  └── xxx
|     └── index.d.ts
└── tsconfig.json
```

`tsconfig.json` 内容：

```js
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
这样配置过后import导入的时候会去types文件夹下找对应的声明文件
```

#### 编写声明文件

> 声明文件语法和ts语法类似,区别在于声明文件只能定义具体类型,不能定义具体实现

- 全局变量的声明文件中声明全局变量的语法:

  > **declare语法只会用于编译检查,在编译结果中会删除**

  ```js
  declare var/let/const 声明全局变量
  declare function 声明全局方法
  declare class 声明全局类
  declare enum 声明全局枚举类型
  declare namespace 声明（含有子属性的）全局对象,子属性可以不用declare定义,正常定义即可
  declare namespace jq  {
  	function ajax(methed: string): void
      const name: string
  }
  interface 和 type 声明全局类型
  ```

  - 嵌套命名空间

    ```js
    declare namespace jq {
        const name: string
        namespace fn {
            继续使用namespace进行嵌套
        }
    }
    ```

  - 声明合并

    > 想jq的jQuery对象即可以访问它的属性又可以调用`jQuery(#id)`,可以通过声明合并实现

    ```js
    declare function jQuery(name: string):viod
    declare namespace jQuery {
        function ajax(methed: string): void
    }
    ```

    其他用法下面详细讲解

- npm包中声明文件中导出模块的语法: 

  ```js
  export 导出变量
  export namespace 导出（含有子属性的）对象
  export default ES6 默认导出
  export = commonjs 导出模块
  ```

## 内置对象

js内置的全局对象在TS中可以直接当作定义好的类型进行使用

### ECMAScript内置对象

```js
const a: Boolean = new Boolean(0) 布尔对象类型
const b: Error = new Error("Error occurred") 错误对象类型
const c: RegExp = /[0-9/ 正则对象类型
const d: Date = new Date() 时间日期对象类型
```

### BOM和DOM的内置对象

```js
let div: HTMLElement = document.body DOM对象类型
let allDiv: NodeList = document.querySelectorAll("div") DOM类数组对象类型
const fn(e: MouseEvent){} 事件类型
```

### node中的ts

```js
npm install @types/node --save-dev
```

Node.js不是内置对象的一部分,如果想要使用需要安装node声明文件

## 进阶分割线

## 类型别名

使用`type`将一种类型(自定义或者自带)添加指定的别名

```js
type name = string 给string类型起一个name的别名
let a: name = "ooo"
类型别名常常用在联合类型上

let strOrNum = string | number

function fn(x: strOrNum): viod {}
```

## 字符串字面量类型

使用`type`约束字符串的取值只能是给定值中的一个

```js
type EventName = "click" | "mouseup" | "mousemove"

使用type定义了一种类型EventName这种类型的变量值只能从后面跟踪的取
```

## 元组

数组元素只能是同一种类型,元组元素可以是不同类型

```js
let arr: [string,number]
arr = ["string",1]
arr = [1,"string"] 报错:不能将number赋值给string类型
```

- 初始化时每个位置上的值类型要一一对应
- 初始化时数量也要一一对应

### 元组越界

元组的元素超出声明时的元素数量ts会限制类型为已声明类型的联合类型

```js
let arr: [string,number]
arr = ["string",1]

arr.push("string") 数组元素已经超出声明时的数量,继续添加只能添加联合类型允许的类型
arr.push(true) 报错,boolean类型不能赋值给string|number类型
```

## 枚举

枚举类型用于取值被限制在一定范围的场景,使用`enum`定义一个枚举,

> **相当于一个对象,对象的值和键相互映射,可以通过值拿到键,通过键拿到值**

```js
enum NumberType {
    one,two,three,four 这里定义的是枚举成员,也就是说该枚举的值只能是定义的这几个
}
NumberType["one"] 输出为0,默认从0开始
NumberType[0] 输出"one",相互映射
```

### 枚举的原理

相互映射的实现原理就是在对象中新增以现有的值作为键,现有的键作为值的属性: 

```js
enum NumberType {
	one,two,three,four
}
tsc会将上述代码编译为:
var NumberType;
(function (NumberType) {
    NumberType[NumberType["one"] = 0] = "one";
    NumberType[NumberType["two"] = 1] = "two";
    NumberType[NumberType["three"] = 2] = "three";
    NumberType[NumberType["four"] = 3] = "four";
})(NumberType || (NumberType = {}));

挑出来一行: 
NumberType[NumberType["one"] = 0] = "one";
可以看到,先将NumberType对象的one属性赋值为0,然后赋值表达式会返回所赋的值就变成这样了: 
NumberType[0] = "one";
这里又将Numbertype对象的0属性赋值为"one"

整个自执行函数运行完毕,NumberType这个对象就会构建称这个样子:
NumberType = {
    one: 0,
    two: 1,
    three: 2,
    four: 3,
    0: one,
    1: two,
    2: three,
    3: four
}
就将键和值相互映射起来了
```

### 默认值

> 枚举成员的默认值从0开始累加

```js
enum NumberType {
    one,two,three,four
}
NumberType["one"] 输出0
NumberType["two"] 输出1
NumberType["three"] 输出2
NumberType["four"] 输出3
```

### 初始值

> 定义枚举成员时可以赋予初始值,未赋予初始值的成员取值为: 前面紧跟的成员的值加一

```js
enum NumberType {
    one=1,
    two,
    three=9,
    four
}
这里NumberType["two"]的值就是2,NumberType["four"]的值是10
```

由于相互映射的特性,赋予初始值的时候一定要注意不能重复:

```js
enum NumberType {
    one=2,
    two=1,
    three, 这里three的值会自增为2,就与one重复了,自执行函数执行后,键为2的值就是three,将原先的one覆盖掉了
    four
}
```

### 常数项和计算所得项

枚举成员的值有两种类型: 常数项和计算所得项目

```js
enum NumberType {
	one = 1, 常数项
    two= "two".length 计算项
}
```

满足以下条件称为常数项:

```
数字字面量
引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
带括号的常数枚举表达式
+, -, ~ 一元运算符应用于常数枚举表达式
+, -, *, /, %, <<, >>, >>>, &, |, ^ 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错
```

### 常数枚举

使用`const enum`定义的枚举称为常数枚举,他与普通枚举的区别:

- 编译后会被删除
- 常数枚举中枚举成员的指不能是计算项

```js
const enum NumberTyper {
    one,two,three,four
}
let a = [NumberType.one,NumberType.two]

编译后的js为: 
let p = [0 /* aaa.one */, 1 /* aaa.two */]; 删除了定义的常数枚举
```

### 外部枚举

使用`declare enum`来定义外部枚举

## 类

TS中的类定义时可以使用三种修饰符:

- `public`: 使用public定义的属性或方法是公有的,任何地方都可以访问,方法和属性默认是公有的
- `private`: 使用private定义的方法是私有的,只能通过定义的类来访问
- `protected`: 使用protected定义的方法是受保护的,允许通过继承的子类进行访问

```js
class Animal {
	public name
    public constructor(name){
        this.name
    }
    private sex = "男"
    protected age = 20
}

class Cat extend Animal {
    constructor(name){
        super(nama)
    }
}

public: 
let animal = new Animal("小猫")
animal.name 输出小猫 public修饰的属性和方法都可以访问
private: 
animal.sex 报错 sex是private修饰的私有属性,只能通过声明属性的类进行访问
peotected: 
Cat.age 输出20,父类中使用protected修饰的属性是允许被子类访问的,
```

### 参数属性

构造函数的参数也可以使用上述的修饰符和`readonly`修饰

- 修饰符: 使用在参数中相当于声明加赋值,使代码更简介

  ```js
  class Animal {
  	constructor(public name){}
  }
  上面的写法和下面的写法是等价的
  class Animal {
      public name
      constructor(name){
          this.name = name
      }
  }
  ```

- readonly: 只能使用在属性声明,构造函数,或者索引签名中,与其他修饰符同时使用的时候,需要放在其他修饰符之后

  ```js
  class Animal {
      constructor(public readonly name){}
  }
  let animal = new Animal("小猫")
  animal.name 输出小猫
  animal.name = "小狗" 报错,不能给只读属性赋值
  ```

### 抽象类

使用`abstract`可以定义抽象类和抽象方法

- 抽象类不允许被实例化
- 继承时,子类必须实现抽象类的抽象方法

```js
abstract class Animal {
    abstract sayHi() 定义一个抽象方法,子类继承时必须实现该方法
}

父类实例化: 
let animal = new Aniaml() 报错: 抽象类不能被实例化

class Cat extends Animal {
  sayHi(){
    console.log("HI") 子类继承必须实现抽象方法
  }
}
```

### 类的类型

和基本类型声明相似,可以给一个变量声明为已经定义的类 :

```js
class Animal {
    constructor(public name){}
}
let a: Animal = new Ainmal("小猫")
```

## 接口与类

接口不仅可以作为对象的描述也可以作为类的抽象.

在类中使用接口称为对接口的实现,使用`implements`关键字实现接口

```js
interface alert {
  alert: () => void,
}
// 类实现接口
class Door implements alert {
  constructor(public name:string){}
  alert(){
    console.log("警告")
  }
}

interface open {
	do: () => viod
}

//一个类实现多个接口
class Door impements alert,open {
    alert(){},
    do(){}
}
```

接口对于类,相当于将不同类的公共的属性或方法提取出来,举个例子: 门是一个类,防盗门是一个子类,如果防盗门有一个报警功能,可以简单的在子类中添加报警方法,这时候有另一个车类,也有报警功能,我们就可以将这个报警功能提取出一个接口,让这两个类来分别实现这个接口,提高面向对象的灵活性

### 接口继承接口

```js
interface Alarm {
    alert(): void;
}

interface LightableAlarm extends Alarm {
    lightOn(): void;
    lightOff(): void;
}

LightableAlarm接口上就有了三个方法: alert,lightOn,lightOff
```

### 接口继承类

```js
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 泛型

泛型是指在定义接口函数,接口或者类的时候,预先不指定具体的类型,而在使用的时候在指定类型的一种特性

结合例子来理解:

实现一个函数,这个函数接收两个参数长度和任意值,要求可以创建一个指定长度的数组,同时将每一项都填充一个任意值

```js
function createArr<T>(length: number,content: any): Array<any>{
    let result = []
    for(let i = 0; i < length; i++){
        result[i] = content
    }
}
```

上面我们虽然实现了这个函数,但有一点不完美,这个函数返回的数组类型是`array[any]`我们希望返回的数组的类型是根据传入的元素类型进行约束的比如: 传入`number`那么输出数组就是`array[number]`类型,传入`string`那么输出数组就是`array[string]`类型,这就可以通过泛型实现: 

```js
function createArr<T>(length: number,content: T): Array<T> {
    .....
}
中第一个<T>就是声明的泛型,后面相当于赋值和使用
```

上述代码中`T`表示`content`的输入类型,根据类型推断输入类型是什么`T`就是什么类型,那么函数输出类型中`Array<T>`就是对应的类型

### 多个类型参数

对于多类型参数可以定义多个类型参数

```js
function swap<T,U>(tuple: [T,U]): [U,T] {
    return [tuple[1],tuple[0]]
}
swap([7,"seven"])输出: ["seven",7]
```

### 泛型约束

在函数内部使用泛型变量的时候,由于事先不知道它的那种类型,所以不能随意的操作它的属性和方法

```js
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}
由于不知道arg的具体类型是什么,所以ts不能确定arg有length属性
// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```

#### 添加泛型约束

定义一个接口,用这个接口约束参数应该具有什么属性或方法,定义的泛型继承这个接口,这个泛型约束的变量就必须包含接口描述的属性和方法

```js
interface A {
  length: number
}

function ff<T extends A>(c: T):T {
  return c
}

let bbb = {
  length: 1,
  name :"o"
}
ff(bbb)
```

#### 不同场景应用泛型

- 泛型接口

  ```js
  interface CreateArrayFunc {
      <T>(length: number, value: T): Array<T>;
  }
  将泛型提前到接口名上
  interface CreateArrayFunc<T> {
      (length: number, value: T): Array<T>;
  }
  ```

- 泛型类

  ```js
  class GenericNumber<T> {
      zeroValue: T;
      add: (x: T, y: T) => T;
  }
  ```

  