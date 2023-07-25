# MongonDB

> BSON数据存储格式,由于JSON数据格式存储效率很低,于是将json进行二进制重构为BSON(binary JSON),提高存储效率

## 安装

### 什么是NoSQL?

NoSQL，指的是非关系型的数据库。NoSQL有时也称作Not Only SQL的缩写，是对不同于传统的关系型数据库的数据库管理系统的统称。

NoSQL用于超大规模数据的存储。（例如谷歌或Facebook每天为他们的用户收集万亿比特的数据）。这些类型的数据存储不需要固定的模式，无需多余操作就可以横向扩展。



### 为什么使用NoSQL ?

今天我们可以通过第三方平台（如：Google,Facebook等）可以很容易的访问和抓取数据。用户的个人信息，社交网络，地理位置，用户生成的数据和用户操作日志已经成倍的增加。我们如果要对这些用户数据进行挖掘，那SQL数据库已经不适合这些应用了, NoSQL 数据库的发展却能很好的处理这些大的数据。

![image-20220817122737948](MongoDB.assets/image-20220817122737948.png)

### RDBMS vs NoSQL

**RDBMS**
\- 高度组织化结构化数据
\- 结构化查询语言（SQL） (SQL)
\- 数据和关系都存储在单独的表中。
\- 数据操纵语言，数据定义语言
\- 严格的一致性
\- 基础事务

**NoSQL**
\- 代表着不仅仅是SQL
\- 没有声明性查询语言
\- 没有预定义的模式
-键 - 值对存储，列存储，文档存储，图形数据库
\- 最终一致性，而非ACID属性
\- 非结构化和不可预知的数据
\- CAP定理
\- 高性能，高可用性和可伸缩性

![image-20220817122813962](MongoDB.assets/image-20220817122813962.png)

### CAP定理（CAP theorem)

在计算机科学中, CAP定理（CAP theorem）, 又被称作 布鲁尔定理（Brewer's theorem）, 它指出对于一个分布式计算系统来说，不可能同时满足以下三点:

- **一致性(Consistency)** (所有节点在同一时间具有相同的数据)
- **可用性(Availability)** (保证每个请求不管成功或者失败都有响应)
- **分隔容忍(Partition tolerance)** (系统中任意信息的丢失或失败不会影响系统的继续运作)

CAP理论的核心是：一个分布式系统不可能同时很好的满足一致性，可用性和分区容错性这三个需求，最多只能同时较好的满足两个。

因此，根据 CAP 原理将 NoSQL 数据库分成了满足 CA 原则、满足 CP 原则和满足 AP 原则三 大类：

- CA - 单点集群，满足一致性，可用性的系统，通常在可扩展性上不太强大。
- CP - 满足一致性，分区容忍性的系统，通常性能不是特别高。
- AP - 满足可用性，分区容忍性的系统，通常可能对一致性要求低一些。

![image-20220817122848259](MongoDB.assets/image-20220817122848259.png)

### NoSQL的优点/缺点

优点:

- \- 高可扩展性
- \- 分布式计算
- \- 低成本
- \- 架构的灵活性，半结构化数据
- \- 没有复杂的关系
- 高性能
  - 对嵌入式数据模型的支持减少了数据库系统上的I / O活动。
  - 索引支持更快的查询，并且可以包括来自嵌入式文档和数组的键。

缺点:

- \- 没有标准化
- \- 有限的查询功能（到目前为止）
- \- 最终一致是不直观的程序

### 分布式文件存储数据库

MongoDB中的记录是一个文档，它是由字段和值对组成的数据结构。MongoDB文档类似于JSON对象。字段的值可以包括其他文档，数组和文档数组。

![image-20220817122935439](MongoDB.assets/image-20220817122935439.png)

使用文档的优点是：

- 文档（即对象）对应于许多编程语言中的本机数据类型。
- 嵌入式文档和数组减少了对昂贵连接的需求。
- 动态模式支持流畅的多态性。

### 基本概念

在mongodb中基本的概念是**文档**(document)、**集合**(collection)、**数据库**(database)

- 数据库(database)：是一个仓库，仓库中可以存放集合
- 集合(collections)：类似数组，在集合中可以存放文档
- 文档(document)：文档数据库的最小单位，我们存储和操作的内容全部是文档

![image-20220817123019156](MongoDB.assets/image-20220817123019156.png)

### 主要特点

- MongoDB 是一个面向文档存储的数据库，操作起来比较简单和容易。
- 你可以在MongoDB记录中设置任何属性的索引 (如：FirstName="Sameer",Address="8 Gandhi Road")来实现更快的排序。
- 你可以通过本地或者网络创建数据镜像，这使得MongoDB有更强的扩展性。
- 如果负载的增加（需要更多的存储空间和更强的处理能力） ，它可以分布在计算机网络中的其他节点上这就是所谓的分片。
- Mongo支持丰富的查询表达式。查询指令使用JSON形式的标记，可轻易查询文档中内嵌的对象及数组。
- MongoDb 使用update()命令可以实现替换完成的文档（数据）或者一些指定的数据字段 。
- Mongodb中的Map/reduce主要是用来对数据进行批量处理和聚合操作。
- Map和Reduce。Map函数调用emit(key,value)遍历集合中所有的记录，将key与value传给Reduce函数进行处理。
- Map函数和Reduce函数是使用Javascript编写的，并可以通过db.runCommand或mapreduce命令来执行MapReduce操作。
- GridFS是MongoDB中的一个内置功能，可以用于存放大量小文件。
- MongoDB允许在服务端执行脚本，可以用Javascript编写某个函数，直接在服务端执行，也可以把函数的定义存储在服务端，下次直接调用即可。
- MongoDB支持各种编程语言:RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言。
- MongoDB安装简单。

### MongoDB 工具

有几种可用于MongoDB的管理工具。

#### 监控

MongoDB提供了网络和系统监控工具Munin，它作为一个插件应用于MongoDB中。

Gangila是MongoDB高性能的系统监视的工具，它作为一个插件应用于MongoDB中。

基于图形界面的开源工具 Cacti, 用于查看CPU负载, 网络带宽利用率,它也提供了一个应用于监控 MongoDB 的插件。

#### GUI

- Fang of Mongo – 网页式,由Django和jQuery所构成。
- Futon4Mongo – 一个CouchDB Futon web的mongodb山寨版。
- Mongo3 – Ruby写成。
- MongoHub – 适用于OSX的应用程序。
- Opricot – 一个基于浏览器的MongoDB控制台, 由PHP撰写而成。
- Database Master — Windows的mongodb管理工具
- RockMongo — 最好的PHP语言的MongoDB管理工具，轻量级, 支持多国语言.

### MongoDB安装

#### 官网:

https://www.mongodb.com/

#### 下载地址 

win: http://downloads.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.3.zip

mac: http://downloads.mongodb.org/osx/mongodb-osx-ssl-x86_64-4.0.21.tgz (IOS 10以上)

#### window安装

1. 下载

