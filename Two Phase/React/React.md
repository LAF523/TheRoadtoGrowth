# React

## 起源和特点

> react是facebook工程师在2013年开源的前端渲染框架

- 声明式
- 组件化
- 跨平台
- 虚拟DOM

### 声明式

> 通过jsx实现声明式编写UI,通过js实现使用js实现创建和管理view

```js
页面插入一个元素
传统命令式编程方式需要四步:
获取容器 创建标签 添加标签内容 插入容器
let root = document.querySelector("#root")
let div = document.createElement("div")
div.innerHTML = "内容"
root.append(div)
声明式编程:
const element = <div className="wrap">内容</div>
root.render(element)
```

### 组件化

> 将页面封装成功能独立,逻辑完整,可高服用的单元

### 跨平台

> 支持PC,APP,服务端渲染

## React环境搭建

```js
因为react可以跨平台所以他的库是按照功能分开的
<!-- React核心渲染库 -->
<script src="https://unpkg.com/react@18.0.0/umd/react.production.min.js" crossorigin></script>
<!-- react dom渲染库 -->
<script src="https://unpkg.com/react-dom@18.0.0/umd/react-dom.production.min.js" crossorigin></script>
<!-- 渲染jsx语法 -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

## React三个API

### createElement()

> 创建并返回指定类型的新**React**元素

```js
React.createElement(type,[porps],[..children])
    type:类型参数,可以是元素标签如div span也可以是React组件类型,或者是ReactFargment
    porps:属性对象:注意:类名用className,避免与es6语法class冲突,事件名用小驼峰:onClick,onMove等
    children:其余参数为元素内容,可以是文本,react组件

例:
//创建组件
const ele = React.createElement("div",{
  className: "test",
  onClick: ()=> {
    console.log("点击")
  }
},"点击")
```

### createRoot()

> 根据容器创建一个React根实例并返回,根实例可以用来将react组件渲染到DOM中,是react16.4新加的

```js
let root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(react元素)
出了render()方法还支持其他方法:'
unmount()卸载
```

### render()

> 渲染react元素到指定根元素

## JSX渲染规则

> jsx文件提供了声明式UI编程的方式,其原理就是通过**Babel.js**将jsx语法转换成React基础ApI创建React组件的方式
>
> ```js
> 如: const h1 = <h1></h1>
> babel转换后: const h1 = React.createElement("h1",null,null)
> ```

**注意**: html文件引入babel后,在script中使用jsx语法需要在script标签中添加`type = "text/babel"`属性

### 1.不需要加引号

> jsx语法中,声明元素不需要加引号,直接书写标签

```jsx
const head = <head><ul><li>这是一个li</li></ul></head>
```

### 2.严格区分大小写

> jsx中html标签名必须**小写**,React组件名称必须首字母**大写**,

### 3.jsx标记必须闭合

> html标签和react组件标签都必须闭合

### 4.支持插值表达式

> 语法: {}
>
> 表达式内容: 
>
> 1. 变量
> 2. 运算
> 3. 函数调用
> 4. Boolean,null,undefined,symbol是合法的到那时不会渲染
> 5. 对于存在即生效的属性: disabled={true},插值内容为true即生效,为false不渲染

### 5.事件属性必须驼峰命名

```jsx
const button = <button onClick = {alert(1)}></button>
此处事件必须用驼峰
```

### 6.类名使用className

> 设置calss属性只能使用className,目的是与js中的类区分开

### 7.style属性值必须是对象

```jsx
const button = <button style = {{key: value}}></button>
```

### 8.只能有一个根标签

> 与vue 的template类似,内部只能有一个根标签

```jsx
正确: const head  = <head>
      	<main>
          
          </main>
          <section>
          
          </section>
      </head>
错误: const head = <head></head><main></main><section></section>
在工程中可以使用空标签达到相同的效果:
return (
	<>
    <div></div>
    <div></div>
    </>
)
```

### 列表渲染

> 原理:构建包含jsx语法的数组,将数组放在插值表达式中渲染
>
> ```jsx
> const arr = [
>     <li>这是第一v额</li>,
>     <li>这是第一v额</li>,
>     <li>这是第一v额</li>
> ]
> const ul = <ul>{arr}</ul>
> ```

正常实现:

```jsx
const arr = [1,2,3,4,5,6]
const ul = <ul>
      	{
              arr.map(item => return <li key= {item.id}>{item}</li>)
          }
      </ul>
