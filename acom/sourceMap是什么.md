

####source map 是什么
前端应用的js和css通常会被压缩后才部署到生产环境中，要是线上出了bug，在debug时候提示错误出在js的第二行，那将毫不意义，因为被压缩过的js很可能只有2、3行。sourceMap就是为解决这个问题的。

**source map是个储存位置信息的文件，代码转换后的每个位置对应代码转换前的位置。**


####closure compiler的作用
那要怎么才能生成source map文件呢？那就要用到 **closure compiler**
**closure compiler 是google出品的js优化转译器，也可以压缩js，同时可以为js生成source map**

1、closure compiler提供了线上工具：https://closure-compiler.appspot.com/home。

2、从[这里](https://developers.google.com/closure/compiler/)下载closure compiler的jar包，已经下载在closure-compliler目录下。用如下命令压缩并生成source map：
```
java -jar closure-compiler-v20190301.jar \
　　　　--js script.js \
　　　　--create_source_map ./script-min.js.map \
　　　　--source_map_format=V3 \
　　　　--js_output_file script-min.js
```

- js： 转换前的代码文件
　　- create_source_map： 生成的source map文件
　　- source_map_format：source map的版本，目前一律采用V3。
　　- js_output_file： 转换后的代码文件。

build目录有个build.js.map就是用build.js生成的source map，它的文件格式和原理参考：[JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

####启动source map
source map文件可以放在网络上，也可以放文件系统，要启动source map得在压缩后js最后加一句：//@ sourceMappingURL=/path/to/file.js.map，在Chrome在Developer Tools的Setting设置中，确认选中"Enable source maps"


**如何利用source map做线上debug有待实践** 