2. 解压到根目录专用文件夹

   目录结构

   ![image-20220817123226872](MongoDB.assets/image-20220817123226872.png)

   ```
   bin/mongodb.exe --install --dbpath 数据库磁盘路径 --logpath 日志路径
   
   ***管理员运行cmd命令行*****
   
   //mongodb 安装后无服务
   
   D:\mongoDB\mongo\bin > mongod.exe --bind_ip 127.0.0.1 --logpath "D:\mongoDB\mongo\logs\mongodb.log" --logappend --dbpath "D:\mongoDB\mongo\data" --serviceName "MongoDB" --serviceDisplayName "MongoDB" --install
   ```

   查看服务是否创建

   ```
   win + R
   输入 services.msc
   查找 服务名称 MongoDB
   ```

   ![image-20220817123314981](MongoDB.assets/image-20220817123314981.png)

   启动服务

   ```
   net start mongodb
   ```

   ![image-20220817123358977](MongoDB.assets/image-20220817123358977.png)

   登录(验证服务)

   ```
   D:\mongoDB\mongo\bin>mongo
   ```

   ![image-20220817123426031](MongoDB.assets/image-20220817123426031.png)

   设置环境变量

   1. 配置环境变量(可以直接从桌面打开cmd运行mongodb)

      复制MongoDB 安装路径 D:\mongoDB\mongo\bin

      打开桌面 此电脑 ----》右键属性-----》高级系统配置---》环境变量配置-------》系统变量配置找到path变量------》新建变量   将地址复制进去。

   配置dbpath logpath也可以在bin的同级创建一个配置文件，一般以conf为文件扩展名，当然这个并不限制，例如创建一个mongodb.conf文件，并在文件中配置：

   ```
   #数据库路径
   dbpath=D:\MongoDB\mongo\data
   
   #日志输出文件路径   
   logpath=D:\MongoDB\mongo\logs\mongodb.log   
   
   #错误日志采用追加模式
   logappend=true   
   
   #启用日志文件，默认启用
   journal=true
   
   #这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false   
   quiet=true   
   
   #端口号 默认为27017 
   port=27017
   ```

## 命令

### mongoDB启动

- 命令行启动命令
  - mongod: 运行服务端,之后进入服务端
  - mongo: 运行客户端之后进入客户端
- 服务端查看命令
  - 查看帮助: mongod -help
  - 查看是否启动成功: ps ajx|grep mongod
  - 默认端口: 207107
  - 日志的位置: /var/log/mongodb/mongod.log
- 客户端查看命令
  - 启动本地客户端: mongo
  - 查看帮助: mongo -help
  - 退出: exit或者ctrl+c

### 开启关闭mongoDB服务

开启服务

```
net start MongoDB
```

关闭服务

```
net stop MongoDB
```

### MongoDB基础语法

#### MongoDB数据类型

| 数据类型           | 说明                                     |
| ------------------ | ---------------------------------------- |
| String             | 字符串                                   |
| Integer            | 整形                                     |
| Boolean            | 布尔值                                   |
| Double             | 双精度浮点值                             |
| Min/Max keys       | 将一个值与BSON元素的最低值和最高值相对比 |
| Array              | 用于将数组或列表或多个值存储为一个值     |
| Timestamp          | 时间戳                                   |
| Object             | 内嵌文档                                 |
| Null               | 空值                                     |
| Symbol             | 符号                                     |
| Date               | 日期时间                                 |
| Object ID          | 对象ID                                   |
| Binary Data        | 二进制数据                               |
| Code               | 代码类型                                 |
| Regular expression | 正则表达式类型                           |

#### mongod 命令常用参数

> mongod 是MongoDB系统的主要守护进程,用于处理数据请求,数据访问和执行后台管理操作,必须启动,才能访问数据库,启动时常用参数是:

- **--dbpath **：存储MongoDB数据文件的目录
- **--directoryperdb**：指定每个数据库单独存储在一个目录中（directory），该目录位于--dbpath指定的目录下，每一个子目录都对应一个数据库名字。Uses a separate directory to store data for each database. The directories are under the --dbpath directory, and each subdirectory name corresponds to the database name.
- **--logpath **：指定mongod记录日志的文件
- **--fork**：以后台deamon形式运行服务
- **--journal**：开始日志功能，通过保存操作日志来降低单机故障的恢复时间
- **--config**（或-f）<config_file_path>：配置文件，用于指定runtime options
- **--bind_ip **：指定对外服务的绑定IP地址
- **--port **：对外服务窗口
- **--auth**：启用验证，验证用户权限控制
- **--syncdelay**：系统刷新disk的时间，单位是second，默认是60s
- **--replSet **：以副本集方式启动mongod，副本集的标识是setname

### MongoDB shell操作

#### 原生方法

**Date()**

若直接使用Date(),则直接放回当前日期字符串.

若使用new Date([option]),则shell会使用ISODatehelper来包装成指定日期对象，可传类型如下：

1. new Date(“YYYY-mm-dd”)：返回指定日期的ISODate
2. new Date(“YYYY-mm-ddTHH:MM:ss”)：返回shell客户端当前时区的指定时间的ISODate格式
   的时间。
3. new Date(“YYYY-mm-ddTHH:MM:ssZ”)：返回指定时间的UTC时间的ISODate格式的时间
   specifies the datetime in UTC and returns theISODatewith the specified datetime in UTC.
4. new Date(integer)：返回从1970年1月1日到指定的毫秒数的ISODate格式的时间。

**UUID(hex_string)**

​	将32字节的十六进制字符串抓换成BSON子类型的UUID

**ObjectId.valueOf()**

​	讲一个ObjectId的属性str显示为十六进制字符串

**Mongo.getDB(database)**

​	返回一个数据库对象，它标识指定的数据库

**Mongo(host:port)**

​	创建一个连接对象，它连接到指定的主机和端口

**connect(string)**

​	连接到指定MongoDB实例中的指定数据库，返回一个数据库对象，string的格式如：	host:port/database，如db = connect(“localhost:27017/test”),该语法等同于Mongo(host:port).getDB(database)

**cat(path)**

​	与linux差不多，返回指定路径的文件的内容

**version()**

​	返回当前MongoDB shell的版本

**cd(path)**

​	将工作目录切换到指定路径

**getMemInfo()**

​	返回当前shell占用的内存量

**hostname()**

​	返回运行当前MongoDB shell 的系统的主机名

**load(path)**

​	在shell中加载并运行参数path指定的js文件

**_rand()**

​	返回一个0~1的随机数

#### mongo命令

##### 查看数据库

```
show databases
show dbs
```

> 默认有三个数据库:
>
> admin : 管理操作mongoDB的用户信息,
>
> config: 数据库配置信息
>
> local : 存放数据库操作日志

##### 进入/创建 数据库

> 创建不存在的数据库会进行隐式创建,当该数据库存入数据后会显示创建

```
use 数据库名
```

数据库名称满足下列条件

- 不能是空字符串（"")。
- 不得含有' '（空格)、.、$、/、\和\0 (空字符)。
- 应全部小写。
- 最多64字节。
- 不能是默认数据库

##### 查看当前

> 可查看当前数据库对象集合

```
db
```

##### 删除数据库

> db.什么什么 中db表示当前数据库对象,因此操作前应该先进入数据库

```
db.dropDatabase() 
```

##### 创建集合

