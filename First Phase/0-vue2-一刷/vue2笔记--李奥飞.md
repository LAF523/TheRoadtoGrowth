

## 1. node安装及配置

##### 1.1 安装

​	1.1.1 下载

​		[下载地址](http://nodejs.cn/)

​	1.1.2 检查

​		cmd输入```npm -v node -v```检查版本

##### 1.2 配置

​	1.2.1 配置缓存和模块下载路径

- 在nodejs目录下新建两个文件夹:node_global和node_cache
- cmd输入:npm config set cache "新建node_cache路径"
- cmd输入:npm config set prefix "新建node_global路径"
- 用户变量更改为:node_global路径地址
- 系统变量新建:变量名NOD_PATH值node_global路径地址+node_module

​	1.2.2 npm常用命令:

```
npm install(i) 模块名 -g    全局安装该模块
npm list -g                查看所有全局安装的模块
npm list 模块名             查看某个模块版本号
npm i -save 模块名          在package文件的dependencies节点写入依赖即运行时依赖
npm i -save-dev 模块名      在package文件的devDependencies节点写入依赖即开发时依赖
```

## 2. vue2

##### 2.1了解vue

vue[官网](cn.vuejs.org)

​	特点:组件化模式.提高代码复用率,非命令式(声明式)编码,无需直接操作DOM.虚拟DOM+Diff算法尽量复用节点

开发环境搭建

​	文件引入或者用node创建

消除两个警告

​	官网下载chrom vue插件

​	Vue.config.productionTip = false//阻止vue在启动的时候产生提示

##### 2.2 vue实例

​	2.2.1  

```
new vue({
	el:"css选择器字符串",//用于指定当前vue实例服务哪个容器
	data:{             //用于存储数据,为el指向的容器使用,里面的值都会成为vue实例的属性
		name:值.,
		age:值,
	}
})//.mount("#root")el的另一种写法
```

​	2.2.2

```
el和data的两种写法:
el:1.el:"css选择器字符串"2.x.$mount('css选择器字符串')x为vue实例
data:
1.对象式:data:{}
2.函数式:data:function{
consloe.log(this)//此时this指向vue实例,由vue管理的函数一定不要写箭头函数,否则this会指向window
name:值,
}
```

##### 2.3 模板语法

​	2.3.1

```
插值语法:{{xxx}},xxx为js表达式,用于解析标签体的内容.它可以获取vm上的所有属性
指令语法:v-bind,v-moudel等等,用于解析标签(包括标签属性,标签体内容,绑定事件)如:v-bind:href="js表达式"可以直接读取data中的所有属性
```

##### 2.4 数据绑定

​	2.4.1 单向数据绑定v-bind:

```html
<input type="text" v-bind:name="name">简写:name="name"(引号里边的内容当作js表达式解析)
new vue({
	el:"css选择器字符串",
	data:{
		name:值,
	}
})
```

​	2.4.2 双向数据绑定v-model:只能用于表单元素绑定(带有vulue属性的元素)

```javascript
<input type="text" v-moudel:vulue="name">简写v-moudel="name"
new vue({
	el:"css选择器字符串",
	data:{
		name:值,
	}
})
```

##### 2.5 MVVM模型

![image-20210818093459435](../images/image-20210818093459435.png)

所以经常使用vm来接收vue实例

![image-20210818093908486](../images/image-20210818093908486.png)

##### 2.6 数据代理

​	2.6.1 object.definePerty方法(更改对象属性)

```javascript
<script type="text/javascript">
    // 要求:将number的值赋给person的age属性并随其中一者变换而变化
    let number = 18
    let person = {
        name:"xiaoli",
        sex : "男",
    }
    //第一个参数对象,第二个参数属性,第三个属性配置项
    Object.defineProperty(person,'age',{
        // value:19,
        // enumerable:true,//控制属性是否可以枚举,默认false
        // writable:true,//控制属性是否可以修改,默认值false
        // configurable:true//控制属性是否可以删除,默认值是false


        //当age属性被访问时,get函数(getter)就会被调用且返回值就是age的值
        //简写:get(){}
        get:function(){
            return number
        },
        //当有人修改age属性时,set函数(setter)就会被调用且传入的值就是修改的值
        set(value){
            console.log(value),
            number = velue//将number与age修改的值相关联
        }
    })
    </script>
```

​	2.6.2 vue中的数据代理

```javascript
<body>
    <!-- 
        1.vue中的数据代理:
            通过vm对象代理data对象的属性操作
        2.好处:
            更加方便的操作data中的数据
        3.原理:
            使用Object.defineProperty(代理对象,代理属性,配置),
            把data中的所有属性都添加到vm上为每个添加的属性都生
            成对应的getter和setter,通过getter和setter内部去操作data中的值
     -->
    <div id="root">
        <h2>hello,{{name}}</h2>
        <h2>我在{{adress}}</h2>
    </div>
    <script type="text/javascript">
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            name:'小里',
            adress:"无锡"
        }
    })
    </script>
</body>
```

![image-20210818142128219](../images/image-20210818142128219.png)

​		原理图示:

![image-20210818142328537](../images/image-20210818142328537.png)

##### 2.7 事件处理

​	2.7.1 基本使用

- 使用v-on:xxx或者@xxx,绑定事件,其中xxx是事件名

- 事件的回调需要配置在methods对象中,最终会在vm上

- ```@click="demo"和@click="demo($event)"```效果一致,但后者可以传参.无参数时默认传递事件对象

- @click="可以写一些简单的语句如三元运算符"

- ```javascript
  <body>
      <div id="root">
          <button @click="showIn">点我提示信息</button>
          <button @click="showIn1(66,$event)">点我提示信息</button>//加括号可以传递参数,默认传递事件对象
      </div>
  </body>
  <script type="text/javascript">
      Vue.config.productionTip = false
      new Vue({
          el :"#root",
          data:{
              name:'xiaoli'
          },
          methods: {
              showIn(a){
                  alert(a)
              },
              showIn1(a,b){
                  console.log(a,b)
              }
          }
      })
  ```

​    2.7.2 事件修饰符

```javascript
<body>
    <!-- 
        vue中的事件修饰符:
        *prevent:阻止默认事件
        *stop:阻止冒泡事件
        *once:事件只触发一次
        capture:使用事件捕获模式
        passive:事件的默认行为立即执行
        self:只有event.target是当前操作的元素时才触发
        
        ***修饰符可以连续使用
     -->
    <div id="root">
        //不添加.prevent点击后执行默认行为打开链接,.prevent阻止默认行为
        <a href="http://www.baidu.com" @click.prevent="showa">点我</a>
    </div>
</body>
    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el : "#root",
            methods : {
                showa(){
                    alert("aaa")
                }
            }
        })
    </script>
```

​	2.7.3 键盘事件

- @keydown:绑定按下触发的事件

- @keyup:绑定按下松开后触发的事件

- ```javascript
  <body>
      <div id="root">
          <!-- 
              vue中常用的按键别名:
                  回车=>enter
                  删除=>delete
                  退出=>esc
                  换行=>tab
                  上下左右=>up,down,left,right
              未提供别名时,可以使用按键原始的key值绑定,但注意
              要转为kebab-case例如:CapsLock=>caps-lock
  
              系统修饰键(用法特殊):ctrl,alt,shift,meta
                  配合keydown使用:正常触发
                  配合keyup使用:按下修饰键的同时再按下其他键随后释放其他键,事件才被触发
           -->
          <!-- 添加键盘修饰符时只有按下enter时才会触发事件 -->
          <input type="text" @keyup.k="show">
          <input type="text" @keyup="show">
      </div>
  </body>
      <script type="text/javascript">
          Vue.config.productionTip = false
          new Vue({
              el :'#root',
              data:{
  
              },
              methods:{
                  show(e){
                      console.log(e.target.value)
                  }
              }
          })
      </script>
  ```

##### 2.8 计算属性与监视

​	2.8.1 姓名小案例:输入框与展示实现数据联动

```javascript
methods方法:当data中的数据发生变化时,vue会重新解析模板,便可以重新调用函数实现实时更新
<body>
    <div id="root">
        姓:<input type="text" v-model="firstname"><br>
        名:<input type="text" v-model="lastname"><br>
        全名:<span> {{allname()}} </span>
    </div>
</body>
<script type="text/javascript">
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            firstname:"",
            lastname:"",
        },
        methods:{
            allname(){
                return this.firstname+"-"+this.lastname
            },
        }
    })
```

2.8.2 计算属性

​	定义:要用到的属性不存在,需要通过已有的属性计得来

​	原理:底层借助Object.defineproperty的get和set

​	初次读取时会执行一次,

​	优势:与methods方法相比,内部有缓存机制,效率会更高

​	备注:计算属性最终会出现在vm上,直接读取就可以了,如果计算属性要修改必须写setter

```javascript
<body>
    <div id="root">
        姓:<input type="text" v-model="firstname"><br>
        名:<input type="text" v-model="lastname"><br>
        全名:<span> {{allname}} </span>
    </div>
</body>
<script type="text/javascript">
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            firstname:"",
            lastname:"",
        },
        //计算属性需要专门写在computed中
        computed:{
            allname:{
                //调用时机:当allname被初次访问时或者所依赖的数据发生变化时
                get(){
                    //此处的this是vm
                    return this.firstname+"-"+this.lastname
                }
            }             
        }
    })
</script>
```

2.8.3 监视属性

- Vue实例会在实例化时调用`$watch()`,遍历watch对象的每一个proterty,进行观察

- 监视属性watch:

- 当被监视的属性变化时,回调函数自动调用,进行相关操作

- 监视的属性必须存在.才能进行监视

- 监视属性的两种写法:

  - new Vue时传入watch配置

  - vm.$watch监视

    ```javascript
    <script type="text/javascript">
        Vue.config.productionTip = false
        const vm = new Vue({
            el:"#root",
            data:{
                firstname:"",
                lastname:"",
                number:{
                	a:1,
                	b:2
                }
            },
            watch:{
            	frirstname:{
            		immediate:true//初始化时让handler调用一下
            		handler(newvalue,oldvalue){
            			当firstname被修改时调用该函数,两个参数分别是改变后 的值和改变前的值
            		}
            	}
            }
            watch:{
            	//监视多级结构中某个属性的变化
            	'number.a'{
            		handler(newvalue,oldvalue){
            			alart(a被改变了)
            		}
            	}
            }
            watch:{
            	number:{
            		deep:true,//深度监视,检测多级结构中的所有属性的变化
            		handler{
            			alart(number变化了)
            		}
            	}
            }
        })
    </script>
    ```

- 两者的比较:
  
  - 变量定义不同
    - 计算属性变量在computed中定义,监视属性是已经在data中定义的变量
  - watch可以进行深度监听,监听对象的变化
  - watch监视容易造成代码重复,能用computed就不用watch
  - watch可以进行一步操作

##### 2.9 绑定clss和style

​	2.9.1 绑定class

- 字符串写法:```<div class="类名1" :class="data中的键">```通过改变data中对应键的值改变类名
  - 适用于:样式的类名不确定,需要动态指定
- 数组写法:```<div class="类名1" :class="classArr">```data中的classArr为:```classArr:['类名2','类名3','类名4']```通过methods中的方法操纵改变类名
  - 适用于:要绑定的样式个数不确定,名字也不确定
- 对象写法:```<div class="类名1" :class="classObj">```data中的classObj为:```classObj:{类名2:false,类名3:ture,类名4:false}```通过改变类名的值改变绑定的类名
  - 适用于:要绑定的样式个数确定,名字也确定,但需要动态指定用不用

2.9.2 绑定style

```html
<div :style="{fontSize:xxx}"或者:style[a,b]>//其中xxx为动态值,a,b为样式对象,对象的key必须是存在的css属性
```

##### 2.10 条件渲染

​	2.10.1 v-show

```
<h2 v-show="布尔值"></h2>
```

- 本质是标签的display属性none的转换控制隐藏,页面结构依然在

   2.10.2 v-if

```html
<h2 v-if="布尔值"></h2>
<h2 v-else-if="布尔值"></h2>
<h2 v-else></h2>//标签中间被打断时后面标签中的v-else-if就失效

<template v-if="布尔值">
<h2 ></h2>
<h2 ></h2>
<h2></h2>
</template>//<template>标签不影响页面结构,渲染到页面就没有了,但不能与v-show使用
```

- 本质是动态的向DOM树添加和删除节点,性能没有v-show好

##### 2.11 列表渲染

​	2.11.1 基本列表:

​				```v-for="(item,index) in xxx  :key="index"```index遍历自动生成,key为每次遍历添加唯一标识(vue中不添加:key时vue自动将遍历索引作为遍历的唯一标识),xxx有多少次就可以遍历多少次

```html
<body>
    <div id="root">
        <ul id="root">
            <!-- 遍历数组
                    man为数组元素  index为遍历索引值
            -->
            <li v-for="(man,index) of mans" :key="index">
                {{man.id}}--{{man.name}}
            </li>
            <!-- 第一个为值第二个为键第三个为次数 -->
            <h2>遍历对象</h2>
            <li v-for="(value,key,q) in car" :key="key">
                {{value}}--{{key}}
            </li>
            <!-- a为单个字符,b类似索引 -->
            <h2>遍历字符串</h2>
            <li v-for="(a,b) in char" :key="b+20">
                {{a}}--{{b}}
            </li>
            <!-- a为数字b为次数 -->
            <h2>指定次数遍历</h2>
            <li v-for="(a,b) in 3" :key="b+30">
                {{a}}--{{b}}
            </li>
        </ul>
    </div>
</body>
    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el:"#root",
            data:{
                mans:[
                    {id:'1',name:'one1'},
                    {id:'2',name:'one2'},
                    {id:'3',name:'one3'},
                    {id:'4',name:'one4'},
                    {id:'5',name:'one5'},
                ],
                car:{
                    name:"A8",
                    money:"80玩"
                },
                char:'zifuchuan'
            }
        })
    </script>
```

​	2.11.2 key的作用与原理

- 作用:
  - key是虚拟DOM的唯一标识,当状态中的数据发生变化时.vue会根据新数据生成新虚拟DOM,随后进行两个虚拟DOM的比较:
    - 若旧虚拟DOM找到了新虚拟DOM的key:
      - 若新的虚拟DOM中的内容没变,就直接使用之前的真是DOM
      - 若新的虚拟DOM内容变化,则生成新的真实DOM,随后替换掉页面中的对应的真是DOM
    - 若旧虚拟DOM中未找到与新的虚拟DOM相同的Key
      - 创建新的真实DOM,然后渲染到页面
- 用index作为key引发的问题
  - 若对数据进行逆序添加删除等破坏顺序的操作会产生没有必要的真实DOM更新,效率变低
  - 若结构中还包含输入类DOM:会产生错误的数据更新.
- ![image-20210819192615624](../images/image-20210819192615624.png)问题场景:将数组遍历到界面,并在数据后边添加输入框,当输入框有值的时候,逆序添加数组元素,遍历后出现数据不对照的问题:
- ![image-20210819192856062](../images/image-20210819192856062.png)![image-20210819192911890](C:\Users\19948\AppData\Roaming\Typora\typora-user-images\image-20210819192911890.png)

2.11.3 列表过滤(两种实现方式)

- ```filter```的使用:回调函数return过滤条件,返回满足条件的元素构成的数组
- ```sort```的使用:arr.sort((a,b)=>{return a-b升序b-a降序})

```html
<body>
    <div id="root">
        <h2>搜索</h2>
        <input type="text" v-model="keyword">
        <ul id="root">
            <li v-for="(man,index) in filmans" :key="man.id">
                {{man.name}}--{{man.sex}}
            </li>
        </ul>
    </div>
</body>
    <!-- <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el:"#root",
            data:{
                keyword:'',
                mans:[
                    {id:'1',name:'马冬梅',sex:"女"},
                    {id:'2',name:'周冬雨',sex:"女"},
                    {id:'3',name:'周杰伦',sex:"男"},
                    {id:'4',name:'成龙',sex:"男"},
                    {id:'5',name:'李连杰',sex:"男"},
                ],
                filmans:[]
            },
            watch:{
                keyword:{
                    immediate:true,
                    handler(val){
                        //filter过滤.返回符合条件的数组,return过滤条件
                        this.filmans = this.mans.filter((p)=>{
                            return p.name.indexOf(val) !== -1//返回指定字符在字符串中第一次出现处的索引,如果此字符串中没有这样的字符,则返回 -1。
                        })
                    }
                }
            }
        })
    </script> -->
    <!-- 计算属性实现 -->
    <script type="text/javascript">
        Vue.config.productionTip = false
        new Vue({
            el:"#root",
            data:{
                keyword:'',
                mans:[
                    {id:'1',name:'马冬梅',sex:"女"},
                    {id:'2',name:'周冬雨',sex:"女"},
                    {id:'3',name:'周杰伦',sex:"男"},
                    {id:'4',name:'成龙',sex:"男"},
                    {id:'5',name:'李连杰',sex:"男"},
                ],
            },
            computed:{
                filmans:{
                    get(){
                        return this.filmans = this.mans.filter((p)=>{
                            return p.name.indexOf(this.keyword) !== -1
                        })
                    },
                    set(){
                        
                    }
                }
            }
            //排列顺序,
            // arr.sort((a,b)=>{return a-b升序b-a降序})
            // computed:{
            //     filmans:{
            //         get(){
            //             const arr = this.filmans = this.mans.filter((p)=>{
            //                 return p.name.indexOf(this.keyword) !== -1
            //             })
            //             if(this.sorttype){
            //                 arr.sort((a,b)=>{
            //                     return this.sorttype === 2 ? a.age-b.age : b.age-a.age
            //                 })
            //             }
            //             return arr
            //         },
            //         set(){}
            //     }
        })
    </script>
</html>
</body>
```

##### 2.12 vue监视数据原理

- vue会监视data中所有层次的数据

- 如何监视对象中的数据:

  - 通过setter实现监视,且要在new vue时传入要监测的数据
    - 对象中后追加属性,Vue默认不做响应式处理
    - 如需给后添加的属性作响应式处理,使用下面的API
      - Vue.set(target目标,属性名称/索引,value)
      - vm.$set(target,属性名称/索引,value)

- 如何监测数组中的数据:

  - 通过包裹数组更新元素的方法实现,本质就是做了两件事:
    - 调用原生对应的方法对数据进行更新
    - 重新解析模板,进而更新页面

- 如需修改数组中的某个元素一定要用下面的方法:

  - 使用这些API:push()添加到数组最后一个,pop()删除最后一个,shift()删除第一个,unshift()添加到数组第一个,splice(起始位置,删除几个,删除后添加的元素),sort()排序,reverse()逆序
  - vue.set()或vm.$set()

  **特别注意:Vue.set()和vm.$set()不能给vm和vm的根数据对象(data)添加属性**

  ```html
  <body>
      <!-- 
          vue监视数据的原理
       -->
      <div id="root">
          <button @click = "age++">年龄加一岁</button>
          <button @click = "addsex">添加性别属性,默认值:男</button>
          <!-- <button @click = "setsex">修改性别</button> -->
          <button @click = "student.sex = 'weizhi'">修改性别</button>
          <button @click = "addfriend">在列表首位添加一个朋友</button>
          <button @click = "setname">修改第一个朋友的名字为:张三</button>
          <button @click = "addh">添加一个爱好</button>
          <button @click = "seth">修改第一个爱好为:开车</button>
  
          <h3>姓名:{{student.name}}</h3>
          <h3>年龄:{{student.age}}</h3>
          <h3 v-if="student.sex">爱好:{{student.sex}}</h3>
          <ul>
              <li v-for="h in hobby">
                  {{h}}
              </li>
          </ul>
          <h3>朋友们:</h3>
          <ul>
              <li v-for="f in friends">
                  {{f.name}}--{{f.age}}
              </li>
          </ul>
      </div>
  </body>
      <script type="text/javascript">
          Vue.config.productionTip = false
          new Vue({
              el:"#root",
              data:{
                  student:{
                      name:'tom',
                      age:18,
                  },
                  hobby:["抽烟","喝酒","烫头"],
                  friends:[
                      {name:"jerry",age:36},
                      {name:"tony",age:35}
                  ]
              },
              methods: {
                  addsex(){
                      //添加除数组
                      // this.$set(this._data.student,'sex','男')
                      Vue.set(this.student,"sex","男")
                  },
                  // setsex(){
                  //     Vue.set(this.student,"sex","女")
                  // },
                  addfriend(){
                      //
                      this.friends.unshift({name:"xiaoli",age:"22"})
                  },
                  setname(){
                      this.friends[0].name = "张三"
                  },
                  addh(){
                      this.hobby.push("添加的爱好")
                  },
                  seth(){
                      // 从0开始往后删除一个删除完之后添加后面的内容
                      // this.hobby.splice(0,1,'开车')
                      Vue.set(this.hobby,0,"开车")
                  }
              },
          })
      </script>
  </html>
  </body>
  ```


##### 2.13 表单数据收集

- ```<input type="text">```则用v-model收集的是value值,用户输入的也是value值

- ```<input type="radio">```则v-model收集的是value值,且要给标签配置value值

- ```<input type="checkbox">```

  - v-model的初始值是非数组,那么收集的就是checked值(布尔值)
  - v-model的值是数组,那么收集的就是value组成的数组

- v-model的三个修饰符:

  - lazy:失去焦点后收集数据
  - number:输入字符串转化为有效数字
  - trim:输入首尾空格过滤

- 案例:

  ```html
  <body>
      <form id="root" action="" @submit.prevent="tijiao">
          账号:<input type="text" name="" v-model.trim="biaodan.name"><br>
          密码:<input type="password" name="" v-model.number="biaodan.password"><br>
          性别:男<input type="radio" v-model="biaodan.sex" value="nan">
              女<input type="radio" v-model="biaodan.sex" value="nv"><br>
          爱好:抽烟<input type="checkbox" name="" v-model="biaodan.hobby" value="chouyan">
              喝酒<input type="checkbox" name="" v-model="biaodan.hobby" value="hejiu">
              烫头<input type="checkbox" name="" v-model="biaodan.hobby" value="tangtou"><br>
          所属校区:<select  name="" v-model="biaodan.adress">
              <option value="biejing" checked="">北京</option>
              <option value="shanghai">上海</option>
              <option value="shenzhen">深圳</option>
          </select><br>
          其他信息:<input type="textarea" name="" v-model.lazy="biaodan.msg"><br>
          <input type="checkbox" name="" v-model="biaodan.xieyi">阅读并接受<a src="#"><用户协议></a><br>
          <button>提交</button>
      </form>
  </body>
  <script type="text/javascript">
      Vue.config.productionTip = false,
      new Vue({
          el:"#root",
          data :{
              biaodan:{
                  name:"",
                  password:"",
                  sex:"nan",
                  hobby:[],
                  adress:"biejing",
                  msg:"",
                  xieyi:"",
              }
          },
          methods:{
              tijiao(){
                  console.log(JSON.stringify(this.biaodan))
              }
          }
      })
  </script>
  ```


##### 2.14 过滤器

- 对要显示的数据进行格式化后再显示(适用于简单逻辑)
  - 注册过滤器:```Vue.filter("name",callback)```或```new Vue{filters:{}}
  - 使用过滤器:{{xxxx | 过滤器名}}或v-bind:属性="xxxx | 过滤器名"
  - 参数:过滤器也可以额外接收参数,第一个参数永久是value,多个过滤器可以串联,并不改变原数据

```
<body>
    <div id="root">
        <h2>显示格式化后的时间</h2>
        <h3>计算属性实现</h3>
        时间:<span>{{nowshijian}}</span>
        <h3>函数实现</h3>
        时间:<span>{{nowshijian1()}}</span>
        <h3>过滤器实现</h3>
        时间:<span>{{shijian | filtertime('YYYY-MM-DD') | filtertime1}}</span>
    </div>
</body>
<script type="text/javascript">
    Vue.config.productionTip = false;
    //定义全局过滤器VUe,filter('过滤器名字',function(){})
    Vue.filter("filtertime1",function(value){
        return value.slice(0,4)
    })

    new Vue({
        el:"#root",
        data:{
            shijian : Date.now(),
        },
        computed:{
            nowshijian:{
                get(){
                    return dayjs(this.shijian).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        },
        methods : {
            nowshijian1(){
                return dayjs(this.shijian).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        filters:{
            //传参默认值,第一个参数默认传入,第二个参数为自定义,没有时采用默认值
            filtertime(value,str='YYYY-MM-DD HH:mm:ss'){
            //value是要操作的数据,操作完毕后把数据返回原处
                return dayjs(value).format(str);
            },
            // filtertime1(value){
            //     //slice截取数组
            //     return value.slice(0,4)
            // }
        }

    })
</script>
```

##### 2.15 内置指令

- v-text:插入文本,会替换标签之间的内容,插值语法不会
- v-html:向指定节点中渲染包含html结构的内容
  - 安全性问题,在网上动态渲染任意的html很危险,永不用在用户输入的内容上
- v-cloak: 本质是一个特殊的属性,vue实例创建完毕并接管容器后会删掉v-cloak属性.使用css配合v-cloak可以解决网速慢时页面展示模板的问题
- v-once:使插值语法只执行一次
- v-pre:跳过所在节点的编译过程,可以利用它跳过没有使用指令语法或者插值语法的节点,会加快编译

##### 2.16 自定义指令

- 定义语法:

  - 局部指令:```new Vue({directives:{指令名,配置对象}})```或```new vue({directives:{指令名:回调函数(包括bind  inserted update)}})```
  - 全局指令:```Vue.directive(指令名,配置对象)```或```Vue.directive(指令名,回调函数)```

- 配置对象中常用的回调:

  - bind:指令与元素绑定成功时调用
  - inserteed:指令所在的元素被插入页面时调用
  - update:指令在模板重新解析的时候调用

- 备注:

  - 指令定义时不加v,使用时要加v
  - 指令名如果是多个单词要使用kebab-case命名方式(短横线连接),而不能使用camelCase命名

- 实例:需求定义一个v-big指令,和text指令类似但会使绑定的数值放大十倍,定义一个v-fbind指令,和v-bind指令类似,但可以让容器所在的元素默认获得焦点

  ```
  <body>
      <div id="root">
          <h2>v-big:</h2>
          <span v-big="num"></span>
          <h2>v-fbind</h2>
          <input v-fbind="num"/>
          <button @click="num++">点我+1</button>
      </div>
      
  </body>
  <script type="text/javascript">
      Vue.config.productopnTip = false
      new Vue({
          el:"#root",
          data:{
              num:1,
          },
          directives:{
              //当指令成功绑定时,当指令所在模板被重新解析时调用
              //element获取到当前操作的真实DOM,binding:是一个关于操作值的对象
              big(element,binding){
                  element.innerText = binding.value*10
              },
              fbind:{
                  bind(element,binding){
                      element.value = binding.value
                  },
                  inserted(element,binding){
                      element.focus()
                  },
                  update(element,binding){
                      element.value = binding.value
                      element.focus()
                  }
              }
          }
      })
  </script>
  ```

  

##### 2.17 生命周期

- 又名:生命周期回调函数,生命周期函数,生命周期钩子
- 是什么:Vue在关键时期帮我们调用的一些特殊名称的函数
- 生命周期函数的名字不可以更改,但函数的内容是根据需求自己编写的
- 生命周期函数中的this指向是vm或组件实例对象

 <img src="C:\Users\19948\Desktop\VUEnotes(1)\vue笔记\无标题.png" alt="无标题" style="zoom:200%;" />![image-20210823164247752](../images/image-20210823164247752.png)

- 生命周期钩子调用时机(函数)
  - 将要创建====>调用beforeCreate函数
  - 创建完毕====>调用created函数
  - 将要挂载====>调用beforeMount函数
  - 挂载完毕====>调用mounted函数(重要)
    - 发送ajax请求,启动定时器,绑定自定义事件,订阅消息等
  - 将要更新====>调用beforeUpdate函数
  - 更新完毕====>调用updated函数
  - 将要销毁====>调用beforeDestroy函数(重要)
    - 清楚定时器,解绑自定义事件,取消订阅等收尾工作
  - 销毁完毕====>调用destroyed函数

##### 2.18 Vue组件化编程

​	2.18.1 模块与组件,模块化与组件化

- 模块:向外提供特定功能的js程序,一般就是个js文件,复用js,简化js的编写,提高js运行效率
- 组件:**用来实现局部功能效果的代码集合**,复用编码,简化项目编码,提高运行效率
- 模块化:当应用的js都是以模块来编写的,那这个应用就是一个模块化应用
- 组件化:当应用中的功能都是多组件的方式来编写的,那这个应用就是一个组件化应用

2.18.2 组件的基本使用

- Vue中创建组件三大步骤:

  - 创建组件

    ```html
    const 组件=Vue.extend({
    	template:`组件格式`,
    	data(){
    	组件数据
    	},
    	methods:{
    	组件方法
    	}
    })
    //其中配置项与vm中几乎相同,但是没有el以为最终所有组件都要经过一个vm的管理,data必须写成函数,防止数据出现引用关系
    ```

  - 注册组件

    ```
    在vm的components配置项中:componebts:{
    	组件名:组件
    }(局部注册)
    在组件之后:Vue.component("组件名",组件),(全局注册)
    ```

  - 使用组件

    ```
    <组件名></组件名>
    ```

- ```
  <body>
      <div id="root">
          <!-- 第三步使用 -->
          <shool></shool>
      </div>
  </body>
  <script type="text/javascript">
      Vue.config.productionTip = false
      //第一步创建组件
      const shool = Vue.extend({
          template:`
              <div>
                  <h2>学校:{{name}}</h2>
                  <h2>地址:{{address}}</h2>
                  <button @click="dianji()">点我显示学校</button>
              </div>
          `,
          //data形式必须写成函数,除了没有el之外,其他跟vm中的配置项几乎相同
          data() {
              return {
                  name:"河南师范大学",
                  address:"河南新乡"
              }
          },
          methods:{
              dianji (){
                  alert(this.name)
              }
          }
      })
      // 注册全局组件,要写在组件之后
      Vue.component("shool",shool)
      new Vue({
          el:"#root",
          //第二步注册组件(局部注册)
          // components:{
          //     shool:shool,
          // }
      })
  </script>
  ```

- 注意点:

  - 组件名:一个单词组成首字母大写或小写
  - 多个单词组成:使用 kebab-case命名或CamelCase命名(需要Vue脚手架)
  - 组件名尽可能避免html标签,可以用name配置项指定Vue开发者工具中呈现的名字
  - 简写方式:```const school= Vue.extend(options)--->const school = {options}```

2.18.3 组件嵌套

- 组件嵌套格式:将组件注册在其他组件的components配置项中即可

  ```javascript
  // 嵌套层次stu->shool->App
      const stu = {
          template:`
          <div>
              <h2>学生姓名:{{name}}</h2>
              <h2>学生年龄:{{age}}</h2>   
          </div>
          `,
          data() {
              return {
                  name:'xiaoli',
                  age:19
              }
          },
      }
  
      const shool = Vue.extend({
          name:'shool',//如果配置了该项,Vue开发者工具最终呈现到界面的组件名就是该项的值
          template:`
              <div>
                  <h2>学校:{{name}}</h2>
                  <h2>地址:{{address}}</h2>
                  <stu></stu>
                  <button @click="dianji()">点我显示学校</button>
              </div>
          `,
          data() {
              return {
                  name:"河南师范大学",
                  address:"河南新乡"
              }
          },
          methods:{
              dianji (){
                  alert(this.name)
              }
          },
          components:{
              stu:stu
          }
      })
  
      const App = {
          template:`<shool></shool>`,
          components:{
              shool
          }
      }
      new Vue({
          template:`<App></App>`,
          el:"#root",
          components:{
              App
          }
      })
  ```

2.18.4 VueComponent

- 组件本质是一个名为VueComponent的构造函数,由Vue.extend生成的
- 当我们使用组件时,Vue解析会帮我们创建组件的实例对象
- 每次调用Vue.extend,返回的都是一个新的VueComponent
- 组件中this指向VueComponent实例对象,简称VC
- new Vue中this指向Vue实例对象,简称vm

**2.18.5 重要的内置关系**

- **VueComponent.prototype._proto_ === Vue.prototype**
  - **正是有了这层关系:组件实例对象(vc)才可以访问到Vue原型上的属性,方法**

2.18.6 单文件组件

- 结构

  ```html
  //组件结构
  <template>
      <div id="school">
          <h2>学校:{{name}}</h2>
          <h2>地址:{{adress}}</h2>
      </div>
  </template>
  //组件交互
  <script>
  export default {//默认导出方式,将组件暴露出去
   name:'School',
   data:{
       mame:"河南师范大学",
       adress:"河南新乡"
   }   
  }
  </script>
  组件样式
  <style lang="zh">
      #school{
          background-color: blue;
      }
  </style>
  ```

- 用法

  - 小组件统一由大组件App来管理,像套娃一样将组件注册到App中,vm中注册App,vm所在的文件又称入口文件,所有组件通过该文件引入到index.html中![image-20210824154447744](../images/image-20210824154447744.png)

##### 2.19 Vue脚手架

​	2.19.1 下载安装与结构分析

- 下载
  - ```npm install -g @vue/cli```全局安装脚手架
  - ```vue create 名字```创建项目
  - ```npm run serve```启动项目
- 结构分析![image-20210824163506717](../images/image-20210824163506717.png)
  - ```.gitignore```:git忽略文件,不接受git管理
  - ```babel.config.js```:ES6与ES5语法转换规则,不需要改动
  - ```package.json```:相关配置
  - ```package-lock.json```:包版本控制文件
  - ```README```:项目介绍
  - ```src->assets```:静态资源文件夹
  - ```src->main.js```:运行的第一个文件,即入口文件
- 查看默认配置项
  - ```vue inspect > output.js```

2.19.2  render函数

- main.js为什么用render:

  - 脚手架在引入vue时引入的是精简版的vue没有携带模板解析器,所以不能用template配置项

- render用法:

  ```html
  render(createElenent){
  	return  createElement('h1','你好!')
  }相当于模板解析器
  简化写法:
  render:h=>h(App)
  ```

2.19.3 ref属性

- 被用来给元素或子组件注册引用信息(就像是id,有了ref属性后更方便的拿到元素,因为**vue会将元素放进vc的$refs中**)![image-20210824202413567](C:\Users\19948\AppData\Roaming\Typora\typora-user-images\image-20210824202413567.png)

- 应用在html标签上获取是真实DOM元素,应用在组件标签上是组件实例对象![image-20210824202730856](../images/image-20210824202730856.png)![image-20210824202745404](C:\Users\19948\AppData\Roaming\Typora\typora-user-images\image-20210824202745404.png)

- **格式:**```<h2 ref="aa"></h2>```获取:```this.$refs.aa```

2.19.4 props配置项

- 功能:让组件接收外部传来的数据
- **格式**:```<组件 name="数据1" sex="数据2">```,在组件中添加配置项```props:{name:{type:规定数据类型},required:{是否必需},default:{是否必须}}```,```props:{name:数据类型,sex:数据类型}```(限制类型),```props:[name,sex]```(没有限制只接收)
- 注意:props是只读的,不能修改,如业务确实需要修改,请复制一份内容到data中,然后去修改data中的值

2.19.5 mixin混入(混合)

- 功能:可以把多个组件共有的配置提取成一个混入对象

- 引入时,后引入的mixin会覆盖先引入的mixin中的属性和方法

- 用法:

  - 定义混合:

    ```javascript
    //导出混合
    export const hunhe ={
        methods: {
            showname(){
                alert(this.name)
            }
        },
    }
    ```

  - 使用混合:

    ```javascript
    //局部混入
    <script>
    //引入一个hunhe
    import {hunhe} from '../mixin'
    export default {
        name:'School',
        data() {
            return {
                name:'河南师范大学',
                adress:'河南新乡'
            }
        },
        //混合将外部的方法数据等拿来用,这杨=样多个组件可以共享一些相同的方法和数据
        // 数据或方法冲突时以组件自身配置为主
        // mounted钩子除外:其中的方法会与自身的钩子一起执行,并且混合先一步执行
        mixins:[hunhe]
    }
    </script>
    //全局混入
    //在入口文件中先导入再使用Vue.mixin(xxx)
    ```


2.19.6 插件

- 功能:用于增强vue

- 用法:

  - 定义插件:

    ```javascript
    export default{
        // 参数为Vue原型
        install(Vue){
            //定义全局过滤器
            Vue.filter('fitername',function(value){
                return value.slice(0,2)
            })
            //定义混合
            Vue.mixin({
                data(){
                    return{
                        x:1,
                        y:2
                    }
                },
                methods: {
                    showname(){
                        console.log(this.name)
                    }
                },
            })
    
            Vue.prototype.hello= ()=>{alert("这是通过插件定义在原型上的方法")}
        }
    }
    ```

  - 使用:

    ```
    //在入口文件中导入
    import 插件名 from 文件路径
    //调用接口use使用
    Vue.use(插件名)
    ```


##### 2.20 ToDolist案例

![image-20210903134221267](../images/image-20210903134221267.png)

1. 实现静态组件:
   - 组件按照功能点拆分
2. 展示动态组件:
   - 数据的类型,名称是什么?
      -  一条数据应有的作用:展示内容,可以判断是否选中,删除时可以找到的标识
        - 数据应包含:id 内容 是否选中
      - 一个页面包含多个数据,则数据容器选择数组并以对象作为元素
      - 名称可根据相应的作用起
   - 数据保存在哪个组件?
      - 首先考虑数据是一个组件再用还是一些组件在用
        - 一个组件在用就把数据放在该组件
        - 一些组件公用就把数据放在共同的父组件中
3. 实现交互:
   - 从绑定事件监听开始

- 问题:
  - props传入的值是否可以修改?
    - 修改数组和对象的属性时,父组件会一并发生变化,控制台不报错
    - 修改字符串时,报错,
    - 原因:props为单向下行数据流,不允许子组件修改父组件的值.引用类型的属性值改变时不改变引用类型的地址故可以修改

##### 2.21 WebStorage

```javascript
<body>
    <script type="text/javascript">
    let p = {name:"hah",age:666}
    //添加本地存储                         //添加会话存储
     localStorage.setItem('msg','hahah');//sessionStorage.setItem('msg','hahah');
     //值自动转换为字符串
     localStorage.setItem('number',666);
     localStorage.setItem('q',JSON.stringify(p))

     //获取本地存储                       //获取会话存储
     const x=localStorage.getItem('msg')//sessionStorage.getItem()
     console.log(x)
     console.log(localStorage.getItem('读取一个没有的值'))//输出null

     //删除本地存储
     localStorage.removeItem('msg')

     //删除全部本地存储
     localStorage.clear()
    </script>
</body>
```

- 以上代码为相关API
- 存储内容大小一般支持5MB左右
- sessionStorage:存储的内容会随着浏览器的关闭而消失
- LocalStorage:存储的内容需要手动清除才会消失
- 获取存储时若对应的键找不到,API的返回值为null
- JSON.parse(null)结果还是null

##### 2.22 组件自定义事件

```
//app.vue
<template>
    <div>
        <!-- 第一种 通过父组件给子组件绑定一个自定义事件实现:父子传值-->
        <!-- v-on给stu组件实例vc绑定showstuname事件 
        如果以后有人触发了showstuname事件就会执行getstuname函数-->
        <Stu v-on:showstuname="getstuname"></Stu>
        <hr>
        <!-- 第二种 -->
        <!-- 给stu组件添加ref属性,注册引用信息,父组件就可以在$refs中拿到组件实例
        进而绑定事件,比第二中要灵活 -->
        <Stu ref="student"></Stu>
    </div>
</template>

<script>
import Stu from './components/stu.vue'
import School from './components/School.vue'
export default {
    name:"App",
    //注册组件
    components:{
        Stu,School
    },
    methods: {
        getschoolname(name){
            console.log(name)
        },
        getstuname(name){
            console.log(name)
        }
        //当传递的参数很多时,用下边的写法,name为第一个参数,其他的参数放进数组a中
        // getstuname(name,...a){
        //     console.log(name)
        // }
    },
    mounted() {
        this.$refs.student.$on('showstuname',this.getstuname)
    },
}
</script>
```

```
//stu.vue
<template>
  <div>
      <h2>姓名:{{name}}</h2>
      <h2>性别:{{sex}}</h2>
      <button @click="sendstuname()">点我展示学生姓名</button>
  </div>
</template>

<script>
export default {
    name:"Stu",
    data(){
       return{
        name:"xiaoli",
        sex:'男'
       }
    },
    methods: {
      sendstuname(){
        //通过@emit()触发绑定在stu组件实例的getstuname事件
        this.$emit('showstuname',this.name)
      }
    },
}
</script>
```

```
//school.vue
<template>
  <div>
    <h2>学校:{{name}}</h2>
    <h2>地址:{{adress}}</h2>
    <button @click="sendschoolname()">点我展示学校名称</button>
  </div>
</template>

<script>
export default {
    name:'School',
    data() {
        return {
            name:'河南师范大学',
            adress:'河南新乡'
        }
    },
    props:['getschoolname'],
    methods: {
      sendschoolname(){
        this.getschoolname(this.name)
      },
    },
}
</script>
```

- 一种组件间的通信方式,适用于:子组件=====>父组件

- 在父组件中给子组件绑定自定义事件,事件的回调函数在父组件中

- 绑定:

  - ```子组件<Demo @事件名="回调函数"/>```或```<Demo v-on:事件名="回调函数"```

  - ```
    <Demo ref="stu"/>
    .......
    mounted(){
    	//通过ref拿到子组件实例对象,直接在实例对象上绑定自定义事件
    	this.$refs.stu.$on('事件名','回调函数')
    }
    ```

- 触发:```子组件中this.$emit('事件名',数据)<--这里的数据就是通信的数据```

  - 只触发一次:```$once```或```once```

- 解绑:```在子组件中this.$off('事件名')<--两个以上(['事件名',事件名]),为空时解绑所有自定义事件```

##### 2.23 全局事件总线

- 一种组件间的通信方式,**适用于任意组件间通信**

- 安装全局事件总线:

  ```javascript
  //main.js:
  new Vue({
      render: h => h(App),
      // 安装全局事件总线 $bus就是当前应用的vm
      //其他任意组件都可以访问到$bus,因为他在vue实例身上
      //通过组件给$bus绑定自定义事件,其他组件$emit触发自定义事件,实现任意组件间的通信
      beforeCreate() {
          Vue.prototype.$bus = this
      },
  }).$mount("#app")
  ```

- 使用事件总线 :

  - 接收数据:A组件想要接受数据,则在A组件中给$bus绑定自定义事件,事件回调留在A组件自身

  ```javascript
  export default {
      name:'School',
      data() {
          return {
              name:'河南师范大学',
              adress:'河南新乡',
              stuname:'',
          }
      },
      //在页面虚拟DOM转化为真实DOM之后,绑定自定义事件
      mounted() {
        this.$bus.$on('getstuname',(stuname)=>{
          this.stuname = stuname
        })
      },
      // 在组件销毁之前解除该绑定
      beforeDestroy() {
        this.$bus.$off('getstuname')
      },
  }
  ```

  - 提供数据:在提供数据的组件中触发自定义事件

    ```javascript
    export default {
        name:"Stu",
        data(){
           return{
            name:"xiaoli",
            sex:'男'
           }
        },
        methods: {
          showname(){
            //触发全局事件总线的自定义事件,将组件中的数据通过参数传递出去
            this.$bus.$emit("getstuname",this.name)
          }
        },
    }
    ```

##### 2.24 消息订阅与发布

- 一种组件间通信的方式,**适用于任意组件间通信,与全局事件总线类似**

  - 安装pubsub:```npm i pubsub-js```

  - 引入pubsub:```import pubsub from 'pubsub-js'```

  - 接受数据:A想 接受数据,在A中订阅消息,订阅的回调留在A组件自身

    ```javascript
    mounted() {
          // 订阅消息
          // 订阅了一个名为getstuname的消息,回调函数的两个参数第一个是消息名称第二个是数据
          this.pid = pubsub.subscribe('getstuname',(msgname,msg)=>{
            this.stuname = msg
          })
        },
        beforeDestroy() {
          // 销毁订阅
          pubsub.unsubscribe(this.pid)
        },
    ```

  - 提供数据:```pubsub.publish('订阅名',数据)```

##### 2.25 nextTick(常用)

- 语法:```this.$nextTick(回调函数,执行上下文)```,参数:（回调函数和执行回调函数的上下文环境如果没有提供回调函数，那么将返回`promise`对象。

- 作用:延迟执行一段代码,在下一次(事件轮询结束后)DOM更新结束后执行指定的回调

- 什么时候用:当数据改变后,DOM随着数据的改变而改变,常在created钩子中操作DOM时用

- 原理:

  - Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 `Promise.then` 和`MessageChannel`，如果执行环境不支持，会采用 `setTimeout(fn, 0)`代替

  - 源码:

    ```javascript
    /**
     * Defer a task to execute it asynchronously.
     */
    export const nextTick = (function () {
      const callbacks = []
      let pending = false
      let timerFunc
    
      function nextTickHandler () {
        pending = false
        const copies = callbacks.slice(0)
        callbacks.length = 0
        for (let i = 0; i < copies.length; i++) {
          copies[i]()
        }
      }
    
      // the nextTick behavior leverages the microtask queue, which can be accessed
      // via either native Promise.then or MutationObserver.
      // MutationObserver has wider support, however it is seriously bugged in
      // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
      // completely stops working after triggering a few times... so, if native
      // Promise is available, we will use it:
      /* istanbul ignore if */
      if (typeof Promise !== 'undefined' && isNative(Promise)) {
        var p = Promise.resolve()
        var logError = err => { console.error(err) }
        timerFunc = () => {
          p.then(nextTickHandler).catch(logError)
          // in problematic UIWebViews, Promise.then doesn't completely break, but
          // it can get stuck in a weird state where callbacks are pushed into the
          // microtask queue but the queue isn't being flushed, until the browser
          // needs to do some other work, e.g. handle a timer. Therefore we can
          // "force" the microtask queue to be flushed by adding an empty timer.
          if (isIOS) setTimeout(noop)
        }
      } else if (!isIE && typeof MutationObserver !== 'undefined' && (
        isNative(MutationObserver) ||
        // PhantomJS and iOS 7.x
        MutationObserver.toString() === '[object MutationObserverConstructor]'
      )) {
        // use MutationObserver where native Promise is not available,
        // e.g. PhantomJS, iOS7, Android 4.4
        var counter = 1
        var observer = new MutationObserver(nextTickHandler)
        var textNode = document.createTextNode(String(counter))
        observer.observe(textNode, {
          characterData: true
        })
        timerFunc = () => {
          counter = (counter + 1) % 2
          textNode.data = String(counter)
        }
      } else {
        // fallback to setTimeout
        /* istanbul ignore next */
        timerFunc = () => {
          setTimeout(nextTickHandler, 0)
        }
      }
    
      return function queueNextTick (cb?: Function, ctx?: Object) {
        let _resolve
        callbacks.push(() => {
          if (cb) {
            try {
              cb.call(ctx)
            } catch (e) {
              handleError(e, ctx, 'nextTick')
            }
          } else if (_resolve) {
            _resolve(ctx)
          }
        })
        if (!pending) {
          pending = true
          timerFunc()
        }
        if (!cb && typeof Promise !== 'undefined') {
          return new Promise((resolve, reject) => {
            _resolve = resolve
          })
        }
      }
    })()
    ```

  - 三个重要参数

    - callbacks:存放所有的需要执行的回调函数
    - pending:用来标记是否正在执行回调函数
    - timerFunc:用来触发执行的回调函数

  - `timeFunc()`一共有三种实现方式。

    - `Promise`
    - `MutationObserver`
    - `setTimeout`

    其中`Promise`和`setTimeout`很好理解，是一个异步任务，会在同步任务以及更新DOM的异步任务之后回调具体函数。

    下面着重介绍一下`MutationObserver`。

    `MutationObserver`是HTML5中的新API，是个用来监视DOM变动的接口。他能监听一个DOM对象上发生的子节点删除、属性修改、文本内容修改等等。
     调用过程很简单，但是有点不太寻常：你需要先给他绑回调：

    ```csharp
    var mo = new MutationObserver(callback)
    ```

    通过给`MutationObserver`的构造函数传入一个回调，能得到一个`MutationObserver`实例，这个回调就会在`MutationObserver`实例监听到变动时触发。

    这个时候你只是给`MutationObserver`实例绑定好了回调，他具体监听哪个DOM、监听节点删除还是监听属性修改，还没有设置。而调用他的`observer`方法就可以完成这一步:

##### 2.26 Vue封装的过渡与动画

- 作用:在插入,删除,更新DOM元素的之后,,在规定的时机给元素添加类名(时机包括:进入,离开,进入中,离开中)

- ![image-20210908160547506](../images/image-20210908160547506.png)
  
  - v-enter:进入起点,v-enter-to:进入终点,v-enter-active:进入过程中 
- 写法:
  - 在style中准备样式:
    - v-enter:进入起点
    - v-enter-to:进入终点
    - v-enter-active:进入过程中
    - v-leave:离开的起点
    - v-leave-active:离开的过程中
    - v-leave-to:离开终点
  - 使用```transition```包裹要过度的元素,并配置name属性
    - 配置完name属性后,样式中的v需要替换成name的值,样式才能应用在对应的transition上
  - 当有多个元素需要过度时使用```transion-group```标签包裹所有元素,并给每个元素指定唯一key值

- 使用动画集成库animate.css

  - 安装依赖:npm install animate.css
  - 导入依赖:import 'animate.css'
  - 给transition的name或元素的class设置值为:animate_animated animate_bounce
  - 在官网找想用的样式:animate.style,并复制样式的名字
  - 给transition添加属性:
    - enter-active-class:复制样式的名字
    - leave-active-class:复制样式的名字

- vue封装的动画实例:

  ```vue
  <template>
    <div>
      <h2>动画实现</h2>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <!-- 用transition标签将动画包裹起来,vue可以在合适的时候加上特定的动画 -->
      <!-- appear属性进入网页就展示动画 -->
      <transition name="test" appear>
      <div v-show="isShow" id="test"><h2>这是一段文字</h2></div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    name:"Test",
    data() {
      return {
        isShow:true
      }
    },
  }
  </script>
  
  <style scoped>
  /* 动画实现 */
    #test{
      background-color:chartreuse;
    }
  
    /* 固定写法   进入时候要激活的样式动画 */
    /* .v-enter-active{
      animation: test 1s;
    } */
    /* 给transition配置name属性后 */
    .test-enter-active{
      animation: test 1s;
    }
    /* 固定写法  离开的时候要激活的动画  reverse(反转)*/
    /* .v-leave-active{
      animation: test 1s reverse;
    } */
    /* 给transition配置name属性后 */
    .test-leave-active{
      animation: test 1s reverse;
    }
  /* 添加一个动画 */
    @keyframes test {
      from{
        /* 2d变换 */
        transform:translateX(-100%);
      }
      to{
        transform:translateX(0px);
      }
    }
  </style>
  
  ```

- vue封装的过渡实例

  ```vue
  <template>
    <div>
      <h2>过渡实现</h2>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <!-- 用transition标签将动画包裹起来,vue可以在合适的时候加上特定的动画 -->
      <!-- appear属性进入网页就展示动画 -->
      <!-- 配置name属性可以给不同的transition添加不同的效果 -->
      <transition name="test" appear>
      <div v-show="isShow" class="test"><h2>这是一段文字</h2></div>
      </transition>
      <hr>
      <h2>多个动画</h2>
      <!-- 用到transition-group,表示有多个多年动画 -->
      <transition-group name="test" appear>
      <div v-show="isShow" class="test" key="1"><h2>这是一段文字</h2></div>
      <div v-show="isShow" class="test" key="2"><h2>这是一段文字</h2></div>
      </transition-group>
    </div>
  </template>
  
  <script>
  export default {
    name:"Test1",
    data() {
      return {
        isShow:true
      }
    },
  }
  </script>
  
  <style scoped>
  /* 过渡实现 */
    .test{
      background-color:chartreuse;
    }*
    /* 进入的起点 */
    .test-enter{
      transform: translateX(-100%);
    }
    /* 进入的终点 */
    .test-enter-to{
      transform: translateX(0);
    }
    /* 离开的起点 */
    .test-leave-to{
      transform: translateX(0);
    }
    /* 离开的终点 */
    .test-leave-to{
      transform: translateX(-100%);
    }
    /* 整个进入过程中 */
    .test-enter-active{
      /* 1s匀速通过 */
      transition: 1s linear;
    }
    /* 整个离开的过程中 */
    .test-leave-active{
      transition: 1s linear;
    }
  </style>
  ```

- 动画集成库实例

  ```vue
  <template>
    <div>
      <!-- 
        使用步骤:
          1.安装 npm i animate.css
          2.引入 import 'animate.css'
          3.进入官网挑选样式 animate.style
          4.复制选中样式的名字
          5.在transition项中添加配置 
            enter-active-class进入动画的类名
            leave-active-class离开动画的类名
          6.将复制的类名添加在对应配置项的后面
          7.更改name属性的值为:animate_animated animate_bounce
       -->
      <h2>动画集成库animate.css</h2>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <transition 
      name="animate__animated animate__bounce" 
      appear
      enter-active-class="animate__rubberBand"
      leave-active-class="animate__rotateOutUpRight">
      <div v-show="isShow" id="test"><h2>这是一段文字</h2></div>
      </transition>
    </div>
  </template>
  
  <script>
  // 引入动画集成库
  import 'animate.css'
  export default {
    name:"Test",
    data() {
      return {
        isShow:true
      }
    },
  }
  </script>
  
  <style scoped>
  /* 动画实现 */
    #test{
      background-color:chartreuse;
    }
  </style>
  
  ```


##### 2.27 配置代理解决跨域问题

- 方法一:

  ```
  在Vue.config.js中添加以下配置
  devServer: {
  	proxy:"http://localhost:5000"
  }
  优点:配置简单,请求资源时直接发给前端,若前端内有资源,那么该请求不会被转发给服务器
  缺点:不能配置多个代理,不能灵活的控制请求是否走代理
  ```

- 方法二:

  ```
  在Vue.config.js中配置如下规则
  devServer:{
  	proxy: {
  		'/api1':{//匹配所有以'/api1'开头的请求路径
  		target:'http://localhost:5000'//代理目标基础路径
  		changOrigin:true,
  		pathRewrite:{'^/api1':''}//将请求中的api1替换为空
  		}
  	}
  }
  changOrigin:为true时,服务器收到的请求头中host为:localhost:5000
  为false时,服务器收到的请求头中host'为:localhost:8080
  即告诉服务器真实请求端口或虚假请求端口
  
  
  优点:可以配置多个代理,每个对象就是一个代理
  缺点:配置略微繁琐,请求资源时必须加前缀
  ```

##### 2.28 github案例

- ```vue
  List.vue:
  <template>
    <div class="list">
      <div v-for="item of info.searchData" :key="item.id" class="list1" v-show="info.searchData.length">
        <a :href="item.html_url">
          <img :src="item.avatar_url" class="a-img" />
        </a>
        <p>{{item.login}}</p>
      </div>
      <!-- 欢迎使用 -->
      <h2 v-show="info.isFirst">欢迎使用</h2>
      <!-- 加载中 -->
      <h2 v-show="info.isloding">加载中</h2>
      <!-- 请求失败 -->
      <h2 v-show="info.errmsg">{{info.errmsg}}</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: 'List',
    data () {
      return {
        info:{
          isFirst:true,
          isloding:false,
          errmsg:"",
          searchData: [],
        }
      }
    },
    mounted () {
      this.$bus.$on('getSearchData', (data) => {
        // es6语法通过字面量的形式将两个对象合并,重名的属性以后面为主
        this.info = {...this.info,...data}
      })
    },
    beforeDestroy () {
      this.$bus.$off('getSearchData')
    },
  
  }
  </script>
  
  <style scoped>
  .list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 1500px;
  }
  .list1 {
    margin: 20px 10px 0 10px;
    width: 300px;
    height: 400px;
  }
  p {
    text-align: center;
  }
  .a-img {
    width: 300px;
    height: 300px;
  }
  a {
    display: inline-block;
  }
  .list1:hover {
    margin-top: 5px;
  }
  </style>
  ______________________________________________________________________________________________
  Search.vue
  
  <template>
      <div class="search">
          <h3>Search Github Users</h3>
          <div style="display:flex; ">
              <input v-model="keyword" @keydown.enter="getdata" >
              <button @click="getdata">Search</button>
          </div>
      </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
      name:'Search',
      data() {
          return {
              keyword:"",
              isFirst:true,
              isloding:false,
              errmsg:"",
          }
      },
      methods: {
          getdata(){
              if(this.keyword.trim() === "")return
              this.$bus.$emit('getSearchData',{isFirst:false,isloding:true,searchData:[]})
              axios.get(`https://api.github.com/search/users?q=${this.keyword}`).then(
                  response => {
                      this.$bus.$emit('getSearchData',{isFirst:false,isloding:false,searchData:response.data.items})
  
                  },
                  error => {
                      console.log("请求失败",{isFirst:false,isloding:false,searchData:[],errmsg:error.message})
                  }
              )
              }
          }
  }
  </script>
  
  <style scoped>
  .search{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 300px;
      width: 1500px;
      background-color: rgb(121, 129, 143);
  }    
  input{
      width: 300px;
      outline-style: none;
      font-size: 30px;
      top: 0;
  }
  button {
      height: 40px;
      top: 0;
  }
  </style>
  _______________________________________________________________________________________________
  App.vue
  <template>
    <div class="all">
          <Search></Search>
          <List></List>
    </div>
  </template>
  
  <script>
  import List from './components/List.vue'
  import Search from './components/Search.vue'
  export default {
    name: "App",
    components: {
      List,
      Search
    }
  }
  </script>
  
  <style scoped>
  *{
      margin: 0;
      padding: 0;
      width: 100%;
  }
  .all {
      margin: 0 auto;
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
  }
  </style>
  
  需要安装全局事件总线
  ```

##### 2.29 vue-resource

- 一个代替ajax发送请求的插件,了解即可
  - 安装 npm i vue-resource
  - 使用 引入后Vue.use(引入时名称)
  - 使用后在所有的组件实例包括vm,vc实例上多了一个$http
  - this.$http.get('url').then(response => {},err => {}) 与axios用法相同

##### 2.30 插槽

- 需求:![image-20210914180419194](../images/image-20210914180419194.png)
  
- 相同的组件不同的结构
  
- 作用:可以让父组件在子组件指定位置插入指定html结构,换句话说就是复用子组件的同时又可以保持组件的多样性

- 分类:

  - 默认插槽:

    ```vue
    子组件中:
    <div>
        <slot>当使用者没有向插槽中传递html结构时,这条消息会出现</slot>
    </div>
    父组件中:
    <子组件>
    	html结构,会自动放入<slot>中    
    </子组件>
    ```

  - 具名插槽:

    ```vue
    可以将html结构插入子组件指定的位置
    子组件中:
    <div>
        <slot name="插槽名称"></slot>
    </div>
    父组件:
    <子组件>
    	<html结构 slot="插槽名称">或v-slot:
     
        </html结构>	
    </子组件>
    ```

  - 作用域插槽:

    ```vue
    数据在子组件中,但根据数据生成的结构需使用者决定
    子组件中:
    <div>
        <slot :参数="数据"></slot>
    </div>
    父组件中:
    <子组件>
    	<template scope="参数">//使用作用域插槽html结构必须在<template></template>标签中,由子组件传递的"参数"是一个对象,"数据"为该对象的一个属性使用时:参数.数据
        	html结构
        </template>    
    </子组件>
    ```

- 实例:

  ```vue
  子组件:
  <template>
    <div class="category">
        <h3>{{titles}}类</h3>
        <!-- 准备一个默认插槽 -->
        <slot>我是默认值当使用者没有传递具体结构时,我会出现</slot>
        <!-- 准备一个具名插槽 -->
        <slot name="center"></slot>
        <slot name="footer"></slot>
        <!-- 作用域插槽 -->
        <!-- 可以将插槽内的数据传递给使用者 -->
        <slot :films="this.films" name="filem"></slot>
    </div>
  </template>
  
  <script>
  export default {
      name:'Category',
      props:['titles'],
      data() {
          return {
              films:['教父','机械师','JS']
          }
      },
  }
  </script>
  _____________________________________________________________________________________________________________________________________
  父组件
  <template>
    <div class="all">
      <Category :titles=food>
        <!-- 子组件准备好插槽后,自动放进插槽中 -->
        <img src="/favicon.ico">
      </Category>
  
  
      <Category :titles=game>
        <!-- 这里可以指定插入哪个插槽,下面将a插入中间的插槽 -->
        <ul slot="footer">
            <li v-for="(item,index) in games" :key="index">{{item}}</li>
        </ul>
        <a slot="center">链接</a>
      </Category>
  
  
      <Category :titles=film>
        <!-- 使用作用域插槽必须用template标签包裹 -->
        <template scope="canshu" slot="filem">
          <!-- 传递的参数为一个对象 用scope接收 -->
          <div>{{canshu}}</div>
          <ul>
            <li v-for="(item,index) in canshu.films" :key="index">{{item}}</li>
        </ul>
        </template>
      </Category>
    </div>
  
  </template>
  
  <script>
  import Category from './components/Category.vue'
  export default {
    name: "App",
    components: {
     Category
    },
    data() {
      return {
        food:'默认插槽',
        game:'具名插槽',
        film:'电影',
        foods:['火锅','烧烤','小龙虾'],
        games:['红色警戒','穿越火线','劲舞团']
      }
    },
  }
  </script>
  
  <style scoped>
  .all {
    display: flex;
    justify-content: space-around;
    text-align: center;
    background-color: rgb(200, 213, 238);
  }
  </style>
  ```

##### 2.30.1 动态组件

- 使用场景:在不同组件之间进行动态切换

- 使用方式:正在组件标签上添加```is:attribute```来实现

  - ```vue
    <--组件会在'currentTabComponent'改变时改变-->
    <component :is="currentTabComponent"></component>
    完整源码:
        <script>
        	Vue.component("tab-home",{
                template:"<div>Home1</div>"
            });
            Vue.component("tab-home",{
                template:"<div>Home2</div>"
            });
            Vue.component("tab-home",{
                template:"<div>Home3</div>"
            });
        </script>
    ```

- keep-alive

  - 保存组件的状态,让组件在切换的时候不销毁

  - 当使用is来切换不同的组件时,若不保持组件的状态,以免重复渲染导致性能浪费

    - ```vue
      <keep-alive>
      	<component :is="currentTabComponent"></component>
      </keep-alive>
      使用keep-alive包裹组件后,组件实例在第一次创建后会被缓存下来
      ```

  - 注意:```<keep-alive>```是用在其一个直属的子组件被开关的情形,如果你在其中有v-for则不会工作.如果有下述多个条件性子元素,只允许通知只有一个子元素被渲染.

  - **当组件在keep-alive内被切换,他的```activated```和```deactivated```这两个声明周期钩子将会别触发**

##### 2.31 VueX

- 了解Vuex
  - 专门在Vue中实现集中式状态管理的一个Vue插件(说白了就是专门管理组件间共享的数据的)
  - 也是组件间的一种通信方式,适用于任意组件间通信
  - 使用时机:多组件间共享数据获取和更改(读/写)时
  
- Vuex与全局事件总线的比较
  - 其中x为ABCD组件共享的数据,箭头为读数据和写数据
  - ![image-20210914171410083](../images/image-20210914171410083.png)
  - vuex提供了专门读写的api
  - ![image-20210914171614135](../images/image-20210914171614135.png)
  
- vuex的工作原理:![image-20210915103341970](../images/image-20210915103341970-16322763666251.png)

  - **从Vue components 顺时针开始:**
    - 组件通过store调用dispatch("动作名",参数),在Actions中有相应的动作:**{动作名(comtext value){}}**与之对应,
    - 在actions中通过context调用commit("动作名",参数),继续传递到mutations中对应的动作
    - 在mutations中可以拿到state,以及传递的参数,然后执行相应的代码改变数据
    - 底层自动执行mutate将state的数据改变并重新render渲染数据
    - 当需要数据不是从外边接口获取时,组件可以通过store直接调用mutation中的方法

- VueX环境配置

  - npm i vuex
  - 创建文件夹store(vuex),创建文件index.js(store.js)
  - 由于import引入后会立即执行引入的文件,所以应在store/index.js中引入vuex和vue,并use
  - 给store添加actions对象,mutations对象,以及state对象
  - 将store添加进vue实例中,直接在**new Vue.Store({})**的括号里添加,这样所有的vc就可以找到store

- index.js中三个对象

  - actions:里面函数有两个参数(context value)
    - context:上下文,其中有多个方法可调用,包括commit,还有dispatch方法,可用于业务逻辑复杂时,在actions中创建多个函数来处理
    - value:组件传递的值
  - mutations:里边的函数也有两个参数(state value)
    - state:可以通过他拿到state对象中的数据
    - value:actions传递的值

- store的getters配置项

  - 作用:与计算属性相似,当对数据的加工逻辑比较复杂,或者想要所有组件都可以访问到该加工后的结果时可以用

  - 用法:

    - 在store/index.js中追加配置并添加到store对象:

      ```vue
      //添加grtters,用来对数据进行加工
      const getters = {
          tensum(state){
              return state.sum*10
          }
      }
      //创建vuex,并将以上添加到vuex中
      export default new Vuex.Store({
          actions,
          mutations,
          state,
          getters
      })
      ```

    - 在组件中通过$store.getters.方法名直接获取对应的返回值

- 四个map方法(用于简化代码):**同名用数组,不同名用对象**

  - 在组件中引入:```import {mapState,mapGetters,mapActions,mapMutations}```

  - mapState()与mapGetters():

    - 使用场景:用于映射state中的数据,取数据就不用$store.state.变量名:

      ```vue
      computed:{
              //为了简化模板中的表达式,将所拿到的数据写成 计算属性,但是这种方式书写太过繁琐.可以采用vuex中的映射
              // sum(){
              //     return this.$store.state.sum
              // },
              // tensum(){
              //     return this.$store.getters.tensum
              // },
              // school(){
              //     return this.$store.state.school
              // },
              // subject(){
              //     return this.$store.state.subject
              // },
      
              //采用简便写法
              //当模板中的数据名字与store中相同时采用数组写法
              ...mapState(['sum','school','subject']),
              //当模板中的数据名字与store中不同时采用对象写法
              ...mapGetters({ten:'tensum'})
          },
      ```

  - mapActions(),mapMutations()(帮助调用Actions和mutations中的方法:

    - ```vue
       methods: {
        		//复杂写法
              add(){
                  this.$store.dispatch('jia',this.n)
              },
              reduce(){
                  this.$store.commit('JIAN',this.n)
              },
              add1(){
                  this.$store.dispatch('jiaodd',this.n)
              },
              add2(){
                 this.$store.dispatch('jiawait',this.n)
              },
        		//简化写法
              // mapMutations(),mapActionss()借助这两个帮助调用方法,简化调用方法步骤
              ...mapActions(['jia','jiaodd','jiawait']),
              ...mapMutations({
                  hhh:'JIAN'
              })
          },
      ```

- Vuex求和案例:

  ```vue
  main.js
  import Vue from "vue";
  import App from './App';
  
  //引入store
  import store from './store/index' 
  
  Vue.config.productionTip = false;
  //创建Vue实例
  new Vue({
      render: h => h(App),
      //将store添加到vue实例上
      store,
  }).$mount("#app")
  ----------------------------------------------------------------------------------------
  store/index.js
  import Vue from 'vue'
  import Vuex from 'vuex'
  Vue.use(Vuex)
  
  //添加actions对象,用来响应组件动作
  const actions = {
      //context上下文,其中有多个方法,实现比较全面的功能
      jia(context,value){
          context.commit('JIA',value)
      },
      jiaodd(context,value){
          if(context.state.sum % 2){
              context.commit('JIA',value)
          }
      },
      jiawait(context,value){
          setTimeout(()=> {
              context.commit('JIA',value)
          },1000)
      }
  }
  //添加mutations对象,用来操作数据
  const mutations = {
      JIA(state,value){
          state.sum += value
      },
      JIAN(state,value){
          state.sum -= value
      }
  }
  //添加action对象,用来存储数据
  const state = {
      // 当前的和
      sum:0,
      school:"河南师范",
      subject:"前端"
  }
  //添加grtters,用来对数据进行加工
  const getters = {
      tensum(state){
          return state.sum*10
      }
  }
  //创建vuex,并将以上添加到vuex中
  export default new Vuex.Store({
      actions,
      mutations,
      state,
      getters
  })
  ----------------------------------------------------------------------------------------
  
  Count.vue
  <template>
    <div >
        <h2>以前的写法:</h2>
        <h2>当前求和为:{{$store.state.sum}}</h2>
       <h2>当前求和的10倍:{{$store.getters.tensum}}</h2>
       <h2>学校:{{$store.state.school}},专业:{{$store.state.subject}}</h2>
       <select v-model.number="n">
           <!-- 使用单向绑定后边引号中的内容以js表达式来解析 -->
           <!-- <option :value="1">1</option> -->
           <option :value="1">1</option>
           <option :value="2">2</option>
           <option :value="3">3</option>
       </select>
       <button @click="add">+</button>
       <button @click="reduce">-</button>
       <button @click="add1">为奇数时可加</button>
       <button @click="add2">等一等再加</button>
        <hr>
        <h2>精简后的写法:</h2>
       <h2>当前求和为:{{sum}}</h2>
       <h2>当前求和的10倍:{{ten}}</h2>
       <h2>学校:{{school}},专业:{{subject}}</h2>
       <!--  加上.number修饰符-->
       <select v-model.number="n">
           <!-- 使用单向绑定后边引号中的内容以js表达式来解析 -->
           <!-- <option :value="1">1</option> -->
           <option :value="1">1</option>
           <option :value="2">2</option>
           <option :value="3">3</option>
       </select>
       <button @click="jia(n)">+</button>
       <button @click="hhh(n)">-</button>
       <button @click="jiaodd(n)">为奇数时可加</button>
       <button @click="jiawait(n)">等一等再加</button>
    </div>
  </template>
  
  <script>
  //引入state映射,getters映射,用来简化$store.state.变量名这种形式
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
      name:'Count',
      data() {
          return {
              // 用户选择的数字
              n:1,
          }
      },
      computed:{
          //为了简化模板中的表达式,将所拿到的数据写成 计算属性,但是这种方式书写太过繁琐.可以采用vuex中的映射
          // sum(){
          //     return this.$store.state.sum
          // },
          // tensum(){
          //     return this.$store.getters.tensum
          // },
          // school(){
          //     return this.$store.state.school
          // },
          // subject(){
          //     return this.$store.state.subject
          // },
  
          //采用简便写法
          //当模板中的数据名字与store中相同时采用数组写法
          ...mapState(['sum','school','subject']),
          //当模板中的数据名字与store中不同时采用对象写法
          ...mapGetters({ten:'tensum'})
      },
      methods: {
          add(){
              this.$store.dispatch('jia',this.n)
          },
          reduce(){
              this.$store.commit('JIAN',this.n)
          },
          add1(){
              this.$store.dispatch('jiaodd',this.n)
          },
          add2(){
             this.$store.dispatch('jiawait',this.n)
          },
  
          // mapMutations(),mapActionss()借助这两个帮助调用方法,简化调用方法步骤
          ...mapActions(['jia','jiaodd','jiawait']),
          ...mapMutations({
              hhh:'JIAN'
          })
      },
  }
  </script>
  
  <style>
  button{
      margin: 10px;
  }
  </style>
  ```

- Vuex模块化+namespace

  - 目的:是代码更加清晰,便于维护

  - 用法:

    ```vue
    配置:
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    
    
    //模块化+命名空间
    //定义count模块
    const count = {
        //开启命名空间
        namespaced:true,
        state:{
            // 当前的和
            sum:0,
            school:"河南师范",
            subject:"前端"
        },
        actions:{
            jia(context,value){
                context.commit('JIA',value)
            },
            jiaodd(context,value){
                if(context.state.sum % 2){
                    context.commit('JIA',value)
                }
            },
            jiawait(context,value){
                setTimeout(()=> {
                    context.commit('JIA',value)
                },1000)
            }
        },
        mutations:{
            JIA(state,value){
                state.sum += value
            },
            JIAN(state,value){
                state.sum -= value
            }
        },
        getters:{
            tensum(state){
                return state.sum*10
            }
        },
    }
    
    //创建vuex,并将以上添加到vuex中
    export default new Vuex.Store({
       modules:{
           count:count,
       }
    })
    --------------------------------------------------------------------------------------
    使用:
    <script>
    //引入state映射,getters映射,用来简化$store.state.变量名这种形式
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name:'Count',
        data() {
            return {
                // 用户选择的数字
                n:1,
            }
        },
        computed:{
            //普通用法
            //sum(){
              //  return this.$store.state.count.sum
            //}
            //注意getters的直接获取方式不太一样
          // tensum(){
            //   return this.$store.getters['count/tensum']
           //}
            //采用简便写法
            //当模板中的数据名字与store中相同时采用数组写法
            ...mapState('count',['sum','school','subject']),
            //当模板中的数据名字与store中不同时采用对象写法
            ...mapGetters('count',{ten:'tensum'})
        },
        methods: {
            // mapMutations(),mapActionss()借助这两个帮助调用方法,简化调用方法步骤
            ...mapActions('count',['jia','jiaodd','jiawait']),
            ...mapMutations('count',{
                hhh:'JIAN'
            })
        },
    }
    </script>
    ```

##### 2.32 路由

- 什么是路由?
  - 概念:路由就是一组key-value的对应关系,key代表路径,value可能是function或者component,
  - 目的:实现SPA(single page web application)(单页面应用)应用的展示区与导航区切换,
  
- 路由分类:
  - 后端路由:
    - value是function,用于处理客户端提交的请求
    - 工作过程:服务器收到一个请求时,根据**请求路径**找到**匹配**的函数处理请求,返回响应数据
  - 前端路由:
    - value是component用于展示页面内容
    - 工作过程:当浏览器的路径改变时,对应的组件就会显示

- 基本使用:

  - 安装:```npm i vue-router```

  - 在src下创建router文件夹并创建index.js文件

  - 在index.js文件中引入vue,vuerouter并use()

  - 创建router实例并导出

  - 在router实例中添加配置项routes:[]

  - 在router[]中配置路由{path:'导航展示的路径',component:引入的组件名}(形成对应关系)

  - 在main.js中引入router并添加到Vue实例中

  - 在app.vue中使用```<router-link  to="上方配置的导航展示路径">```添加导航,使用```<router-view></router-view>```定义组件展示位置

  - 示例:

    ```vue
    router/index.js
    //引入vue-router
    import Vuerouter from 'vue-router'
    //引入Vue
    import Vue from 'vue'
    //使用vue-router
    Vue.use(Vuerouter)
    //引入组件
    import School from '../components/School.vue'
    import Stu from '../components/stu.vue'
    
    //创建router
    export default new Vuerouter({
        routes:[
            {
                path:'/School',
                component:School,
            },
            {
                path:'/Stu',
                component:Stu
            }
        ]
    })
    ---------------------------------------------------------------------------------------
    main.js
    import Vue from "vue";
    import App from './App'
    
    Vue.config.productionTip = false
    //引入router
    import router from './router/index'
    //创建Vue实例
    new Vue({
        render: h => h(App),
        router,
        beforeCreate() {
            Vue.prototype.$bus = this
        },
    }).$mount("#app")
    ---------------------------------------------------------------------------------------
    APP.vue
    <template>
        <div>
            <!-- router-link指定导航 -->
            <router-link to="/school" active-class="liang">导航一</router-link>
            <router-link to="/Stu" active-class="liang">导航二</router-link>
            <div>
                <!-- 指定组件呈现位置 -->
                <router-view></router-view>
            </div>
        </div>
    </template>
    
    <script>
    export default {
        name:"App",
    }
    </script>
    
    <style>
    .liang {
        background-color: darkgoldenrod;
    }
    </style>
    ```

- 四个注意点

  - 被路由管理的组件叫做路由组件,一般放在```pages```文件夹下,一般组件放在```component```文件夹下
  - 组件切换过程中,被"隐藏"的组件实际是**被销毁**了,当使用的时候在进行挂载
  - $route是每个组件都有的唯一的属性,里面存放着自己的路由属性
  - $router,整个应用只有一个router,可以通过组件的$router属性获取到

- 多级路由

  - 在父级路由通过children配置项添加子路由:

    ```vue
    routes:[
            {
                path:'/School',
                component:School,
                children:[
                    {
                        path:'List',//子路由不能写/
                        component:List
                    },
                    {
                        path:'SchoolChildren',//子路由不能写/
                        component:SchoolChildren
                    }
                ]
            },
            
    父组件中:
    <div>
        <h2 ref="school" @click="showname()">学校:{{name}}</h2>
        <h2>地址:{{adress}}</h2>
        <router-link to="/School/SchoolChildren" active-class="liang">SchoolChildren</router-link>
        <router-link to="/School/List" active-class="liang">List</router-link>
        <router-view></router-view>
      </div>
    ```

- 路由组件传参

  - query方式:

  - ```vue
    父级路由组件
    <ul>
           <li v-for= "item of list " :key="item.id">
             <!-- 路由跳转并使用query传递参数 to的字符串写法-->
             <router-link :to="`/School/SchoolChildren/List id=${item.id}&name=${item.name}`">{{item.id}}</router-link>
             <!-- 路由跳转并使用query传递参数 to的对象写法 -->
             <router-link :to="{
               path:'/School/SchoolChildren/List',
               query:{
                 id:item.id,
                 name:item.name
               }
             }"></router-link>
           </li>
       </ul>
    ----------------------------------------------------------------------------------
     子级路由组件
    <h2>id:{{$route.query.id}}姓名:{{$route.query.name}}</h2>
    ```

  - 由query传递的参数保存在路由组件的$route中,可以输出$route查看:![image-20210923152548608](../images/image-20210923152548608.png)

  - params方式

    - 配置路由,声明接收params的参数

      ```vue
       {
            name:'list',
            path:'List/:id/:name',//:加参数名,告诉router这是给参数留的位置
           component:List
                              }
      -----------------------------------------------------------------------------------
      组件中(传递):
      <router-link :to="{
                 name:'list',//此处不能使用path,只能使用name
                 params:{
                   id:666,
                   name:哈哈哈
                 }
                        或者
          //使用data中的数据时用模板字符串+${}
      <router-link :to="`/School/SchoolChildren/List/666/哈哈哈}</router-link> -->
      -----------------------------------------------------------------------------------
      组件中(接收):与query用法相同直接从$route身上获取
      <div>
          <h2>id:{{$route.params.id}}姓名:{{$route.params.name}}</h2>
        </div>
      ```

  - props方式

    - ```vue
       {
                                  name:'list',
                                  // path:'List/:id/:name',配合第二中写法 
                                  path:'List',
                                  component:List,
                                  // 第一种写法 props为对象,该对象中所有的key-value的组合最终都会通过props传递给List组件,只需用props接收
                                  // props:{id:566,name:'haha'}
                                  //第二种写法 props为布尔值,为true时,则把路由中的所有params参数通过props传递给List组件,
                                  // props:true
                                  // 第三种写法 值为函数,该函数返回的对象中每一组key-valye都会通过props传递给组件
                                  // props($route){
                                  //     return{
                                  //         id:$route.query.id,
                                  //         name:$route.query.name
                                  //     }
                                  // }
                                  // 可以使用解构赋值使上面代码简化
                                  props({query}){
                                      return{
                                          id:query.id,
                                          name:query.name
                                      }
                                  }
        
      ----------------------------------------------------------------------------------
      接收:
      props:['id','name']
      ```

  - 命名路由

    - ```vue
      routes:[
              {
                  path:'/School',
                  component:School,
                  children:[
                      {
                          name:'schoolchildren',
                          path:'SchoolChildren',
                          component:SchoolChildren,
                          children:[
                              {
                                  name:'list',
                                  path:'List',
                                  component:List
                              }
                          ]
                      }
                  ]
      -----------------------------------------------------------------------------------
      使用:
      <ul>
             <li v-for= "item of list " :key="item.id">
                 <!-- 直接添加name配置项, -->
               <router-link :to="{
                 name:'list',//填入在routes中添加的路由组件的名字
                 query:{
                   id:item.id,
                   name:item.name
                 }
               }">{{item.id}}</router-link>
             </li>
         </ul>
      ```

- **<router-link>**的replace(替换)属性
  - 作用:控制路由跳转时操作浏览器历史记录的方式(跳转记录以栈的方式存储)
  - 浏览器的历史记录有两种方式:分别为```push```和```replace```,```push```是追加历史记录,```replace```是替换当前记录,路由跳转时候默认为```push```
  - 如何开启```replace```模式:在```<router-link>```添加属性```replace```
  
- 编程式路由导航

  - 作用:不借助<router-link>实现路由跳转

  - 借助$router中的API

    - $router.push:

      ```vue
      this.$router.push({
                name:'list',
                query:{
                  id:m.id,
                  name:m.name
        }//其中的配置与query传参相同,push为追加历史记录的方式跳转
      ```

    - $router.replace:

      ```vue
      this.$router.replace({
                name:'list',
                query:{
                  id:m.id,
                  name:m.name
       }//其中的配置与query传参相同,replace为替换历史记录的方式跳转
      ```

    - $router.go()和$router.back(),$router.foreard():

      ```vue
      // 前进到第几步
      go(){
          this.$router.go(3)
      },
      //后退一步
      back(){
          this.$router.back()
      },
      //前进一步
      forward1(){
          this.$router.forward()
      }
      ```
      

- 缓存路由组件

  - 作用:让不展示的组件保持挂载,不被销毁

  - 使用场景:由于路由组件在切换的时候,会将隐藏的组件销毁,而用户输入组件的数据也会销毁(如input框)

  - 语法:

    ```vue
    <!--
        缓存路由组件 include后加组件名使指定的组件不销毁
        :include=['组件1'.'组件2'],这种方式可以指定多个组件不被销毁
    	
    -->
    <keep-alive include="List">
        <!-- 指定组件呈现位置 -->
        <router-view></router-view>
    </keep-alive>
    ```

- 路由组件的两个生命周期钩子

  - 用于捕获路由组件的激活状态
  - ```activated```:路由组件被激活时触发
  - ```deactivated```:路由组件失活时触发
  - 顺带一提:```this.$nextTick(function(){})```:在更新DOM时在页面将真实DOM放到页面后才执行函数

- 路由守卫

  - 作用对路由进行权限控制,(让你跳转你才能跳转)

  - 全局路由守卫

    - 全局前置路由守卫:

      ```vue
      //前置路由守卫 会在跳转路由前拦截所有跳转,并执行函数
      //三个参数:to想要跳转的目标组件,from从哪个组件跳到目标组件,next()放行
      router.beforeEach((to,from,next)=>{
          if(to.meta.isAuth){
      		//to.meta.isAuth:
      			meta为路由元信息,添加在路由配置中,用于存放一些自定义信息
      			meta:{isAuth:true},用来判断该路由是否需要鉴权
              // 判断当前用户是否为河师大,如果是就放行允许跳转
              if(localStorage.getItem('school') === 'heshid'){
                  next()
              }else{
                  alert('没有权限')
              }
          }else{
              next()
          }
      })
      ```

    - 全局后置路由守卫

      ```vue
      //全局后置守卫 初始化时执行,每次路由切换后执行
      router.afterEach((to,from)=>{
          console.log(to,from)
          //在meta中添加title用来控制网页中对应的组件显示对应的title
          document.title = to.meta.title || '路由练习'
      })
      ```

  - 独享路由守卫:

    ```vue
    //独享路由守卫 只在该路由生效
    //在路由配置中添加以下配置项,只有前置独享路由
    beforeEnter:(to,from,next)=>{
         if(localStorage.getItem('school') === 'heshida'){
             next()
         }else{
             alert('无权限')
         }
     }
    ```

- 路由器的两种工作模式:
  - hash模式
    - ```mode:'hash'```
    - 对于url来说hash值就是#及其后面的内容,兼容性较好
    - hash值不会包含在http请求中,即:hash值不会传到服务器中
    - 地址中永远带着#号,
    - 若以后将地址通过第三方手机app分享时,若app校验严格,则地址会被标记为不合法
  - history模式
    - 请求服务器的路径就是地址栏中的路径,
    - 兼容性与hash相比略差
    - 应用部署上线后需后端人员支持,解决页面404的问题

- 将应用打包部署在简单的服务器上
  - npm run build 执行打包命令
  - 会生成一个dist的文件,里面存放着.vue文件转化的html,css等静态资源
  - npm i express 用node写一个简单的服务器
  - 创建static文件夹,将dist文件夹放入,并在服务器上开放该文件夹:app.use(express.static('./目录名'))
  - 在浏览器中访问该服务器端口即可

##### 2.33 组件库

- 移动端常用组件库:
  - Vant  http://youzan.github.io/vant 
  - Cube http://didi.github.io/cube-ui
  - Mint UI http://mint-ui.github.io
- PC端常用组件库:
  - Element UI http://element.eleme.cn
  - IView UI http://www.iviewui.com

##### 2.34 父子组件生命周期执行顺序

- 加载渲染过程

  ```
  父beforeCreated->父Created->父beforMount->子beforeCreated->子Created->子beforeMounte->子mounted->父mounted
  ```

- 更新过程

  ```
  父beforeUpdate->子beforeUpdate->子updated->父updated
  ```

- 销毁过程

  ```
  父beforeDestroy->子beforeDestroy->destoryed->父destoryed
  ```

- keep-alive的生命周期

  - activated:页面第一次进入的时候,钩子触发顺序

    ```
    created->mounted->activated
    ```

  - deactivated:页面退出的时候会触发deactivated,当再次前进后退的时候只触发activated

- computed,watch

  - 在created之前就会初始化computed,watch![image-20220104134545024](vue2笔记--李奥飞.assets/image-20220104134545024.png)

  - .在`new Vue（）`的时候,`vue\src\core\instance\index.js`里面的`_init()`初始化各个功能

    ```vue
    function Vue (options) {
    if (process.env.NODE_ENV !== 'production' &&
      !(this instanceof Vue)
    ) {
      warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options) //初始化各个功能
    }
    ```

  - 在`_init()`中有这样的一个执行顺序：其中`initState()`是在`beforeCreate`和`created`之间

    ```vue
     initLifecycle(vm)
      initEvents(vm)
      initRender(vm)
      callHook(vm, 'beforeCreate')
      initInjections(vm) // resolve injections before data/props
      initState(vm) //初始化
      initProvide(vm) // resolve provide after data/props
      callHook(vm, 'created') 
    ```

  - .在initState()做了这些事情：

    ```vue
    if (opts.props) initProps(vm, opts.props)//初始化Props
    if (opts.methods) initMethods(vm, opts.methods)//初始化methods
    if (opts.data) {
      initData(vm)} else {
      observe(vm._data = {}, true /* asRootData */)}//初始化data
    if (opts.computed) initComputed(vm, opts.computed)//初始化computed
    ```

    