**利用数组方法,返回一个构建好的数组常用的方法还有: filter,reduce
```

#### 唯一key

> 与vue相同,为了方便diff算法更新对比新旧DOM,需要给列表元素加上**唯一且不变**的key

```jsx
arr.map(item => return <li key= {item.id}>{item}</li>
```

### 条件渲染

- 三目运算实现

  ```jsx
  <head>{result ? <span>正确</span> : <span>错误</span>}</head>
  ```

- 短路运算符实现

  ```jsx
  <head>{result && <span>正确</span>}</head>
  ```

- 函数返回实现: 放一个函数通过条件控制返回的结果

  ```jsx
  const fun = (result) => {
      if(result){
          return <span>正确</span>
      }
      return <span>错误</span>
  }
  const head =<head>
            {
                fun(true)
            }</head>
  ```


## React CLI

> 什么是react脚手架: 脚手架内置了Babel,webpack,eslint.jest,webServer等工程化工具链以及react,react-dom,redux,react-redux等react核心库,只用通过一个命令就可以快速生成react项目

### 初始化项目

#### 传统方式

> 需要全局安装cli,占用电脑内存空间

1. 全局安装cli

   `npm i create-react-app -g`

2. 使用脚手架生成项目

   `create-react-app 项目名称`

3. 启动项目

   `npm start 运行项目`

   `npm bulid 打包项目`

   `npm  test 测试项目`

#### 推荐方式

> npx会先下载cli,然后通过cli生成项目,生成完毕后自动删除下载的cli,节省内存空间

`npx create-react-app 项目名称`

#### 插件安装

- JS JSX Snippets   jsx代码提示与快捷生成

- Simple React Snippets  react代码提示快捷生成 

配置

```json
 "emmet.triggerExpansionOnTab": true,
  "emmet.showAbbreviationSuggestions": true,
  "emmet.includeLanguages": {
    // jsx的提示
    "javascript": "javascriptreact",
    "vue-html": "html",
    "vue": "html",
    "wxml": "html"
  },
```

### React组件

> 所谓组件就是封装起来的具有独立功能的UI部分.React推荐以组件的方式重新思考UI构成,将UI上每一个功能相对独立的模块定义成组件,然后通过将小的组件通过组合嵌套的方式构成大组件,最终完成UI的整体构建

#### 开发一个组件的步骤

1. 引入核心模块

   ```js
   import react from 'react';
   ```

2. 构建类组件或者函数组件

3. 导出组件

**注意点: 组件命名必须首字母大写,且和文件名称保持一致**

**组件特征**

1. 可组合: 一个组件易于和其他组件一起使用,或者嵌套使用
2. 可重用: 每个组件都是功能独立,可以被重复使用
3. 可维护: 每个组件只包含自身的逻辑,更容易被理解和维护

#### 类组件

> 声明一个类,并且继承`React.component`类,组件的属性和方法就定义为类的属性和方法,类必须有一个`render()`方法,他返回的渲染的内容

```js
import React, {component} from 'react'
class Button extends componebt {//定义一个类组件
    render(){
        return(
        	<button>这是一个按钮</button>
        )
    }
}
export default Button //导出组件,外部引入就可以使用了
```

##### 类组件中绑定事件

> 在类组件中要注意this问题,具体见下文实例:

```js
import React, {component} from 'react'
class Button extends componebt {//定义一个类组件
    clickHandler(){
        console.log(this)
    }
    render(){
        return(
        	<button onClick={this.clickHandler}>
        )
    }
}
点击按钮打印this是undefined,原因: 在原生写法中,给事件绑定函数,事件触发时this指向的是window如:
<button onclick="demo()">dianji</button>
<script>
function demo(){
  console.log(this)//这里打印的是window对象,
}
</script>
而在react中babel严格模式下就指向了undefined
```

- 解决方式1: 使用class firld的方式(**推荐**)

  > 使用箭头函数的形式,js中this是在运行时确定的,箭头函数可以将this固定在定义时的外层,也就是组件实例

  ```js
  import React, {component} from 'react'
  class Button extends componebt {//定义一个类组件
      clickHandler = () => {
          console.log(this)
      }
      render(){
          return(
          	<button onClick={this.clickHandler}>
          )
      }
  }
  ```

- 解决方式2: bind

  > 使用bind在绑定事件的时候将this绑定在组件实例上

  ```js
  import React, {component} from 'react'
  class Button extends componebt {//定义一个类组件
      clickHandler(){
          console.log(this)
      }
      render(){
          return(
          	<button onClick={this.clickHandler.bind(this)}>
          )
      }
  }
  ```

- 解决方式3

  > 在jsx事件中包一层箭头函数,将this指定在箭头函数外层的组件实例上,jsx括号中{}的this是组件实例

  ```js
  import React, {component} from 'react'
  class Button extends componebt {//定义一个类组件
      clickHandler(){
          console.log(this)
      }
      render(){
          return(
          	<button onClick={()=>{this.clickHandler()}}>
          )
      }
  }
  ```

##### 类组件事件传参

1. 通过箭头函数

   ```js
   import React, {component} from 'react'
   class Button extends componebt {//定义一个类组件
       clickHandler(canshu,e){
           console.log(this,canshu,e)
       }
       render(){
           return(
           	<button onClick={(e)=>{this.clickHandler("参数",e)}}>
           )
       }
   }
   ```

2. 通过bind

   ```js
   import React, {component} from 'react'
   class Button extends componebt {//定义一个类组件
       clickHandler(canshu){
           console.log(this,canshu,e)
       }
       render(){
           return(
           	<button onClick={this.clickhandler.bind(this,"canshu")}>
           )
       }
   }
   bind会将参数放在第一个,默认参数e会排在最后
   ```

#### 函数组件

> 编写函数,函数名就是组件名称,函数return值就是要渲染的元素,如果返回多行需要加括号()
>
> **与类组件不同的是函数组件中不需要注意this问题**

```js
export default function MyButton() {
  let type = "函数式组件"
  return (
    <>
      <button>{type}</button>
      <p>zhehsimaioshu</p>
    </>
  )
}
```

##### 函数式组件绑定事件

> 两种定义函数的方式都可以

```js
export default function MyButton() {
  let type = "函数式组件"
  // function clickHandler(){
  //   console.log(this,type)
  // }
  let clickHandler = ()=> {
    console.log(this,type)
  }
  return (
    <>
      <button onClick={clickHandler}>{type}</button>
      <p>zhehsimaioshu</p>
    </>
  )
}
```

##### 函数式组件事件传参

> 通过箭头函数
>
> 通过bind

```js
export default function MyButton() {
  let type = "函数式组件"
  function clickhandler(){
    console.log("点击了按钮")
  }
  let clickHandler = (canshu)=> {
    console.log(canshu,type)
  }
  return (
    <>
    {/* 传参第一种方式 */}
      {/* <button onClick={() => {clickHandler("camshu")}}>{type}</button> */}
      {/* 第二种传参方式 */}
      <button onClick={clickHandler.bind(null,"camshu")}>{type}</button>
      <p>zhehsimaioshu</p>
    </>
  )
}
```

#### 阻止默认事件

> 通过事件对象,e.preventDefault();

#### 组件状态State

> State是组件当前状态,是一个对象,根据State决定UI渲染,状态改变会自动调用render()函数重新渲染

##### 初始化/读取State

> 在组件中定义state对象,作为状态机,通过this.state读取

```react
import react,{component} from 'react'

class Button extends component {
    state: {
        count: 0
    }
	render(){
        return(
            <button>{this.state.count}</button>
        )
    }
}
```

##### 修改State

> **在React中状态具有不可变性,不能直接修改state,只能通过setState方法修改**,

**react中State的状态是不可变的,当State中的值需要修改的时候,我们应该创建一个新的状态覆盖掉原来的状态,而不是修改原来的状态**

语法:

```react
this.setSate({要修改的数据,该对象的修改会合并到state上})
例如:
this.setState({
    count: this.state.count + 1;//修改state中count的值,为原来的值+1
})
```

setState的作用:

```react
1.修改state中的状态
2.触发render()函数重新渲染
```

setState的参数:

```react
this.setSate(obj/fun[,fun])
setSate有两个参数:第一个参数可以是对象也可以是函数,第二个参数是函数,
```

- 第一个参数为对象

  ```react
  第一个参数为obj时:
  	this.setState({
          count: this.state.count + 1;//修改state中count的值,为原来的值+1
      })
      console.log(this.state.count)
  	第一个参数为对象,修改后会覆盖掉原来的值
  注意:
  1.上述修改后立即获取修改的值,输出的还是原来的值:这是因为setState是异步的,执行后并非直接修改State中的值,而是将修改排入队列中,等到线程空闲时才会更新数据,当需要立即获取修改后的状态可以通过第二个参数在回调函数中获取
  2.当多个setState一起修改时:
  	this.setState({
          count: this.state.count + 1;//修改state中count的值,为原来的值+1
      })
      this.setState({
          count: this.state.count + 1;//修改state中count的值,为原来的值+1
      })
      this.setState({
          count: this.state.count + 1;//修改state中count的值,为原来的值+1
      })
  最后结果count并没有加3,而是加1,原因: 
  	1.react更新数据时,会合并多次操作:
          this.setState({
              count: 2
          })
          this.setState({
              count: 3
          })
          this.setState({
              count: 1
          })
  	上述操作,react会进行合并,最后count的值是1
      2.React中函数更新是异步的,第一个setSate执行后,this.state.count还是原来的值,那么下面的赋值都是重复的拿原来的值进行赋值
  ```

- 第一个参数为函数

  ```react
  this.setState((state,porps) => {
      console.log(state.count)//输出上一个setState修改后的值
      reutrn {
          这里修改state
      }
  })
  回调函数有两个参数: state 是上面修改过的state的副本,也就是说可以在这个回调函数中立即拿到修改的值
  该回调函数return一个对象,这个对象就是修改后的state
  
  函数执行规则: 
  在上一个setState执行完毕后,render()渲染之前
  this.setState({
    count: 3
  })
  this.setState((state) => {
    console.log("回调执行",state.count) //输出3
  })
  this.setState({
    count: 4
  })
  ```

- 第二个参数

  ```react
  this.setState({
      count: 2
  },()=>{
      console.log(this.state.count)//输出2,这里也能立即拿到修改后的state
  })
  函数执行时间: 
  在render()函数渲染之后执行
  ```

##### State特点总结

1. State的更新是异步的: 同步State防止多余的操作,在线程空闲时执行修改,优化性能
2. 第一个参数是对象: 会把多个setState合并成一个调用
3. 第一个参数是函数: 可以通过参数立即获取到上一个setState修改的值,执行时间是在上一次SetState后,render之前
4. 第二个参数: 可以立即获取到修改后的值,执行时间在render之后
5. **react中State的状态是不可变的,当State中的值需要修改的时候,我们应该创建一个新的状态覆盖掉原来的状态,而不是修改原来的状态**

##### 修改引用数据类型

> **总体思想:拷贝原来的state中的状态,修改后,对state重新赋值,覆盖掉原来的state**

- 修改数组

  ```react
  增加数组元素
  1.解构(推荐最常用):
  this.setState({
      arr: [...this.state.arr,"new1","new2"]
  })
  2.concat
  this.setState({
      arr: this.arr.concat(['new',"new"]),
      arr: this.arr.concat("new")
  })
  删除数组元素:
  	思路:
  	对数组进行拷贝(深浅拷贝,切断与this.state的联系)
      在拷贝的数组上操作
      之后将数组重新赋值给State
      举例子:(数组内部无引用类型的情况)
  	let newArr = [...this.state.arr];
  	newArr.splice(1,2)
  	this.setState({
          arr: newArr
      })
  其他处理:
  使用不修改原数组且返回新数组的方法:filter,map,reduce,slice等
  ```

- 修改对象

  ```react
  添加对象属性:
  1.解构
  this.setSate({
  	obj: {...this.state.obj,name: "新增属性"}
  })
  2.Object.assign()
  this.setState({
      obj: Object.assign({},this.state.obj,name:"新增属性")//为什么assign的第一个值是空对象而不是this.state.arr?
      因为本质上assign是对第一个属性直接操作,如果第一个是state就直接对state直接操作了,违反了react state的不可变性,
  })
  删除对象属性
  1.解构(最常用)
  let {name,...newObj} = this.state.obj
  this.setState({
      obj: newObj//这里删除了name属性之后覆盖原来state中的值
  })
  ```

##### 引用数据类型中还有引用数据类型

> 使用深拷贝,切断与state的联系
>
> 对拷贝后的值进行修改
>
> 覆盖原来的state

```react
使用深拷贝库lodsh
引入: import _ from 'lodsh'
_上cloneDeep(深拷贝)和clone(浅拷贝)两个方法,可以实现深拷贝和浅拷贝
```

### 组件通信

> 组件通信值指的是组件间数据的穿传递

种类包括:

- 父子传值 :props
- 兄弟传值: 通过事件总线,通过共同的父组件
- 其他组件间传值:mobx,redux,zustand

#### props

props就是自定义组件属性,通过在子组件上定义自定义属性并赋值将数据传递给子组件,子组件可以在`this.porps`上拿到

并使用

```js
父=>子:
父组件中:
	<子组件 自定义属性={值} />
子组件中:
	let {自定义属性} = this.props // this.props.自定义属性值
    
子=>父
父组件中:
	函数(参数){
        console.log(参数) //拿到子组件传递的参数
    }
	<子组件 自定义属性={函数} />
子组件中:
	this.props.自定义属性(参数)
```

##### **1.props的取值**

可以传递任意数据: 数字,布尔值,字符串,对象,数组,函数,jsx组件(传递过去就是一个虚拟的DOM)

**2.父子组件的关系**

父组件将状态传递给数组时,父组件状态改变子组件状态也会跟着改变,这是因为:*父组件状态改变会重新执行render渲染,子组件也会重新执行render渲染,但这里不必担心不必要的渲染,这里的渲染只是生成VDOM,并不是直接渲染到页面*

**3.props的不可变性**

根据**单项数据流**的要求,子组件不能修改父组件传递的props,数据从父组件=> 子组件

**4.数据来源单一原则**

设计组件时,就要确认组件的状态完全是有自身决定还是完全由其他组件的状态控制,一个组件只能有一个数据源这样直接就避免了两个组件操作同一个数据源的问题:

```js
派生state问题: 意思是组件的state是由props派生出来的
state ={
    a : this.state.a
}
这种情况下,就可能出现子组件修改state与父组件修改props产生冲突
```

##### props的默认值

如果父组件没给props赋值,那么props的值默认是**true**

```js
应用场景:
父组件: 
	<子组件 displayed />
子组件
	<div disable={this.props.isDisplayed} />
父组件中没有给displayed赋值,值会默认为true
```

##### props展开

父组件传递props时,可以将props写成一个对象,最后使用...运算符将数据解构出来

```js
父组件:
let porps = {
    a:1,
    b:2
}
<子组件 {...props} />
```

##### props.children

`this.props.children`表示使用组件标签时之间的所有内容,只要组件标签之间有内容,组件的props就有这个属性

```js
父组件
render(){
    return(
    <>
       <子组件>
        dom/react DOM/function/str/JSX/Object
        </子组件>
    </>
    )
}
子组件:
this.props.children => 获取到上述子组件标签之间的内容
```

##### children.map

专门用来循环`this.props.children`的方法,当`this.props.children`中包含多个元素时可以使用

```react
React.children.map(this.props.children,function)
```

#### props-render

是一个组件之间使用一个值为函数的prop共享代码的简单技术,简单来说就是将一个函数作为prop的值在子组件中进行使用,通过参数来共享数据

```react
场景:
三层组件,根组件和父组件都要给孙子组件传值,但是父组件中使用的孙子组件是不固定的,也就是说父组件中没有直接使用孙子组件,那么父组件如何给子组件传递值
使用prop-render技巧:

根组件中:
render(){
    return (
    <>
        <父组件  render={(msg) => (
                <孙子组件 pmsg={msg}></孙子组件>
        )}
        </父组件>
    </>
    )
}

父组件中:
render(){
 return (
            {this.props.render(父组件数据)} //执行props传递的函数
        )           
}
上述例子中,父组件未使用子组件也可以将值传递给子组件
            
            
也可以通过props.children来实现
            <父组件>
            {
                (msg) => {
                    return (
                        <子组件 pmsg= {msg}></子组件>
                    )
                }
            }
            </父组件>
```

#### props校验

- 安装`prop-types`

- 引入`import PropTypes from 'prop-types'`

- 使用:

  ```react
  假如给Tab组件添加props校验:
  Tab.propTypes = {
      参数1: PropTypes.number, //表示参数1需要是数字类型
  }
  或者:
  class Tab extends Component {
      static propTypes = {
          参数1: PropTypes.number
      }
  }
  ```

常见类型:number,bool,func,string,object,array,any

React元素类型: element

必填: `.Required`

特定的结构对象: shape({})

```react
Tab.propType = {
    参数1: PropTypes.shape({
        参数a: PropTypes.number,
        参数b: PropTypes.object
    })
}
```

#### props默认值

默认值会在undefined时生效或者prop缺失的时候生效,**但值为null的时候不会生效**

函数式组件中使用参数的默认值写法

类组件中需要定义一个静态属性defaultProps:

```react
class Tab extebds Component {
    static defaultProps = {
        参数1: "默认值"
    }
}
```

### Refs

提供一种我们直接可以获取DOM元素/React组件的方式,获取的DOM元素作为ref的current属性

#### 使用建议

尽量不使用ref,更不要使用ref进行组件通信,或者更改组件状态,这会导致组件的状态控制权混乱,不利于组件设计.下面是适用场景:

- 管理焦点,文本选择或者动画播放
- 触发强制动画
- 集成第三方DOM库

#### 使用方式

> 均针对类组件,函数式组件本身不能直接使用ref,因为函数式组件是个函数并不是组件实例

##### 第一种

通过React.createRef()

1. 创建ref

   ```react
   refInput = React.createRef()
   ```

2. 组件/DOM添加属性

   ```react
   <input ref = {this.refInput}/>
   ```

3. 使用

   ```react
   console.log(this.refInput) //current属性中包含元素
   ```

##### 第二种

通过回调

1. 添加属性

   ```react
   <input ref = {(ele)=>{ this.refInput = ele}}
   ```

2. 使用

   ```react
   console.log(this.refInput)
   ```

这种方式使用时,在组件更新过程中会被执行两次,第一次回调函数的参数是null,第二次才是DOM元素,这是因为组件渲染时不会修改原来的,会创建一个新的组件实例,所以react会清空ref并设置新的,如果组件中ref属性的回调函数是在class中定义的就不会出现这样的情况:

```react
class Bu extends Component {
    refButton = null
	fn = (ele) => {
        this.refButtn = ele
    }
    render(){
        return <Button ref={this.fn}></Button>
    }
}
```

#### ref转发

ref无法直接在函数式组件上使用,但函数式组件内部还是可以使用的,同时通过ref转发也可以实现在函数式组件上使用ref

```react
函数式组件内部使用ref
import {useRef} from "react"

let refInput = useRef(null)

<input ref={refInput}

ref转发:
const Button  = React.forwardRef((props,ref)=>{ //一个高阶函数,接收一个函数为参数并返回一个函数
    return <button ref={ref}></button>
})
创建ref
refButton = React.createRef()
使用:
<Button ref={this.refButton} />
获取:
console.log(this.refButton)
```

### 表单

#### 受控表单元素

受控表单元素是指表单元素的状态由组件的state来控制

元素的value属性,由state的值来决定,通过修改state的值来实现表元素value的值的改变

```react
class MyInput extends Component {
    state = {
        inputValue: ""
    }
	change = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    render(){
        return (
        	<input value={this.state.inputValue} onChange = {this.change} />
        )
    }
}
```

#### 常用表单元素

| 元素                  | 属性值              | 更改回调 | 回调中的值       |
| --------------------- | ------------------- | -------- | ---------------- |
| input text="text"     | value               | onChange | e.target.value   |
| input type="chechbox" | checkbox={boolean}  | onChange | e.target.checked |
| input type="radio"    | checked={boolean}   | onChange | e.target.checked |
| textarea              | value               | onChange | e.target.value   |
| select                | value="optionvalue" | onChange | e.target.value   |

#### 非受控表单元素

指手动操作DOM的方式直接获取元素的值

```react
class MyInput extends Component {
	change = (e) => {
        console.log(this.inputRef.current.vaule)
    }
    render(){
        return (
        	<input ref={(ele) => {this.inputRef = ele}} onChange = {this.change} />
        )
    }
}
```

#### 状态提升案例

> 实现汇率转换
>
> 需求: 实现美元,人民币,欧元之间的相互转换,三个输入框,选择一个框任意输入,自动在其他输入框显示转换结果,重新输入时清空输入框

```react 
import {Component} from 'react'

const EXCHANGEMAP = {
  CNY: 1,
  USD: 6.77,
  EURO: 13
}
/**
 * @message: 管道函数 从右往左执行
 * @return {function} 组合后的函数
 * @since: 2023-05-10 21:32:44
 */
function _compose(){
  let arr = Array.prototype.slice.call(arguments,0)
  arr = arr.reverse()
  return function(){
    return arr.reduce((acc,curr) => {
      return curr(acc(...arguments))
    })
  }
}
/**
 * @message: 根据汇率表将人民币转换成其他种类的货币值
 * @param {Number} value CNY值
 * @return {Obiect} 包含键值对为: 各种货币种类:值的对象 值取16位数
 * @since: 2023-05-10 20:16:24
 */
function _CNY2Every(value){
  return  Object.fromEntries(Object.entries(EXCHANGEMAP).map(([key,val]) => {
    return [key,(value / val).toString().substring(0,16)]
  }))
}
/**
 * @message: 根据汇率表将任何种类货币转换为人民币
 * @param {Number} who 货币种类
 * @param {Number} vaule 货币值
 * @return {Number} CNY货币值
 * @since: 2023-05-10 20:12:48
 */
function _every2CNY (who,value){
  return Object.fromEntries(Object.entries(EXCHANGEMAP).map(([key,val]) => {
    return [key,value * val]
  }))[who]
}

export default class Calsultor extends Component {
  state = {
    allConvert: Object.fromEntries(Object.entries(EXCHANGEMAP).map(([key,value]) => [key,""]))
  }
  timer = null;
  change = (who,val) => {
    this.setState({
      allConvert: {...this.state.allConvert,[who]: val}
    })
    clearInterval(this.timer)
    this.timer = setTimeout(() => {
      let value = val.toString().replace(/[\`\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=a-zA-Z]/,"");
      let func = _compose(_CNY2Every,_every2CNY)
      this.setState({
        allConvert: func(who,value)
      })
    },400)
  }
  focus = (who) => {
    this.setState({
      allConvert: {...this.state.allConvert,[who]: ""}
    })
  }
  render(){
    let {allConvert} = this.state
    return (<>
    <h1>汇率换算</h1>
    {
      Object.entries(allConvert).map(([key,val]) => {
        return (<div key={key}>
          {key}:&nbsp;<Input value={val} focus={this.focus.bind(null,key)} change = {this.change.bind(null,key)}/>
        </div>)
      })
    }
    </>)
  }
}
//输入框组件
class Input extends  Component {
  render(){
    let {value,change,focus} = this.props
    return (<>
    <input type="text" onFocus = {focus} value={value} onChange = {(e) => {change(e.target.value)}} />
    </>)
  }
}
```

### 组件生命周期

组件的生命周期是指组件被创建到挂载到卸载的过程,**只有类组件才有生命周期**从不同的角度可以分为三大时态和两大阶段

生命周期总览:

![image-20230514130244343](React.assets/image-20230514130244343.png)

#### 三大时态

##### 挂载时

> 组件实例初次被创建的过程

###### **constructor()**

在组件挂载之前调用,如果实现这个方法要注意以下几点:

- 如果需要访问this就使用constructor,且必须调用`super()`进行继承
- constructor可以不写,react默认添加一个空的constructor
- 如果使用了`this.props`,则必须给supper添加参数`super(props)`
- 无论是否实现constructor,在render中this.props都是默认可以使用的,这是react附带的
- 不要在constructor中调用`this.setState()`

参数:

- props: 

使用场景

- 通过`this.state`赋值初始化内部state
- 为事件处理函数绑定实例

###### **static getDerivedStateFromProps()  不常用**

在调用render之前执行,并且初始挂载和后续的更新都会被调用,必须有返回值,**返回一个对象来更新State或者返回一个null**

参数

> static getDerivedStateFromProps (nextProps,nextState)

- 更新后的state和props

使用场景

- 不推荐使用,罕见场景
- 如果需要在状态改变时执行副作用(执行动画等),可以使用`componentDidUpdate`
- 如果只是想在props更新时重新计算某些数据可以使用`memoization helper`
- 如果想在props更新时重置某些state,请考虑组件使完全受控

###### **render()**

类组件中唯一一个必须实现的方法,返回一个组件需要渲染的内容:

- 应该把它写成一个纯函数,
- 它并没有将组件渲染到页面上,而是返回需要渲染的内容,`Root.render()`才是真正的渲染
- 官网说react会随时调用render,所以不应该说render什么时候执行.一般情况下,检测到state和props改变就会执行render

参数:

> render(preProps,preState)

- preProps: 更新前的props
- preState: 更新后的state

###### **componentDidMount()**

当组件被挂载到屏幕上时进行执行,且只触发一次

- 可以获取到DOm节点
- react在调用componentDidMount时然后立即调用componentWillUnmount,然后再调用componentDidMount,为了提示逻辑是否缺失
- 尽量不要使用`this.setState`,可能导致性能问题,但某些场景下是必要的

应用场景

- 请求数据
- 发布事件
- 开启定时器

##### 更新时

> 组件在创建后再次渲染的过程

newProps,newState,foceUpdate()强制更新

###### **static getDerivedStateFromProps () 不常用**

> 详情见上述说明

###### shoudComponentUpdate() 不常用

数据更新时render之前触发,react会根据这个方法的返回值,决定是否跳过组件更新:

- 调用foceUpdate时不会触发
- 必须有返回值,默认是`true`,返回`false`跳过重新渲染
- 这个方法只用于`性能优化`的时候使用
- 返回false不会阻止子组件状态变化时的更新

参数

> shoudComponentUpdate(nextProps,nextState,nextContext)

- nextprops: 更新后的props
- nextState: 更新后的state
- nextContext: 组件将要渲染的下一个组件上下文

使用场景

- 性能优化

###### **render()**

> 详情见上述render

###### **getSnapshotBeforeUpdate() 不常用**

在render之后立即调用,可以在组件更新获取一些DOM信息,它的任何返回值都会作为`compontDidUpdate`的参数

参数

- prevProps:更新前的props
- prevState: 更新前的state

###### **componentDidUpdate()**

在render之后执行

参数

- prevProps:更新前的props
- prevState: 更新前的state
- snapshot: getSnapshotBeforeUpdate的返回值

使用场景

- 操作DOM
- 网络请求

##### 卸载时

> 组件在使用完后被销毁的过程

###### **conmponentWillUnmount()**

组件卸载前触发

使用场景

- 取消定时器
- 取消订阅
- 中止网络请求

#### 两大阶段

##### 渲染阶段"render"

> 渲染阶段会确定进行哪些更改,在此阶段React调用render然后将结果和上一次渲染结果进行比较,确定最终的渲染结果
>
> 纯净且没有副作用,可能被react随时叫停

什么叫做没有副作用: 就是说渲染阶段不会执行具有副作用的操作如:数据据获取,事件订阅或者手动改变DOM,

为什么不要有副作用:提交阶段通常会很快,但渲染阶段可能很慢,因此即将推出的concurrent模式将渲染工作分解为多个部分,对任务进行暂停和恢复操作以免阻塞浏览器,这意味着React可以在提交之前多次调用渲染阶段的生命周期的方法,或者在不提交的情况下调用他们,为了解决这个问题就需要一套异步可中断的更新方式(consurrent);来让耗时的计算让出js的执行权给优先级更高的任务,在浏览器闲置的时候在执行这些计算,多以我们需要一种数据结构来描述真是DOM和更新的信息,在适当的时候可以在内存中中断reconclie的过程 ,这种数据结构就是Fiber 

**该阶段包含这些函数**

- constructor
- static getDerivedStateFromProps ()
- shoudComponentUpdate
- render

##### 提交阶段"commit"

也叫绘制阶段,将render阶段得到的最新UI tree更新到浏览器进行DOM胡绘制

**该阶段包含这些函数**

- componentDidMount
- componentDidUpdate
- componentDidUnmout

#### 隐藏的一个阶段

##### Pre-commit 阶段

在render阶段之后commit阶段之前,可以读取 DOM。

**该阶段包含的函数**

- getSnapshotBeforeUpdate()

#### 父子组件生命周期

##### 挂载时

> 从上到下依次执行

父组件 contructor()

父组件 getDerivedStateFromProps()

父组件render()

子组件 constructor()

子组件 getDerivedStateFromProps()

子组件 render()

子组件 componentDidMount

父组件 componentDidMount

##### 更新时

> 父组件状态更更新,从上到下依次执行

父组件 getDerivedStateFromProps()

父组件 shouldComponentUpdate()

父组件 render()

子组件 getDerivedStateFromProps()

子组件 shouldComponentUpdate()

子组件 render()

子组件 getSnapshotBeforeUpdate ()

父组件 getSnapshotBeforeUpdate ()

子组件 componentDiaUpdate()

父组件 componentDidUpdate()

##### 卸载时

> 父组件卸载从上到下依次执行

子组件 componentWillUnmount()

父组件 componentWillUnmount()

### 虚拟DOM

> react核心库: 
>
> react-scripts => 提供createElement方法,将jsx转换为虚拟DOM,文件导出为React
>
> react-dom => 提供render方法将虚拟DOM渲染,并放在指定容器中,文件导出为ReactDOM

#### 整体流程: 

1. `jsx`语法通过`babel`编译为`React.createElement(type,props,...children)`的形式
2. `react`调用`createElement`方法生成虚拟DOM
3. `react`调用`ReactDOM.render(vDOM,root)`方法将虚拟DOM渲染成真实DOM

#### 实现简易版本React前提

将`react-scripts`库的版本降低到3.x.x,高版本库会自动调用`ReactDOM.render()`方法,不利于手动实现

#### 实现react.createElement方法

实际就是模拟`react-scripts`这个库,react通过该方法将jsx转换成虚拟DOM,babel转义jsx语法后会自动调用react的createElement方法,因此先新建模块`react.js`并导出`React`,在使用的页面导入后,babel运行时就会调用我们模拟的`createElement`方法了:

1. 新建:

   ![image-20230730145044393](React.assets/image-20230730145044393.png)

2. 使用:

   ![image-20230730002750722](React.assets/image-20230730002750722.png)

接下来先引入正经的react看看其虚拟DOM结构 : 

![image-20230730150737784](React.assets/image-20230730150737784.png)

知道结构后照猫画虎,实现自己的createElement方法:

1. 根据参数生成一个对象

```js
react.js
/**
 * @message: jsx转换成虚拟DOM 实现react-scripts中的方法: createElement
 * @param {*} type 标签名称
 * @param {*} props 配置
 * @param {array} children 子元素
 * @return {*}
 * @since: 2023-07-29 12:30:31
 */
function  createElement(type,props,...children){
  // 为了方便这里将原来props内的children写在了外层,对字符串和数字进行处理,标记$$type便于后面处理
  children = children.flat(Infinity).map(item => {
    if(typeof item === "object"){
      return item
    }
    if(typeof item === "string" || typeof item === "number"){
      return {
        $$type: REACT_TEXT,
        inner: item
      }
    }
    return item
  }).filter(item => typeof item !== "boolean")
  return {
    $$type: REACT_ELEMENT,
    type,
    props,
    children
  }
}
```

运行查看效果:

![image-20230730004335797](React.assets/image-20230730004335797.png)

#### 实现ReactDOM.render方法

实际模拟的时`react-dom`这个库,该方法接收两个参数: 虚拟DOM和容器元素,先新建这个模块,便于导入使用 :

1. 新建

   ![image-20230730003412053](React.assets/image-20230730003412053.png)

2. 使用:

   ![image-20230730003509590](React.assets/image-20230730003509590.png)

该方法主要做了以下事情:

1. 根据虚拟DOM的type的不同创建不同的真实DOM,包括以下几种
   1. 类组件
   2. 标签元素
   3. 文本节点
2. 给真实DOM绑定虚拟DOM中props包含的属性
   1. 事件
   2. 类名
   3. 内联属性

```js
react-dom.js
/**
 * @message: 主渲染方法
 * @param {*} tree 虚拟DOM createElement将jsx转换后的产物
 * @param {*} root 容器
 * @since: 2023-07-29 01:25:05
 */
function render(tree,root){
  let rDom = getRealDOM(tree)
  root.append(rDom)
}
/**
 * @message: 根据虚拟DOM树创建真实DOM
 * @param {*} tree 虚拟DOM
 * @return {HTMLElement} 真实DOM
 * @since: 2023-07-29 01:22:15
 */
function getRealDOM(tree){
  let rDom;
  if(tree.type?.isComponent){ //类组件
    rDom = createComRdom(tree)
    return rDom
  }
  if(tree.$$type === REACT_ELEMENT){ //react元素
    rDom = document.createElement(tree.type)
    let isHaveChild = tree.children && tree.children.length > 0
    if(isHaveChild){
      tree.children.forEach(item => {
        rDom.append(getRealDOM(item)) //有子元素递归生成真实节点
      })
    }
    rDom = addDomProps(rDom,tree.props,tree)
    return rDom
  }
  if(tree.$$type === REACT_TEXT) { //文本节点
    rDom = document.createTextNode(tree.inner)
    return rDom
  }
}
/**
 * @message: 为真实DOM添加属性
 * @param {HTMLElement} rDom 真实DOM
 * @param {Object} props
 * @return {HTMLElement} 挂载好属性的真实DOM
 * @since: 2023-07-29 01:21:51
 */
function addDomProps(rDom,props){
  delete props._self
  delete props._source
  for(let prop in props){
    if(prop.slice(0,2) === "on"){ //事件
      rDom[prop.toLowerCase()] = function(e){
        if(props[prop].cmp){
          let cmp = props[prop].cmp
          batchUpdate(cmp,props[prop],[e])
        }
      }
    }
    if(prop === "style"){ //内联样式
      Object.assign(rDom.style,props.style)
    }
    rDom[prop] = props[prop] //其他属性
  }
  return rDom
}
```

运行查看效果:

​	成功渲染:

![image-20230730004354988](React.assets/image-20230730004354988.png)

类组件的处理:

1. 类组件继承自react.Component,因此在react-scripts中定义component类
2. 类组件通过createElement方法转换后,react在其type属性赋值为定义的类组件,
3. ReacDOM.render时判断虚拟DOM时候包含`isComponents`属性,如果包含说明时类组件,走类组件转换逻辑
4. 通过type实例化类组件,调用类组件的render方法,获取到jsx
5. 将jsx转换成真实DOM

### 渲染类组件

先看一下正经的类组件虚拟DOM: 

![image-20230730005109529](React.assets/image-20230730005109529.png)

实现步骤:

1. 类组件继承自react.Component,因此在react-scripts中定义component类
2. 类组件通过createElement方法转换后,react在其type属性赋值为定义的组件类,
3. ReacDOM.render时判断虚拟DOM时候包含`isComponents`属性,如果包含说明时类组件,走类组件转换逻辑
4. 通过type实例化类组件,调用类组件的render方法,获取到jsx
5. 将jsx转换成真实DOM

在`react.js`模块中新建`Component`类,以便继承:

1. 主要包含props属性和`isCompoent`属性,后者是用来判断是否是类组件的
2. `setState`方法

```js
react.js
class Component {
  constructor(props){
    this.props = props
  }
  static isComponent = {}
  setState(newState){
    // 根据批处理开关判断是否进行批处理
    if(this.isBatchUpdate){
      this.batchUpdateArr.push(newState)
    }else {
      this.upDater(this.porps,newState)
    }
  }
//批处理相关
  upDater(nextprops,nextState){
    this.props = nextprops
    this.state = Object.assign({},this.state,nextState)
  }
}
```

`React.createElement`中添加对类组件的处理:

1. 从虚拟DOM的type中拿到类
2. 将类实例化
3. 调用实例的render方法,拿到虚拟DOM并进行渲染
4. 实现部分生命周期

```js
react-dom.js
/**
 * @message: 根据类组件创建真实DOM
 * @param {*} tree 类组件虚拟DOM
 * @return {HTMLElement}
 * @since: 2023-07-29 13:57:03
 */
function createComRdom(tree){
  const cmp = new tree.type(tree.props)
  let newState = getDerivedStateFromProps(tree.type,cmp.props,cmp.state) //第一个生命周期,在render之前执行
  Object.assign(cmp.state,newState)
  let vDom = cmp.render()
  let rDom = getRealDOM(vDom)
  addCmpInHandle(vDom,cmp)
  setTimeout(() => {
    batchUpdate(cmp,cmp.componentDidMount)//第二个生命周期,在render之后执行,这里进行了setState的批处理,详情在后面
  })
  return rDom
}
/**
 * @message: 声明周期getDerivedStateFromProps,在render之前执行
 * @param {*} cmpClass 组件类
 * @param {*} props 当前props
 * @param {*} state 当前state
 * @return {Object} 更新的state
 * @since: 2023-07-29 13:57:54
 */
function getDerivedStateFromProps(cmpClass,props,state){
  return cmpClass.getDerivedStateFromProps ? cmpClass.getDerivedStateFromProps(props,state) : {}
}
```

### 批处理机制

#### 前置概念

**批处理机制(异步更新state)是指: react会合并同一行为过程中所有的`setState`结果,最终只对state进行一次修改,用以提升数据处理性能**

```
异步的现象: 
state = {
	num: 1
}
handlerCick = () => {
	this.setState({
		num: 2
	})
	cosnole.log(this.state.num) 这里输出的num还是1,但内部已经变成4了
	this.setState({
		num: 3
	})
	cosnole.log(this.state.num) 这里输出的num还是1,但内部已经变成4了
	this.setState({
		num: 4
	})
	cosnole.log(this.state.num) 这里输出的num还是1,但内部已经变成4了

}
```

**全自动状态:**

react中所有的行为更新state时都会通过批处理进行合并,数据是异步更新的效果

**半自动状态: **

react中异步,原生绑定事件为半自动状态,数据实时更新

react中合成事件,生命周期为全自动状态,数据异步更新

#### 什么情况下是全/半自动状态?

1. react版本小于18或者版本大于等于18但入口API没有使用`ReactDOM提供的CreatRoot`API时,`setState`是半自动状态
   - react可以控制的行为: 合成事件,生命周期,采用的是批处理,数据进行异步更新
   - react无法控制的行为:  原生绑定事件,异步(宏任务,微任务)无法采用批处理,数据实时更新
2. react版本大于等于18且入口API使用的是`ReactDOM提供的CreateRoot`API时,`setState`是全自动状态
   - 任何行为都采用批处理,数据全部是异步更新

**ReactDOM.createRoot就是react18新增的**

#### 具体实现

##### 生命周期中的批处理:

1. 给实例添加一个标记,用来判断是否需要批处理
2. 一个state批处理队列,存储setState的结果
3. 将队列中的结果合并

```js
react-dom.js
// 生命周期setState批处理
function batchUpdate(cmp,fn,args){
  cmp.isBatchUpdate = true //实例挂载标记
  cmp.batchUpdateArr = [] //挂载批处理队列
  fn && fn.apply(cmp,args) 执行生命周期
  let nextState = cmp.batchUpdateArr.reduce((acc,curr) => { //合并state
    return {...acc,...curr}
  },{})
  cmp.isBatchUpdate = false //关闭标记
  cmp.upDater(cmp.props,nextState) //更新实例中的state
  let newVDom = cmp.render() //重新生成虚拟DOM
  console.log(newVDom)
}
```

##### 合成事件中的批处理:

react中合成事件是通过发布订阅模式,通过代理监听变化的,这里使用一点'奇技淫巧'来简单实现

1. 在`createComRdom`在渲染类组件实例中将虚拟DOM和类组件实例,传递过来
2. `addCmpInHandle`递归获取所有的事件,并在事件上挂载上实例,方便将事件进行批处理
3. 在`addDomProps`中对事件进行`batchUpdate`处理

```js
react-dom.js
//递归获取虚拟DOM上的所有事件,并且在事件函数上挂载组件实例
function addCmpInHandle(vNode,cmp){
  rucur(vNode)
  console.log(handles)
  function rucur(vNode){
    let {props = {},children = []} = vNode
    for(let key in props){
      if(key.slice(0,2) === "on" && typeof props[key] === "function"){//获取所有绑定的事件进行处理
        props[key].cmp = cmp
      }
    }
    if(children.length > 0){
      for(let item of children){
        rucur(item)
      }
    }
  }
}
```





