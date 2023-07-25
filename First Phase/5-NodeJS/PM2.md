# PM2 



pm2 是 node 进程管理工具，可以利用它来简化很多 node 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，因为在工作中遇到服务器重启后，需要一个个去重新启动每个服务，这样不仅繁琐、效率低，而且容易遗忘开启一些服务，所以特地对 pm2 进行一次比较全面的学习+实践，在解决工作问题的同时，进行一次较完整的学习实践总结，现分享给大家。



## 一、安装 & 目录

1、运行以下命令进行全局安装

```
$ npm install -g pm2

```

2、安装完之后，会自动创建以下目录：

```
$HOME/.pm2/logs // 包括所有应用的日志
$HOME/.pm2/pids // 包括所有应用的 pids
$HOME/.pm2/dump.pm2 // 开机自启动配置
$HOME/.pm2/pm2.log // pm2 日志
$HOME/.pm2/pm2.pid // pm2 pid

```

## 二、常用命令

1、启动命令

```
$ pm2 start app.js
```

2、命令行参数

我们可以在最基本的启动命令后面，添加一些参数选项，去满足我们的需求，常用的参数选项如下所示：

- --watch：监听应用目录的变化，一旦发生变化，自动重启。
- -i  or --instance：启用多少个实例，可用于负载均衡，如果 -i 0 或者 -i max，则根据当前机器核数确定实例数目。
- --ignore-watch：排除监听的目录或文件，可以是特定的文件名，也可以是正则。
- -n  or --name：应用的名称，查看应用信息的时候可以用到。
- -o or --output path：标准输出日志文件的路径。
- -e or --error path：错误输出日志文件的路径。

我们在启动命令后面加入以上的一些参数，完整的启动命令如下所示：

```
$ pm2 start app.js --watch -i max -n first_app

```

启动成功后的截图如下，我们通过截图可以看到启动的应用名称变为 first_app，然后启动四个进程，说明我们在启动命令后面添加的参数已经起作用。

3、重启命令

```
$ pm2 restart app.js

```

4、停止命令

停止特定的应用，可以通过 pm2 list 先获取应用的名字或者进程的 id，然后再调用以下命令停止相应的应用；

```
$ pm2 stop app_name | app_id

```

如果需要停止全部的应用，则使用以下命令：

```
$ pm2 stop all

```

5、删除命令

删除特定的应用，可以通过 pm2 list 先获取应用的名字或者进程的 id，然后再调用以下命令删除相应的应用；

```
$ pm2 delete app_name | app_id

```

如果需要删除全部的应用，则使用以下命令：

```
$ pm2 delete all

```

6、查看有哪些进程

```
$ pm2 list

```

7、查看某个进程的信息

```
$ pm2 descripe app_name | app_id
```

## 三、配置文件

如果我们使用命令行参数定义一些选项，那么每次启动进程时，都需要敲上一大堆的命令，非常繁琐,设置一个配置文件 pm2.json ，然后在 package.json 文件中配置启动命令 "pm2": "pm2 start pm2.json" ，这样我们只需要运行 npm run pm2 就可以使用 pm2 启动我们的 express 项目，并且相关运行参数直接在 pm2.json 中配置好了。相关配置项表示的意义在下面文件中都已经注释说明，就不在一一解释了。

