
在package.json的scripts定义命令，可用以下命令运行：npm run dev...

```
"scripts": {
    "dev": "cross-env NODE_ENV=online node build/dev-server.js",
    "local": "cross-env NODE_ENV=local node build/dev-server.js",
    "build": "node build/build.js"
  }
```

其中的 `node build/dev-server.js` 用node运行build目录下的dev-server.js，**那 NODE_ENV=online是什么？cross-env又是什么呢？**

**NODE_ENV=online 就在运行dev-server.js前设置node的环境变量**，这个变量对dev-server.js或以后项目的运行有影响。

cross-env是为了跨平台设置NODE_ENV，类unix平台用 EXPORT NODE_ENV=online 来设置变量，而windows平台用 SET NODE_ENV=online 来设置，为用平台兼容，用cross-env NODE_ENV=online 就可以了。


参考：
[使用cross-env解决跨平台设置NODE_ENV的问题](https://segmentfault.com/a/1190000005811347)
[前端项目中的NODE_ENV](https://www.jianshu.com/p/6de791d77357)