> 插入文档时,MongoDB首先检查固定集合的size字段,然后检查max字段

```
db.createCollection("集合名称",option)
option: {
	capped: 布尔值,可选,如果为true,则创建固定集合,固定集合指的是有着固定大小的集合,超过最大值时会自动覆盖掉原来的文档,为true必须指定size参数
	size: 固定集合指定最大值,即字节数,如果capped为true必须指定该字段值
	max: 指固定集合中包含文档的最大值
}
指定option中的capped后,一般做为日志集合,可以自动覆盖以前的日志
```

##### 查看集合

```
show collections
show tables
```

##### 删除集合

```
db.集合名称.drop()
```

##### 插入文档

```
db.集合名称.insert(文档对象)
db.集合名称.insertOne(文档对象,{
 配置
})
db.集合名称.insertMany([
	文档对象,
	文档对象,
	文档对象
],{
	配置
})
配置:
- document：要写入的文档。
- writeConcern：写入策略，默认为 1，即要求确认写操作，0 是不要求。
- ordered：指定是否按顺序写入，默认 true，按顺序写入。
```

##### 删除文档

MongoDB数据更新可以使用update()函数。在执行remove()函数前先执行find()命令来判断执行的条件是否正确，这是一个比较好的习惯。

remove() 方法的基本语法格式如下所示：

```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```

**参数说明：**

- **query** :（可选）删除的文档的条件。
- **justOne** : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
- **writeConcern** :（可选）抛出异常的级别。

##### 更新文档

MongoDB 使用 **update()** 和 **save()** 方法来更新集合中的文档。接下来让我们详细来看下两个函数的应用及其区别。

update() 方法用于更新已存在的文档。语法格式如下：

```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,是否修改多个对象,最常用
     writeConcern: <document>
   }
)
参数:
query: 一个对象,表示查询条件{"id": "1000"},擦汗寻id是100的对象
update: 修改目标值{},
	操作符: $set:{"修改的键名": 值} 其他操作符在下面会详细说明
配置
```

**参数说明：**

- **query** : update的查询条件，类似sql update查询内where后面的。
- **update** : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- **upsert** : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- **multi** : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- **writeConcern** :可选，抛出异常的级别。

##### 更新操作符

> 更新操作第二个参数的操作符 

1.$inc

用法：{$inc:{field:value}}

作用：对一个数字字段的某个field增加value

示例：将name为chenzhou的学生的age增加5

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "name" : "chenzhou", "age" : 22 }
#查询结果显示年龄为22
> db.students.update({name:"chenzhou"},{$inc:{age:5}})
#执行修改，把age增加5
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "name" : "chenzhou", "age" : 27 }
> 
#查询结果显示年龄为27，修改成功
```

2.$set

用法：{$set:{field:value}}

作用：把文档中某个字段field的值设为value

示例： 把chenzhou的年龄设为23岁

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "name" : "chenzhou", "age" : 27 }
> db.students.update({name:"chenzhou"},{$set:{age:23}})
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "name" : "chenzhou", "age" : 23 }
```

从结果可以看到，更新后年龄从27变成了23

3.$unset

用法：{$unset:{field:1}}

作用：删除某个字段field

示例： 将chenzhou的年龄字段删除

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "name" : "chenzhou", "age" : 23 }
> db.students.update({name:"chenzhou"},{$unset:{age:1}})
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "name" : "chenzhou" }
```

4.$push

用法：{$push:{field:value}}

作用：把value追加到field里。注：field只能是数组类型，如果field不存在，会自动插入一个数组类型

示例：给chenzhou添加别名"michael"

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "name" : "chenzhou" }
> db.students.update({name:"chenzhou"},{$push:{"ailas":"Michael"}})
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "Michael" ], "name" : "chenzhou" }
> 
```

由结果可以看到，记录中追加了一个数组类型字段alias，且字段有一个为"Michael"的值

5.pushAll

用法：{$pushAll:{field:value_array}}

作用：用法同$push一样，只是$pushAll可以一次追加多个值到一个数组字段内。

示例：给chenzhou追加别名A1，A2

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "Michael" ], "name" : "chenzhou" }
> db.students.update({name:"chenzhou"},{$pushAll:{"ailas":["A1","A2"]}})
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "Michael", "A1", "A2" ], "name" : "chenzhou" }
> 
```

6.$addToSet

用法：{$addToSet:{field:value}}

作用：加一个值到数组内，而且只有当这个值在数组中不存在时才增加。

示例：往chenzhou的别名字段里添加两个别名A3、A4 

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "Michael", "A1", "A2" ], "name" : "chenzhou" }
> db.students.update({name:"chenzhou"},{$addToSet:{"ailas":["A3","A4"]}})
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "Michael", "A1", "A2", [ "A3", "A4" ] ], "name" : "chenzhou" }
> 
```

由结果可以看出，更新后ailas字段里多了一个对象，这个对象里包含2个数据，分别是A3、A4

7.$pop

用法：删除数组内第一个值：{$pop:{field:-1}}、删除数组内最后一个值：{$pop:{field:1}}

作用：用于删除数组内的一个值

示例： 删除chenzhou记录中alias字段中第一个别名

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "Michael", "A1", "A2", [ "A3", "A4" ] ], "name" : "chenzhou" }
> db.students.update({name:"chenzhou"},{$pop:{"ailas":-1}})
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "A1", "A2", [ "A3", "A4" ] ], "name" : "chenzhou" }
> 
```

由结果可以看书，第一个别名Michael已经被删除了。

我们再使用命令删除最后一个别名：

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "A1", "A2", [ "A3", "A4" ] ], "name" : "chenzhou" }
> db.students.update({name:"chenzhou"},{$pop:{"ailas":1}})
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "A1", "A2" ], "name" : "chenzhou" }
> 
```

由结果可以看出，alias字段中最后一个别名["A3","A4"]被删除了。

8.$pull

用法：{$pull:{field:_value}}

作用：从数组field内删除一个等于_value的值

示例：删除chenzhou记录中的别名A1

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "A1", "A2" ], "name" : "chenzhou" }
> db.students.update({name:"chenzhou"},{$pull:{"ailas":"A1"}})
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "A2" ], "name" : "chenzhou" }
> 
```

9.$pullAll

用法：{$pullAll:value_array}

作用：用法同$pull一样，可以一次性删除数组内的多个值。

示例： 删除chenzhou记录内的所有别名

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ "A1", "A2" ], "name" : "chenzhou" }
> db.students.update({name:"chenzhou"},{$pullAll:{"ailas":["A1","A2"]}})
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ ], "name" : "chenzhou" }
> 
```

可以看到A1和A2已经全部被删除了

10.$rename

用法：{$rename:{old_field_name:new_field_name}}

作用：对字段进行重命名

示例：把chenzhou记录的name字段重命名为sname

```
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ ], "name" : "chenzhou" }
> db.students.update({name:"chenzhou"},{$rename:{"name":"sname"}})
> db.students.find()
{ "_id" : ObjectId("5030f7ac721e16c4ab180cdb"), "ailas" : [ ], "sname" : "chenzhou" }
> 
```

##### 查询文档