```
{
    "apps": {
        "name": "express_project",       // 项目名          
        "script": "app.js",              // 执行文件
        "cwd": "./",                     // 根目录
        "args": "",                      // 传递给脚本的参数
        "interpreter": "",               // 指定的脚本解释器
        "interpreter_args": "",          // 传递给解释器的参数
        "watch": true,                   // 是否监听文件变动然后重启
        "ignore_watch": [                // 不用监听的文件
            "node_modules",
            "public"
        ],
        "exec_mode": "cluster_mode",     // 应用启动模式，支持 fork 和 cluster 模式
        "instances": "max",              // 应用启动实例个数，仅在 cluster 模式有效 默认为 fork
        "error_file": "./logs/app-err.log",         // 错误日志文件
        "out_file": "./logs/app-out.log",           // 正常日志文件
        "merge_logs": true,                         // 设置追加日志而不是新建日志
        "log_date_format": "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
        "min_uptime": "60s",                        // 应用运行少于时间被认为是异常启动
        "max_restarts": 30,                         // 最大异常重启次数
        "autorestart": true,                        // 默认为 true, 发生异常的情况下自动重启
        "restart_delay": "60"                       // 异常重启情况下，延时重启时间
        "env": {
           "NODE_ENV": "production",                // 环境参数，当前指定为生产环境
           "REMOTE_ADDR": ""               
        },
        "env_dev": {
            "NODE_ENV": "development",              // 环境参数，当前指定为开发环境
            "REMOTE_ADDR": ""
        },
        "env_test": {                               // 环境参数，当前指定为测试环境
            "NODE_ENV": "test",
            "REMOTE_ADDR": ""
        }
    }
}

```

## 四、高阶应用

### 1、负载均衡

可以使用 -i 参数配置集群数，实现负载均衡，相关命令如下，可以查看 [官网章节](https://pm2.keymetrics.io/docs/usage/cluster-mode/#automatic-load-balancing)；

```
$ pm2 start app.js -i 3 // 开启三个进程
$ pm2 start app.js -i max // 根据机器CPU核数，开启对应数目的进程 

```

### 2、日志查看

我们可以通过打开日志文件查看日志外，还可以通过 pm2 logs 来查看实时日志，这点有对于线上问题排查；日志查看命令如下：

```
$ pm2 log
```

则我们可以在命令窗口实时看到日志输出

### 3、监控

我们可以使用以下命令，查看当前通过 pm2 运行的进程的状态；

```
$ pm2 monit
```

### 4、内存超过使用上限自动重启

我们可以使用 --max-memory-restart 参数来限制内存使用上限，当超过使用内存上限后自动重启；

```
$ pm2 start app.js --max-memory-restart 100M

```

### 5、开机自启动

在 linux 中，设置开机自启动，只需要执行以下两个步骤：

- 运行 `pm2 startup`，即在/etc/init.d/ 目录下生成 pm2-root 的启动脚本，且自动将 pm2-root 设为服务；
- 运行 `pm2 save` ，会将当前 pm2 所运行的应用保存在 /root/.pm2/dump.pm2 下，当开机重启时，运行pm2-root 服务脚本，并且到 /root/.pm2/dump.pm2 下读取应用并启动；

但在 windows 中运行 pm2 startup 时，会报以下错误，因为其不适合 windows 系统；



我们需要额外安装其它库，如下所示：

```
$ npm install pm2-windows-startup -g
$ pm2-startup install

```

然后我们只需要运行以下保存命令，就可以将现在正在运行的服务添加到开机自启动命令中；后面即使服务器开机重启，也会将我们保存的服务自动重启；

```
$ pm2 save

```



# nodemon

https://github.com/remy/nodemon

#### 下载

```undefined
cnpm install -g  nodemon
```

安装在全局。

#### 使用

编写代码 app.js

```jsx
var express = require("express")

var app = express()

app.get('/',function(req,res) {
    res.send("hello world")
})

app.listen(3000,function(){
    console.log('server is running')
})
```

这里使用了`express`框架。

传统的方法，我们使用`node app.js`命令，程序将启动。其实，我们刚才下载的`nodemon`工具也可以用来启动。

```css
nodemon app.js
```

我们访问3000端口，可以看到hellloworld。

我们现在尝试修改一下代码：



```jsx
app.get('/',function(req,res) {
    res.send("hello express")
})
```

保存之后，我们可以看到命令行中，输出了以下内容：



```css
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
```

我们只需要刷新浏览器，就可以看到改动后的内容。

实际上，我们可以看到，`nodemon`其实也是在调用`node`命令。



开发时可以使用nodemon 替代node命令 , 上线的node项目使用pm2 运行管理 