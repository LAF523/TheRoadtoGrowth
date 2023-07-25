# NPM

> npm全名node package manger  包管理器
>
> 提供了命令行工具,可以方便的下载安装升级和删除包

## npm的安装和使用

> npm在安装Node.js是会连带着被安装,但可能不是最新版本: 使用`npm install npm@latest-g`可以升级到最新版本

### 基本命令

```
# 查看 npm 命令列表
$ npm help

# 查看各个命令的简单用法
$ npm -l

# 查看 npm 的版本
$ npm -v

# 查看 npm 的配置
$ npm config list -l
```

### 初始化文件

```
$ npm init
用来初始化生成`package.json文件,如果使用-f(force)-y(yes)则跳过提问阶段直接生成`package.json`文件
```

## package.json

> package.json作为描述文件,描述了你的项目所依赖了那些包
>
> 允许我们使用"语义版本规则"指定你的项目依赖的版本
>
> 让你的构建更好的与其他分享

### 配置项

#### name

>  全部小写,没有空格,可以使用下划线或者横线,必须

#### version

> x.x.x的格式,符合语义化规则,必须

#### descripttion

> 描述信息,用于搜索

#### main

> 入口文件,一般是index.js

#### script

> 支持脚本,默认是一个test

#### author

> 作者信息

#### license

> 默认是MIT,开源协议

#### keywords

> 关键字,有助于别人使用npm search搜索的时候发现你的项目

```
{
  "name": "y",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "keywords": [],
  "description": ""
```

### dependencies

> 在生产环境中需要使用的依赖,安装是加`-S/--save`

```
"dependencies": {
    "connect-history-api-fallback": "^1.6.0",
    "vue": "^2.5.22",
    "vue-awesome-mui": "^1.7.3",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
  },
```

### devDependencies

> 在开发,测试环境下使用的依赖,安装时加`-D/--save-dev`

```
"devDependencies": {
    "@vue/cli-plugin-babel": "^3.4.0",
    "@vue/cli-plugin-eslint": "^3.4.0",
    "@vue/cli-service": "^3.4.0",
    "babel-eslint": "^10.0.1",
    "eslint": "^5.8.0",
    "eslint-plugin-vue": "^5.0.0",
    "expose-loader": "^0.7.5",
 
  }
```

### 语义化版本规则

> 版本前的**^**,*****就是npm语义化版本规则,

npm包提供者应该注意版本规范,如果打算与别人分享,应该从1.0.0版本开始遵循如下标准

- 补丁版本，解决了bug或者一些较小的更改，增加最后一位数字，如：1.0.1
- 小版本，增加了新特性，同时不会影响之前的版本，增加中间一位数据，如：1.1.0
- 大版本，大改版，无法兼容之前的版本，增加第一位数字，如：2.0.0

使用者可以在`package.json`中写明可以接受的更新程度

- 接受补丁版本的更新， -1.0.4表示1.0  1.0.x 都可以
- 接受小版本的更新，^1.0.4表示1  1.x  都可以
- 接受大版本的更新 *  x

### --save和--save-dev

> --save后缀表示这个包添加到配置文件的`dependencies`属性中,表示用于生产环境
>
> --save-dev后缀表示这个包添加到配置文件的`devDependencies`属性中,表示用于开发环境

### package.json更新

- npm outdated 查看，是否有新版本
- npm updata <package_name>,更新指定依赖的版本
- npm updata,更新所有的包，不建议这么做，风险太大，了解清楚每个包更新版本的的新特性，是否兼容老代码等再更新
- npm updata工作过程，远程仓库查询最新版本；对比本地版本；查看package.json中对应的版本；package符合语义规则，更新，否则不更新。

### set设置环境变量

```kotlin
  $ npm set init-author-name 'Your name'
  $ npm set init-author-email 'Your email'
  $ npm set init-author-url 'http://yourdomain.com'
  $ npm set init-license 'MIT'
```

上面命令等于为`npm init`设置了默认值，以后执行`npm init`的时候，`package.json`的作者姓名、邮件、主页、许可证字段就会自动写入预设的值。这些信息会存放在用户主目录的`~/.npmrc`文件，使得用户不用每个项目都输入。如果某个项目有不同的设置，可以针对该项目运行`npm config`。

```bash
  $ npm set save-exact true
```

上面命令设置加入模块时，`package.json`将记录模块的确切版本，而不是一个可选的版本范围

## npm config

```bash
  $ npm config set prefix $dir
```

上面的命令将指定的`$dir`目录，设为模块的全局安装目录。如果当前有这个目录的写权限，那么运行`npm install`的时候，就不再需要`sudo`命令授权了。

```swift
$ npm config set save-prefix ~
```

上面的命令使得`npm install --save`和`npm install --save-dev`安装新模块时，允许的版本范围从克拉符号（^）改成波浪号（~），即从允许小版本升级，变成只允许补丁包的升级。

```bash
$ npm config set init.author.name $name
$ npm config set init.author.email $email
```

上面命令指定使用`npm init`时，生成的`package.json`文件的字段默认值。

## npm info

`npm info`命令可以查看每个模块的具体信息

```ruby
$ npm info underscore
$ npm info underscore description
$ npm info underscore homepage
$ npm info underscore version
```

## npm search

`npm search`命令用于搜索npm仓库，它后面可以跟字符串，也可以跟正则表达式

```ruby
  $ npm search <搜索词>
```

## npm list

`npm list`命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。

```php
npm list
npm list -global
npm list vue
```

加上global参数，会列出全局安装的模块。

## npm install

> Node模块采用`npm install`命令安装

#### 全局安装

> `-g`后缀: 表示该包安装在电脑的系统目录,各个项目都可以调用,一般来说全局安装适用于工具模块

#### 本地安装

> 默认无后缀就是本地安装,安装在项目的`node_modules`文件夹中,只有当前项目可以使用

```
# 本地安装
$ npm install <package name>

# 全局安装
$ sudo npm install -global <package name>
$ sudo npm install -g <package name>

# 也支持直接输入Github代码库地址
$ npm install git://github.com/package/path.git
$ npm install git://github.com/package/path.git#0.1.0

# 强制重新安装
$ npm install <packageName> --force

# 如果你希望，所有模块都要强制重新安装，那就删除node_modules目录，重新执行npm install
$ rm -rf node_modules
$ npm install
```

## 安装不同版本

> install命令总是默认安装最新版本,如果需要安装指定版本,可以在模块名后面加@和版本号

```
$ npm install sax@latest
$ npm install sax@0.1.1
$ npm install sax@">=0.1.0 <0.2.0"

# 如果使用--save-exact参数，会在package.json文件指定安装模块的确切版本
$ npm install readable-stream --save --save-exact

$ npm install sax --save  // -S
$ npm install node-tap --save-dev // -D
# 或者
$ npm install sax -S
$ npm install node-tap -D

# 如果要安装beta版本的模块，需要使用下面的命令
# 安装最新的beta版
$ npm install <module-name>@beta (latest beta)
# 安装指定的beta版
$ npm install <module-name>@1.3.1-beta.3

# npm install默认会安装dependencies字段和devDependencies字段中的所有模块，如果使用--production参数，可以只安装dependencies字段的模块
$ npm install --production
# 或者
$ NODE_ENV=production npm install
```

## npm update

> 更新本地安装的模块版本
>
> 更新流程: 先到远程仓库查询最新版本,然后查询本地版本,如果本地版本不存在,或者远程版本较新,就会安装
>
> 使用`_S/--save`参数,可以在安装更新的时候同时更新`package.json`的版本号

```
# 升级当前项目的指定模块
$ npm update [package name]

# 升级全局安装的模块
$ npm update -global [package name]

注意，从`npm v2.6.1`开始，npm update只更新顶层模块，而不更新依赖的依赖，以前版本是递归更新的。如果想取到老版本的效果，要使用下面的命令。
$ npm --depth 9999 update
```

## npm uninstall

> 卸载已经安装的模块

```
$ npm uninstall [package name]

# 卸载全局模块
$ npm uninstall [package name] -global
```

## npm run

> npm 不仅可以用于模块管理,可以用于执行脚本
>
> 在`package.json`中的`script`字段可以用于设置脚本和命令,直接npm run加指定脚本的命令即可运行脚本
>
> npm run 命令会自动在环境变量 $PATH 添加 node_modules/.bin 目录，所以 scripts 字段里面调用命令时不用加上路径，这就避免了全局安装 NPM 模块。

```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
 $ npm run test//运行指定脚本,也可以在script自定义自己的脚本
```

> npm run 如果不加任何参数，直接运行，会列出 package.json 里面所有可以执行的脚本命令。
>
> npm内置了两个命令简写，npm test 等同于执行 npm run test，npm start 等同于执行 npm run start。

## pre- 和 post-脚本

npm run 为每条命令提供了 pre- 和 post- 两个钩子（hook）。以 npm run lint 为例，执行这条命令之前，npm会先查看有没有定义 prelint 和 postlint 两个钩子，如果有的话，就会先执行 npm run prelint，然后执行 npm run lint，最后执行npm run postlint。

## npx

> 将包安装到全局模块后可以直接使用命令运行,比如: `stylus`可以直接`stylus -V`查询版本号,但是本地模块的包无法直接使用包对应的命令,
>
> - npx和script一致可以帮我们直接运行 .bin目录下的内容
> - 如果.bin目录下存在 会执行对应脚本，如果不存在会下载运行
>
> npx 模块命令 调用本地项目的node_modules 下的 .bin/ 里对应模块的程序
>
> npx 只是一个临时的使用方案。 npm5.2 之后产生的

```
npx stylus -V
```

## npm link

就是将当前的目录临时的放到全局下。

开发 NPM 模块的时候，有时我们会希望，边开发边试用，比如本地调试的时候，require('myModule') 会自动加载本机开发中的模块。Node规定，使用一个模块时，需要将其安装到全局的或项目的 node_modules 目录之中。对于开发中的模块，解决方法就是在全局的 node_modules 目录之中，生成一个符号链接，指向模块的本地目录。

npm link 就能起到这个作用，会自动建立这个符号链接。

请设想这样一个场景，你开发了一个模块 myModule，目录为 src/myModule，你自己的项目 myProject 要用到这个模块，项目目录为 src/myProject。首先，在模块目录（src/myModule）下运行 npm link 命令。



```ruby
src/myModule$ npm link
```

上面的命令会在NPM的全局模块目录内，生成一个符号链接文件，该文件的名字就是 package.json 文件中指定的模块名。



```csharp
/path/to/global/node_modules/myModule -> src/myModule
```

这个时候，已经可以全局调用 myModule 模块了。但是，如果我们要让这个模块安装在项目内，还要进行下面的步骤。

切换到项目目录，再次运行 npm link 命令，并指定模块名。



```ruby
src/myProject$ npm link myModule
```

上面命令等同于生成了本地模块的符号链接。



```ruby
src/myProject/node_modules/myModule -> /path/to/global/node_modules/myModule
```

然后，就可以在你的项目中，加载该模块了。



```jsx
var myModule = require('myModule');
```

这样一来，myModule 的任何变化，都可以直接反映在 myProject 项目之中。但是，这样也出现了风险，任何在myProject目录中对myModule的修改，都会反映到模块的源码中。

如果你的项目不再需要该模块，可以在项目目录内使用 npm unlink 命令，删除符号链接。



```ruby
src/myProject$ npm unlink myModule
```

## npm bin

```ruby
# 项目根目录下执行
$ npm bin
./node_modules/.bin
```

## npm adduser

```ruby
$ npm adduser
Username: YOUR_USER_NAME
Password: YOUR_PASSWORD
Email: YOUR_EMAIL@domain.com
```

## npm publish

npm publish用于将当前模块发布到npmjs.com。执行之前，需要向npmjs.com申请用户名。



```ruby
# 需要向npmjs.com申请用户名
$ npm adduser

# 登录
$ npm login

# 发布
$ npm publish

# 如果当前模块是一个beta版，比如1.3.1-beta.3，那么发布的时候需要使用tag参数，将其发布到指定标签，默认的发布标签是latest
$ npm publish --tag beta

# 如果发布私有模块，模块初始化的时候，需要加上scope参数。只有npm的付费用户才能发布私有模块。
$ npm init --scope=<yourscope>

# 如果你的模块是用ES6写的，那么发布的时候，最好转成ES5。首先，需要安装Babel。
$ npm install --save-dev babel-cli@6 babel-preset-es2015@6
```

然后，在package.json里面写入build脚本。



```bash
"scripts": {
  "build": "babel source --presets babel-preset-es2015 --out-dir distribution",
  "prepublish": "npm run build"
}
```

运行上面的脚本，会将 source 目录里面的ES6源码文件，转为 distribution 目录里面的 ES5 源码文件。然后，在项目根目录下面创建两个文件 .npmignore 和 .gitignore，分别写入以下内容。



```cpp
// .npmignore
source

// .gitignore
node_modules
distribution
```

## npm deprecate

如果想废弃某个版本的模块，可以使用 npm deprecate 命令。



```kotlin
$ npm deprecate my-thing@"< 0.2.3" "critical bug fixed in v0.2.3"
```

## github / npm

## npm版本号管理的问题

- semver规范 规定了版本号 由3位组成  MAJOR MINOR  PATCH
  - MAJOR 可能不在兼容老版本
  - MINOR 新增了一些兼容旧版本的api vue.observable
  - PATCH 修复bug

> 都是git的tag 对应着npm的版本



```bash
npm version major minor patch
```

> 会自动和git进行关联

## 版本号含义

- 2.2.0  必须是2.2.0

- ^2.2.0   限定大版本，后面更新只要不超过2尽可以

- ~2.2.0   限定前两个版本，后面的版本只要比0大就可以

- =2.0   大于这个版本

- <=2.0

- 1.0.0 - 2.0.0

预发版本

- alpha 预览版 内部测试版
- beta  测试版 公开测试版
- rc    最终测试版本

## scripts

- 可以配置脚本的命令 快捷键(可以把很长的命令放到scripts中)
- 执行命令  会将当前的node_modules目录下的.bin文件夹放到全局中(所以可以直接使用)
- npm run start 可以简写成 npm start

## npx

- npx和script一致可以帮我们直接运行 .bin目录下的内容
- 如果.bin目录下存在 会执行对应脚本，如果不存在会下载运行

npx 模块命令 调用本地项目的node_modules 下的 .bin/ 里对应模块的程序

> npx 只是一个临时的使用方案。 npm5.2 之后产生的

## 源的切换 (npm nrm nvm)

- npm install nrm -g
- nrm ls / nrm use

## 包的发布

- 如何发布一个包 先注册npm账号
- 一定要在官方源上发
- npm addUser 添加用户
- npm publish 发布包

## 常用npm 命令

```js
# 更新npm最新版本
npm install npm@latest -g
 
# 查看npm命令列表
npm help
 
#查看各个命令的简单用法
npm -l
 
#查看npm版本
npm -v
 
#查看npm的配置
npm config list- l
 
 
#初始化生成package.json文件,可以自定义设置，
#也可以使用默认值安装,-ye后缀直接跳过提问环节，默认安装
npm init
npm init -y
 
 
#设置环境变量，为npm init 设置默认值
npm set init-author-name 'you name'
npm set init-author-email 'your email'
npm set init-author-url 'your url'
npm set init-license 'MIT'
 
 
#搜索npm仓库，可以跟字符串，也可以跟正则表达式
npm search <搜索词>
 
 
#列出安装的依赖包列表
npm list
 
 
#安装命令，比较常用,node_modules目录如果已经存在（老版本也是如此），那么就不在安装
npm install <package_name> 
npm isntall <git url>
 
#安装最新版本
npm install <package_name>@latest
 
#安装指定版本
npm install <package_name>@0.1.1
 
#安装写到dependencies,-s是简写
npm install <package_name> --save
npm install <package_name> --s
 
 
#安装写到devDependencies,-D是简写,
npm install <package_name> --save-dev
npm install <package_name> --D
 
#安装beta版本
npm install <module-name>@beta
 
 
#npm更新
npm update <package_name>
 
 
#npm 卸载
npm uninstall <package_name>
 
 
 
#npm执行脚本，package.json文件有个scripts字段，可以定义脚本命令(lint,build)，npm直接执行
npm run lint
npm run build
 
 
#npm run 执行script下面所有的命令
npm run
 
 
#dev 脚本，开发阶段要做的处理.dev是自定义命令
npm run dev 
 
#serve,脚本用于启动服务,serve是自定义命令
npm run serve
 
```

## 关于环境

**开发环境（development）**：开发环境是程序猿们专门用于开发的服务器，配置可以比较随意， 为了开发调试方便，一般打开全部错误报告。(程序员接到需求后，开始写代码，开发，运行程序，看看程序有没有达到预期的功能；)

**测试环境（testing）**：一般是克隆一份生产环境的配置，一个程序在测试环境工作不正常，那么肯定不能把它发布到生产机上。(程序员开发完成后，交给测试部门全面的测试，看看所实现的功能有没有bug，测试人员会模拟各种操作情况；)

**生产环境（production）**：是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(就是线上环境，发布到对外环境上，正式提供给客户使用的环境。)

## package-lock.json 属性

dependencies属性是一个对象，配置模块依赖的模块列表，key是模块名称，value是版本范围，版本范围是一个字符，可以被一个或多个空格分割。
dependencies也可以被指定为一个git地址或者一个压缩包地址。
不要把测试工具或transpilers写到dependencies中。 下面是一些写法，详见https://docs.npmjs.com/misc/semver

- version 精确匹配版本
- \>version 必须大于某个版本
- \>=version 大于等于
- <version 小于
- <=versionversion 小于
- ~version "约等于"，具体规则详见semver文档
- ^version "兼容版本"具体规则详见semver文档
- 1.2.x 仅一点二点几的版本
- http://... 见下面url作为denpendencies的说明
- - 任何版本
- "" 空字符，和*相同
- version1 - version2 相当于 >=version1 <=version2.
- range1 || range2 范围1和范围2满足任意一个都行
- git... 见下面git url作为denpendencies的说明
- user/repo See 见下面GitHub仓库的说明
- tag 发布的一个特殊的标签，见npm-tag的文档 https://docs.npmjs.com/getting-started/using-tags
- path/path/path 见下面本地模块的说明