```
db.集合名称.find() 查询集合中所有文档,以非格式化形式显示
db.集合名称.findOne() 只返回一个文档
```

**实例**

MongoDB 查询数据的语法格式如下：

```
db.collection.find(query, projection)
```

- **query** ：可选，使用查询操作符指定查询条件
- **projection** ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：

```
db.col.find().pretty() 方法以格式化的方式来显示所有文档
```

**查询对象指定值**

```
db.集合名称.find(条件,指定返回参数对象),为1表示查询该属性,为0表示不查询该属性
例:
db.users.find({level:{$lt:5}},{username: 1}) 表示查询level值大于5的对象的username属性
若不指定_id为0
则默认查找会同时查找出ID
```

##### 计数

```
db.集合名称.count()
查询集合有多少条文档
```

##### 条件操作符

| 操作       | 格式         | 范例                                        |
| :--------- | :----------- | :------------------------------------------ |
| 等于       | `{:`}        | `db.col.find({"by":"jojo"}).pretty()`       |
| 小于       | `{:{$lt:}}`  | `db.col.find({"likes":{$lt:50}}).pretty()`  |
| 小于或等于 | `{:{$lte:}}` | `db.col.find({"likes":{$lte:50}}).pretty()` |
| 大于       | `{:{$gt:}}`  | `db.col.find({"likes":{$gt:50}}).pretty()`  |
| 大于或等于 | `{:{$gte:}}` | `db.col.find({"likes":{$gte:50}}).pretty()` |
| 不等于     | `{:{$ne:}}`  | `db.col.find({"likes":{$ne:50}}).pretty()`  |

```
db.集合名.find("字段名";{$lt:5})查询字段名小于五的对象
```

**AND 条件**

```
db.col.find({key1:value1, key2:value2}).pretty()
```

**OR 条件**

```
db.col.find({$or: [{key1: value1}, {key2:value2}]}).pretty()
```

##### 删除文档

```
db.集合名.remove(条件)
```

##### 排序

```
db.集合名称.find().sort("字段名": 1)根据字段值升序排序,-1降序,非数字:按照ASCII码排序,数字按照大小排序
```

## 索引

> 没有索引时,每次查询必须扫描每个文件并选取符合条件的记录,这种方式查询效率非常低下,为了提高查询效率,就要给集合设置索引,
>
> 索引是一种特殊的数据结构,索引存储在一个易于遍历读取的数据集合中,索引是对数据库表中一列或多列的值进行排序的一种结构
>
> **注意点**
>
> 索引可以指定多个字段联合创建称为复合索引,创建过复合索引的字段,创建单独索引时不要使用

### 索引操作

```
创建:
db.集合名称.createIndex({"创建索引依据的字段名": -1}) -1表示降序,1表示升序
查看索引:
db.集合名称.createIndex(),可以查看该集合上所有索引
删除:
db.集合名称.dropIndex("创建索引依据字段名": -1) 注意创建时是降序这里也是降序

索引不能修改只能删除重新创建,创建完毕后,find时根据索引就可以更快的查询

创建时其他参数:
db.集合名称.createIndex({"创建索引依据的字段名": -1},{"background": true})如下表:
```

| Parameter          | Type          | Description                                                  |
| :----------------- | :------------ | :----------------------------------------------------------- |
| background         | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为**false**。 |
| unique             | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值为**false**. |
| name               | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。 |
| dropDups           | Boolean       | **3.0+版本已废弃。**在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 **false**. |
| sparse             | Boolean       | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 **false**. |
| expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。 |
| v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。 |
| weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
| default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语 |
| language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language. |

#### $where

> 在查询时通过js代码来进行查询

```
db.集合名称.find({$where:function(){return this.username > 2}})
this表示查询的每一个文档实例
上述表示 查询username大于2的所有值
```

### 全文索引

MongoDB 的全文检索提供三个版本，用户在使用时可以指定相应的版本，如果不指定则默认选择当前版本对应的全文索引。

MongoDB 提供的文本索引支持对字符串内容的文本搜索查询，但是这种索引因为需要检索的文件比较多，因此在使用的时候检索时间较长。

全文索引的语法结构如下：

db.collection.createIndex ({ key: "text" })

### 散列索引

散列（Hashed）索引是指按照某个字段的散列值来建立索引，目前主要用于 MongoDB Sharded Cluster 的散列分片，散列索引只能用于字段完全匹配的查询，不能用于范围查询等。

散列其语法如下：

db.collection.createlndex( { _id : "hashed" })

MongoDB 支持散列任何单个字段的索引，但是不支持多键（即数组）索引。

需要说明的是，MongoDB 在进行散列索引之前，需要将浮点数截断为 64 位整数。例如，散列将对 2.3、2.2 和 2.9 这些值产生同样的返回值。

上面列出的都是索引的类别，在每个索引的类别上还可以加上一些参数，使索引更加具有针对性，常见的参数包括稀疏索引、唯一索引、过期索引等。

稀疏索引只检索包含具有索引字段的文档，即使索引字段包含空值，检索时也会跳过所有缺少索引字段的文档。因为索引不包含集合的所有文档，所以说索引是稀疏的。相反，非稀疏索引包含集合中的所有文档，存储不包含索引字段的文档的空值。

设置稀疏索引的语法如下：

db.collection.createlndex ({ "key" : 1 }, { sparse : true })


如果设置了唯一索引，新插入文档时，要求 key 的值是唯一的，不能有重复的出现，设置唯一索引的语法如下：

db.collection.createlndex ({ "key" : 1 }, { unique: true })


过期索引是一种特殊的单字段索引，MongoDB 可以用来在一定时间或特定时间后从集合中自动删除文档。

过期索引对于处理某些类型的信息非常有用，例如，机器生成的事务数据、日志和会话信息，这些信息只需要在数据库中存在有限的时间，不需要长期保存。

创建过期索引的语法如下:

db.collection.createlndex( {"key" : 1 }, { expireAfterSeconds: 3600 })

需要注意的是，MongoDB 是每 60s 执行一次删除操作，因此短时间内执行会出现延迟现象。

## mongoose驱动

> mongoose连接了nodeJS和mongoDB,并封装了原生的方法供我们快捷使用

### 准备

```
1.安装 npm i mongoose
2.引入 const mongoose = require("mongoose")
3.连接数据库: mongoose.connect("数据库地址")
4.监听连接: 
	let db = mongoose.conection
	db.on("error",function(err){
		监听连接错误
	})
	db.on("open",()=>{
		监听连接成功
	})
```

### mongoose概念

#### Schema

> 模式对象,定义集合中文档的结构

```
let schame = mongoose.Schame({
	"字段名称":{
		配置
	}
},option)
字段配置参数:
通用:
	type: String Buffer,Boolean,Mixed,ObjectID,Array,Decimall128,字段数据类型
	required: 布尔值或者函数,为true时为此字段添加required验证,表示系字段是必须的
	default: 任何值或者函数,指定该字段的默认值,若是函数,则默认是该函数的返回值
	select: 布尔值,指定query的默认值proiections
	validate: 函数,对该字段的值进行校验
	get: getter
	set: setter
	alias: 字符串,为该字符串设置虚拟值
索引参数使用该字段设置索引:
	index: Boolean,表示是否创建该字段索引
	unique: boolean,表示对这个属性创建唯一索引
	sparse: boolean,表示对这个属性创建稀疏索引
不同类型的参数:
	string: 
		lowercase: boolean,是否在保存前对此此字段值调用.toLowerCase()
		uppercase: boolean,是否在保存前对此此字段值调用.toUpperCase()
		trim: boolean,是否在保存前对此此字段值调用.trim()
		math: 正则表达式,创建验证器检查这个值是否匹配给定的正则
		enum: 数组,创建验证器检查这个值是否包含于给定的数组
	Number:
		min: 创建验证器,检查是否小于或等于最小值
		max: 创建验证器,检查是否大于或等于最小值
	
options参数配置:
	autoIndex: boolean,自动为所有字段添加索引
	bufferCommands: 使用buffer对象记录
	cillection: 默认集合名称
	id: 生成一个虚拟id指向_id字段,默认false
	_id: 添加数据时自动添加的就是这个_id,默认为true
	minmize: 不保存空对象
	toJSON: 将会查询结果转换为JSON
	toObject: 将查询结果保存为js对象
	timestamps: shame自动添加创建文档或者修改文档的时间戳,默认添加字段名是: createAt,updateAt
```

#### modal

> 相当于集合,根据上述模式创建

```
let User = mongoose.modal("User(集合名称)",模式)
集合名称存入数据库之后,会统一转换成小写加s
```

#### Document

> 文档 ,根据上述modal创建

```
let user1 = new User({"id":"0000","name":"xiaoli"})
此时user1就是创建出来的文档
```

### 使用Modal进行CRUD

#### 添加数据

```
userModel.create(datas, function(err) {
  if(!err) {
    console.log('写入成功')
  }
})
```

#### 删除数据

```
modal.deleteOne("条件",function(err){})
modal.remove("条件",function(err){})
使用集合调用调用输出方法,
User.deleteOne({"name":"xiaownag"},fucntion(){})
```

#### 查询数据数量

```
modal.count({条件},function(err,count) => {
	console.log("符合条件的有:"+count)
})
```

#### 查询数据

```
modal.find({条件},function(err,data){}) //data是数组,
modal.findOne({条件},function(err,data)) //只会查找第一条数据
```

#### 修改数据

```
modal.update({筛选条件},{$修饰符{修改内容},fnction(){})
```

### 使用Document进行添加

#### 添加数据

```
Document.save((err,document)=>{
	document就是我们创建的文档,这里document参数其实就是Document
})
例子:
user1.save((err,user1)=>{
	if(err){
		添加失败
		return
	}
	添加成功
})
```

### mongoDB高级方法

##### $where

$where ，其实就是 mongo中执行 js代码，来完成查询

```
 db.getCollection('blogs').find({'$where':"function(){ return this.title.length>5}"})
 
 db.blogs.find({'$where':"function(){ return this.title.length>5}"})
```

#### aggregate聚合

聚合操作处理数据记录和 return 计算结果。聚合操作将来自多个文档的值组合在一起，并且可以对分组数据执行各种操作以返回单个结果。 MongoDB 提供了三种执行聚合的方法：[聚合管道](https://docs.jinmu.info/MongoDB-Manual-zh/#/聚合管道)，[map-reduce function](https://docs.jinmu.info/MongoDB-Manual-zh/#/map-reduce)和[单一目的聚合方法](https://docs.jinmu.info/MongoDB-Manual-zh/#/单用途聚合操作)。

```
> db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
db.集合名称.aggregate([{管道:{表达式:...}}])

db.集合名称.aggregate([$group:{id:null,age_sum:{$sum:$age}}]) []是一个管道,里面可指定多个管道符进行处理,前一个管道符处理的结果会传递给下一个管道符
					 [使用的通道:{分组依据,别名,{表达式: 指定字段}}]
```

| 表达式    | 描述                                                  | 实例                                                         |
| :-------- | :---------------------------------------------------- | :----------------------------------------------------------- |
| $sum      | 计算总和。每次都会累加$sum对应的字段值,最后放在别名上 | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}]) |
| $avg      | 计算平均值                                            | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}]) |
| $min      | 获取集合中所有文档对应值得最小值。                    | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}]) |
| $max      | 获取集合中所有文档对应值得最大值。                    | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}]) |
| $push     | 将每个文档的$push对应字段值push到一个数组中           | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}]) |
| $addToSet | 将每个文档的$push对应字段值push到一个数组中并去重     | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}]) |
| $first    | 根据资源文档的排序获取第一个文档数据。                | db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}]) |
| $last     | 根据资源文档的排序获取最后一个文档数据                | db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}]) |

##### 管道的概念

管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。

MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

表达式：处理输入文档并输出。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它的文档。

这里我们介绍一下聚合框架中常用的几个操作：

- $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
- $match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
- $limit：用来限制MongoDB聚合管道返回的文档数。
- $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
- $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- $group：将集合中的文档分组，可用于统计结果。
- $sort：将输入文档排序后输出。
- $geoNear：输出接近某一地理位置的有序文档。

##### 管道操作符实例

1、$project实例

```
db.article.aggregate(
    { $project : {
        title : 1 ,
        author : 1 ,
    }}
 );
```

这样的话结果中就只还有_id,tilte和author三个字段了，默认情况下_id字段是被包含的，如果要想不包含_id话可以这样:

```
db.article.aggregate(
    { $project : {
        _id : 0 ,
        title : 1 ,
        author : 1
    }});
```

2.$match实例

```
db.articles.aggregate( [
                        { $match : { score : { $gt : 70, $lte : 90 } } },
                        { $group: { _id: null, count: { $sum: 1 } } }
                       ] );
```

$match用于获取分数大于70小于或等于90记录，然后将符合条件的记录送到下一阶段$group管道操作符进行处理。

3.$skip实例

```
db.article.aggregate(
    { $skip : 5 });
```

经过$skip管道操作符处理后，前五个文档被"过滤"掉。

案例:  删除重复项 

```js
db.users.aggregate([{
    //聚合操作: 分组 以username进行分组
    $group:{
        _id:{
            username:"$username"
        },
        //分组内容计数
        count:{
            $sum:1
        },
        //分组内容里的 _id 添加到 数组 dups中
        dups:{
            $addToSet:"$_id"
        }
    }
},{
    //匹配 分组中 count 大于1的数据
    $match:{
        count:{
            $gt:1
        }
    }
}]).forEach(function(item){
    //处理count大于1的数组数据
    //删除分组dups数组中的第一项 留一条数据
    item.dups.shift();
    //删除剩余数据 query条件: _id字段的值 存在于 dups数组中的话 条件城里
    db.users.remove({_id:{$in: item.dups}})
})
```

### 查询queries

[Model](https://cn.mongoosedoc.top/docs/api.html#model_Model) 的方法中包含查询条件参数的（ [find](https://cn.mongoosedoc.top/docs/api.html#model_Model.find) [findById](https://cn.mongoosedoc.top/docs/api.html#model_Model.findById) [count](https://cn.mongoosedoc.top/docs/api.html#model_Model.count) [update](https://cn.mongoosedoc.top/docs/api.html#model_Model.update) ）都可以按以下两种方式执行：

- 传入 `callback` 参数，操作会被立即执行，查询结果被传给回调函数（ callback ）。

- 不传 `callback` 参数，[Query](https://cn.mongoosedoc.top/docs/api.html#query-js) 的一个实例（一个 query 对象）被返回，这个 query 提供了构建查询器的特殊接口。[Query](https://cn.mongoosedoc.top/docs/api.html#query-js) 实例有一个 `.then()` 函数，用法类似 promise。

  传callback参数的情况：

```
var Person = mongoose.model('Person', yourSchema);

// 查询每个 last name 是 'Ghost' 的 person， select `name` 和 `occupation` 字段
Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".
  console.log('%s %s is a %s.', person.name.first, person.name.last,
    person.occupation);
});

```

不传callback参数的情况：

```
// 查询每个 last name 是 'Ghost' 的 person
var query = Person.findOne({ 'name.last': 'Ghost' });

// select `name` 和 `occupation` 字段
query.select('name occupation');

// 然后执行查询
query.exec(function (err, person) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host."
  console.log('%s %s is a %s.', person.name.first, person.name.last,
    person.occupation);
});
```




| name               | effect                                                       |
| ------------------ | ------------------------------------------------------------ |
| select             | 添加需要显示的字段,需要的字段在字段后加上:1,不需要的加上0;<br/>query.select({ a: 1, b: 0 }); //显示a字段, 隐藏b字段<br/>不能和distinct方法一起使用 |
| distinct           | 用来筛选不重复的值或者字段<br/>distinct(field). //筛选指定不重复字段的数据 |
| $lt,$lte,$gt,$gte. | 分别对应: <,<=,>,>=. 该字段是用在condition中的.如果,你想要链式调用,则需要使用<br/>lt,lte,ge,gte.<br/>eg:<br/> model.find({num:{$gt:12}},cb)<br/>model.where(‘num’).gt(12).exec(cb) |
| $in                | 查询包含键值的文档,<br/>model.find({name:{$in:[“jimmy”,“sam”]}}) //相当于匹配 jimmy或者sam |
| $nin               | 返回不匹配查询条件文档,都是指定数组类型<br/>model.find({name:{$nin:[“jimmy”,“sam”]}}) |
| $ne                | 表示不包含指定值<br/>model.find({name:{$ne:“sam”}})          |
| $or                | 表示或查询<br/>model.find({$or:[{ color: ‘red’ }, { status: ‘emergency’ }]}) |
| $exists            | 表示键值是否存在;<br/>model.find({name:{$exists:true}})      |
| $all               | 通常用来匹配数组里面的键值,匹配多个值(同时具有)<br/>$all:[“apple”,“banana”,“peach”]} |
| $size              | 用来查询数组的长度值<br/>model.find({name:{$size:3}}); 匹配name的数组长度为3 |
| $slice             | 用来获取数组字段的内容:<br/>query.slice(‘comments’, 5)       |

- **limit:**用来获取限定长度的内容.

```
query.limit(20); //只返回前20个内容
```

- skip: 返回，跳过指定doc后的值.

```
query.skip(2);
```

- sort: 用来设置根据指定字段排序. 可以设置为1:升序, -1:降序.

```
query.sort({name:1,age:-1});
```

#### 索引

mongoose同样也对索引做了处理，在mongoose中定义索引有两种方法。

第一种：直接在schema里面定义，如下所示

```
var User = mongoose.model('User', {
  username: {
      type: String,
      index: true
  },
  password: String
})

```

第二种：统一定义索引

```
var User = mongoose.model('User', {
  username: {
      type: String
  },
  password: String
});

//schema统一设置索引
User.index({
    username: 1 / -1  (正向和逆向)
})

```

关闭索引：

```
mongoose.connect('mongodb://user:pass@localhost:port/database', { config: { autoIndex: false } });
// or  
mongoose.createConnection('mongodb://user:pass@localhost:port/database', { config: { autoIndex: false } });
// or
animalSchema.set('autoIndex', false);
// or
new Schema({..}, { autoIndex: false });

```

注意：索引滥用会导致很严重的性能问题，建议合理使用索引。



### validation验证

在我们进入验证语法的细节之前，请记住以下的规则：

> 验证是在SchemaType定义

> 验证是中间件。Mongoose寄存器验证作为pre('save')钩子在每个模式默认情况下。

> 你可以手动使用doc运行验证。validate(callback) or doc.validateSync()。

> 验证程序不运行在未定义的值上。唯一的例外是required验证器。

> 验证异步递归；当你调用Model#save，子文档验证也可以执行。如果出现错误，你的 Model#save回调接收它。

> 验证是可定制的。

```
 var schema = new Schema({
      name: {
        type: String,
        required: true
      }
    });
    var Cat = db.model('Cat', schema);

    // This cat has no name :(
    var cat = new Cat();
    cat.save(function(error) {
      assert.equal(error.errors['name'].message,
        'Path `name` is required.');

      error = cat.validateSync();
      assert.equal(error.errors['name'].message,
        'Path `name` is required.');
    });

```

###### Mongoose有几个内置验证器。

> 所有的schematypes有内置的require验证器。所需的验证器使用SchemaType的checkrequired()函数确定的值满足所需的验证器。

> 数值（ Numbers ）有最大（man）和最小（min）的验证器。

> 字符串（String）有枚举，match，maxLength和minLength验证器。

每一个上述的验证链接提供更多的信息关于如何使他们和自定义错误信息。

```
 var breakfastSchema = new Schema({
      eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12
      },
      bacon: {
        type: Number,
        required: [true, 'Why no bacon?']
      },
      drink: {
        type: String,
        enum: ['Coffee', 'Tea']
      }
    });
    var Breakfast = db.model('Breakfast', breakfastSchema);

    var badBreakfast = new Breakfast({
      eggs: 2,
      bacon: 0,
      drink: 'Milk'
    });
    var error = badBreakfast.validateSync();
    assert.equal(error.errors['eggs'].message,
      'Too few eggs');
    assert.ok(!error.errors['bacon']);
    assert.equal(error.errors['drink'].message,
      '`Milk` is not a valid enum value for path `drink`.');

    badBreakfast.bacon = null;
    error = badBreakfast.validateSync();
    assert.equal(error.errors['bacon'].message, 'Why no bacon?');
```

###### 自定义验证

如果内置验证器是不够的话，你可以自定义验证器来适应你的需求。

```
var userSchema = new Schema({
      phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
      }
    });

```

##### 验证的错误处理

验证失败后Errors返回一个错误的对象实际上是validatorerror对象。每个ValidatorError有kind, path, value, and message属性。

```
var Person = db.model('Person', personSchema);
var person = new Person();

var error = person.validateSync();
```

- required: 表示必填字段.

```
new Schema({
 name: {
    type:String,
    required:[true,"name 是必须的"] //第二个参数是错误提示信息
 }
})
```

- min,max: 用来给Number类型的数据设置限制.

```
 var breakfastSchema = new Schema({
      eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12
      }
});
```

- enum,match,maxlength,minlength: 这些验证是给string类型的. enum 就是枚举,表示该属性值,只能出席那那些. match是用来匹配正则表达式的. maxlength&minlength 显示字符串的长度.

```
new Schema({
    drink: {
        type: String,
        enum: ['Coffee', 'Tea']
      },
     food:{
        type: String,
        match:/^a/,
        maxlength:12,
        minlength:6
    }
})
```

mongoose提供的helper fn就是这几种, 如果你想定制化验证. 可以使用custom validation.

```
new Schema({
 phone: {
        type: String,
        validate: {
          validator: function(data) {
            return /\d{3}-\d{3}-\d{4}/.test(data);
          },
          message: '{VALUE} is not a valid phone number!' //VALUE代表phone存放的值
        },
        required: [true, 'User phone number required']
      }
})
```

另外,还可以额外添加验证.

```
  var toySchema = new Schema({
      color: String,
      name: String
    });

   var validator = function (value) {
      return /blue|green|white|red|orange|periwinkle/i.test(value);
    };
    toySchema.path('color').validate(validator,
      'Color `{VALUE}` not valid', 'Invalid color');
```

现在,我们已经设置了validation. 但是你不启用,一样没有用. 实际上, 我们也可以把validation当做一个中间件使用. mongoose 提供了两种调用方式. 一种是内置调用, 当你使用.save方法时,他会首先执行一次存储方法.

```
cat.save(function(error) {
//自动执行,validation
});
```

另外一种是,手动验证–指定validate方法.

```
//上面已经设置好user的字段内容.
  user.validate(function(error) {
    //error 就是验证不通过返回的错误信息
     assert.equal(error.errors['phone'].message,
        '555.0123 is not a valid phone number!');
    });
});
```

事实上, 在validate时, 错误的返回信息有以下4个字段: kind, path, value, and message;

- kind: 用来表示验证设置的第二个参数. 一般不用

```
phone: {
        type: String,
        validate: {
          validator: function(data) {
            return /\d{3}-\d{3}-\d{4}/.test(data);
          },
          message: '{VALUE} is not a valid phone number!', //VALUE代表phone存放的值
          kind: "invalid phone"
        }
})
```

- path: 就是字段名
- value: 你设置的错误内容
- message: 提示错误信息 看一个整体demo吧:

```
 var validator = function (value) {
      return /blue|green|white|red|orange|periwinkle/i.test(value);
    };
    Toy.schema.path('color').validate(validator,
      'Color `{VALUE}` not valid', 'Invalid color'); //设置了message && kind

    var toy = new Toy({ color: 'grease'});

    toy.save(function (err) {
      // err is our ValidationError object
      // err.errors.color is a ValidatorError object
      assert.equal(err.errors.color.message, 'Color `grease` not valid'); //返回message
      assert.equal(err.errors.color.kind, 'Invalid color');
      assert.equal(err.errors.color.path, 'color');
      assert.equal(err.errors.color.value, 'grease');
      assert.equal(err.name, 'ValidationError');
      //访问color 也可以直接上 errors["color"]进行访问.
    });
```

在Model.update那一节有个参数–runValidators. 还没有详细说. 这里, 展开一下. 实际上, validate一般只会应用在save上, 如果你想在update使用的话, 需要额外的trick，而runValidators就是这个trick.

```
var opts = { runValidators: true };
    Test.update({}, update, opts, function(error) {  //额外开启runValidators的验证
      // There will never be a validation error here
    });
```

### population 联表

如果你使用过mysql，肯定用过join，用来联表查询，但mongoose中并没有join，不过它提供了一种更方便快捷的办法，Population。

首先定义两个model。

```
var User = mongoose.model('User', {
  username: String,
  password: String
})

var News = mongoose.model('News', {
  title: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

```

然后添加数据

```
User.create({username:'ck',username:'滴滴'},function(err, data){
  console.log(data)
  News.create({title:'title',author:data},function(){

  })
})

```

打印查询结果到控制台

```
News.findOne().populate('author','username').exec(function(err, doc){
  console.log('==============',err, doc)
  //    ============== null { _id: 5a41d2e16f78a43c5873fe03,
  //    title: 'title',
  //    author: { _id: 5a41d2e16f78a43c5873fe02, username: 'ck' 
  //    },
  //    __v: 0 }
})
```

mongodb 本来就是一门非关系型数据库。 但有时候,我们又需要联合其他的table进行数据查找。 这时候, 一般的做法就是实现两次查询，效率太低了
此时, mongoose 说了一句: 麻麻, 我已经都把脏活帮你做好了. 感动~ 有木有~ 这就是mongoose提供的 population. 用来连接多表数据查询. 一般而言, 我们只要提供某一个collection的_id , 就可以实现完美的联合查询. population 用到的关键字是: `ref` 用来指明外联的数据库的名字. 一般,我们需要在schema中就定义好.

```
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Schema.Types.ObjectId, ref: 'Person' },
  title    : String
});
```

这里就指明了, 外联数据表的应用关系 personSchema <stories> By _id => Story storySchema <_creator> By _id => Person 实际上, 就是通过_id的相互索引即可. 这里需要说明的是, _id 应该是某个具体model的id.

我们来看一下, 接下来应该如何利用population实现外联查询.

```
const sam = new Person({
    name: 'sam',
    _id: 1,
    age: 18,
    stories: []
});
sam.save((err,sam)=>{
    if(err) return err;
    let story = new Story({
        _creator:sam._id,
        title:"喜剧之王"
    })
})

Story.findOne({title:"喜剧之王"}).populate('_creator').exec((err,story)=>{
    if(err)console.log(err);
    console.log(story._creator.name);
})
//使用populate来指定,外联查询的字段, 而且该值必须是_id才行
```

#### 中间件middleware

中间件（pre和post钩子）是在异步函数执行时函数传入的控制函数，mongoose中所有的中间件都支持pre和post钩子。

##### pre钩子

pre钩子分为串行和并行两种，串行就是中间件一个接一个的执行，也就是上一个中间件调用next函数的时候，下一个执行。

```
var schema = new Schema(..);
schema.pre('save', function(next) {
  // do stuff
  next();
});

```

并行中间件提供细粒度流控制

```
var schema = new Schema(..);

// 只有第二个参数为‘true'时才表示并行执行
schema.pre('save', true, function(next, done) {
  // calling next kicks off the next middleware in parallel
  next();
  setTimeout(done, 100);
});

```

##### post中间件

post中间件在方法执行后调用

```
schema.post('init', function(doc) {
  console.log('%s has been initialized from the db', doc._id);
});
schema.post('validate', function(doc) {
  console.log('%s has been validated (but not saved yet)', doc._id);
});
schema.post('save', function(doc) {
  console.log('%s has been saved', doc._id);
});
schema.post('remove', function(doc) {
  console.log('%s has been removed', doc._id);
});

```

如果在回调函数传入两个参数，mongoose会认为第二个参数是next函数，我们可以通过next触发下一个中间件

```
// Takes 2 parameters: this is an asynchronous post hook
schema.post('save', function(doc, next) {
  setTimeout(function() {
    console.log('post1');
    // Kick off the second post hook
    next();
  }, 10);
});

// Will not execute until the first middleware calls `next()`
schema.post('save', function(doc, next) {
  console.log('post2');
  next();
});
```



## RESTful API

> RESTful是目前最流行的API设计规范,用于Web数据接口设计
>
> Representational State Transfer (表现型状态转移)

### URL设计

> **REST是面向资源的,而资源是通过URI暴露的,.这个概念很重要**,
>
> 以前开发设计的接口多是面向动作的如:
>
> GET /getUserInforById?userId=10001 //语义:通过用户Id获取用户信息
>
> REST设计:
>
> GET /users?userId=10001 //语义: 以请求方式代表动作,users是资源路径,包含所有用户的表,

#### 动词+宾语

> REST的核心思想就是: 客户端发送的数据操作指令都是"动词+宾语"的结构,比如: `GET /articals`这个接口,其中`GET`表示动词,`/articles`是宾语

##### 请求方式代表动作

> 通常使用五种HTTP方法,对应CRUD操作

- GET: 读取(Read)
- POST: 新建(Create)
- PUT: 更新(Update)
- PATCH: 更新(通常是部分更新)
- DELETE: 删除(Delete)

#### 动词的覆盖

> 有些客户端只能使用get post这两种方法,夫区其必须接受`POST`模拟的其他三种方法(PUT,PATCH,DELETE)
>
> 这是,客户端发出的请求,要加上`X-HTTP-Method-Override`属性,告诉服务器使用哪个动词覆盖post方法

```
X-HTTP-Method-Override: PUT  //表示这次请求使用PUT覆盖这个post请求
```

#### 宾语必须名词复数

> 动词就是请求方式,宾语就是API的URL,是动词作用的对象,这个宾语必须是名词复数,下面是示范:

```
错误:
/getAllCars
/createNewCar
正确:
/articals
/cars
```

#### 避免多级URL

> 常见的情况是,资源需要多级分类,因下次很容易写成多级的URL,如:

```
GET /authors/12/categories/2  //获取某个作者的某一类文章
```

> 这种URL不利于扩展,语义也不明确,更好的做法是**除了第一级,其他级别都用查询字符串表达**

```
GET /authors/12?categories=2


GET /articles/published
设计成:
GET /articles?punlished=true
```

### 状态码

#### 状态码必须精确

> 客户端的每一次请求,服务器都必须给出回应,回应包括HTTP状态码和数据两个部分

HTTP 状态码就是一个三位数，分成五个类别。

> - `1xx`：相关信息
> - `2xx`：操作成功
> - `3xx`：重定向
> - `4xx`：客户端错误
> - `5xx`：服务器错误

这五大类总共包含[100多种](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)状态码，覆盖了绝大部分可能遇到的情况。每一种状态码都有标准的（或者约定的）解释，客户端只需查看状态码，就可以判断出发生了什么情况，所以服务器应该返回尽可能精确的状态码。

API 不需要`1xx`状态码，下面介绍其他四类状态码的精确含义。

#### 2XX状态码

> 200状态码表示成功的操作,但是不同的请求方式可以返回更精确的状态码
>
> - GET: 200 OK
> - POST: 201 Created
> - PUT: 200 OK
> - PATCH: 200 OK 
> - DELETE: 204 NO Content  表示资源已经存在
>
> 此外:`202 Accepted`状态码表示服务器已经接受到请求,但是还没有处理,会在未来处理,通常用于异步操作,

#### 3XX状态码

> API用不到`301永久重定向`状态码,`302暂时重定向`状态码,因为他们可以有应用级别返回,浏览器会直接跳转,API级别不需要考虑这两种情况
>
> API用到的3XX状态码,主要是`303 See Other`,表示参考另一个URL,他与302和307的含义一样,也是"暂时重定向",区别在于`302`和`307`用于`GET`请求,而`303`用于`POST PUT DELETE`请求,收到`303`以后浏览器不会自动跳转,而是让用户自己决定下一步怎么做

#### 4XX状态码

`4xx`状态码表示客户端错误，主要有下面几种。

`400 Bad Request`：服务器不理解客户端的请求，未做任何处理。

`401 Unauthorized`：用户未提供身份验证凭据，或者没有通过身份验证。

`403 Forbidden`：用户通过了身份验证，但是不具有访问资源所需的权限。

`404 Not Found`：所请求的资源不存在，或不可用。

`405 Method Not Allowed`：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。

`410 Gone`：所请求的资源已从这个地址转移，不再可用。

`415 Unsupported Media Type`：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。

`422 Unprocessable Entity` ：客户端上传的附件无法处理，导致请求失败。

`429 Too Many Requests`：客户端的请求次数超过限额。

#### 5XX状态码

`5xx`状态码表示服务端错误。一般来说，API 不会向用户透露服务器的详细信息，所以只要两个状态码就够了。

`500 Internal Server Error`：客户端请求有效，服务器处理时发生了意外。

`503 Service Unavailable`：服务器无法处理请求，一般用于网站维护状态。

### 服务器响应

#### 不要返回纯文本

> API返回数据的时候,不应该返回纯文本,应该返回一个JSON对象,因为这样才能返回标准的结构化数据,所以,服务器响应的HTTP头的`Contenmt-type`应该是`application/json`,同时请求头也要说明可以接受JSON格式: `Accept: application/json`

#### 发生错误时不要返回200状态码

> 有一种不恰当的做法是,当发生错误时也返回200状态码,把错误信息放在数据体中,就像下面这样:

```
HTTP/1.1 200 OK
Content-Type: application/json

{
"status": "failure",
"data": {
 "error": "Expected at least two items in list."
}
}
```

> 上面代码中,客户端接收到响应只有解析了数据体才能得知操作失败
>
> 正确的做法是状态码表示发生错误,具体信息放在数据体中返回,如:

```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
"error": "Invalid payoad.",
"detail": {
  "surname": "This field is required."
}
}
```

#### 提供链接

API 的使用者未必知道，URL 是怎么设计的。一个解决方法就是，在回应中，给出相关链接，便于下一步操作。这样的话，用户只要记住一个 URL，就可以发现其他的 URL。这种方法叫做 HATEOAS。

举例来说，GitHub 的 API 都在 [api.github.com](https://api.github.com/) 这个域名。访问它，就可以得到其他 URL。

> ```http
> {
> ...
> "feeds_url": "https://api.github.com/feeds",
> "followers_url": "https://api.github.com/user/followers",
> "following_url": "https://api.github.com/user/following{/target}",
> "gists_url": "https://api.github.com/gists{/gist_id}",
> "hub_url": "https://api.github.com/hub",
> ...
> }
> ```

上面的回应中，挑一个 URL 访问，又可以得到别的 URL。对于用户来说，不需要记住 URL 设计，只要从 api.github.com 一步步查找就可以了。

HATEOAS 的格式没有统一规定，上面例子中，GitHub 将它们与其他属性放在一起。更好的做法应该是，将相关链接与其他属性分开。

> ```http
> HTTP/1.1 200 OK
> Content-Type: application/json
> 
> {
> "status": "In progress",
> "links": {[
>  { "rel":"cancel", "method": "delete", "href":"/api/status/12345" } ,
>  { "rel":"edit", "method": "put", "href":"/api/status/12345" }
> ]}
> }
> ```