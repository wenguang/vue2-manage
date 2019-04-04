
#### app.use(path, express.static(...))

**express.static('...')：**传递一个包含静态资源的目录给 express.static 中间件用于立刻开始提供文件，express.static 函数的路径是一个相对node进程启动位置的相对路径，也可以是绝对路径。
`app.use(express.static('./real'))`，有了这句就可以在浏览器访问静态资源了，如
http://localhost:8002/real/hello.png (这里的static是物理目录)，想用虚拟目录访问也可以，像这样 `app.use('/static', express.static('./real'))`，http://localhost:8002/static/hello.png实际上就是访问了http://localhost:8002/real/hello.png
```
var express = require('express')
var app = express()

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
```
参考：[app.use(express.static)详解](https://blog.csdn.net/u010977147/article/details/60956502)
#####【上面的app和express有不同吗？】


##### express的中间件：
- webpack-dev-middleware
- webpack-hot-middleware
- http-proxy-middleware
- connect-history-api-fallback


##### webpack-dev-middleware
生成一个与webpack的compiler绑定的中间件，然后在express启动的服务app中调用这个中间件，所以代码是这样的：
```
/*
    publicPath,熟悉webpack的同学都知道，这是生成的新文件所指向的路径，可以模拟CDN资源引用。那么跟此处的主角webpack-dev-middleware什么关系呢，关系就是，此处采用内存的方式，内存中采用的文件存储write path就是此处的publicPath，因此，这里的配置publicPath需要使用相对路径。
 */
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    // 这里要用绝对路径
    publicPath: webpackConfig.output.publicPath,
    // 不向控制台显示内容
    quiet: true
})
app.use(devMiddleware)
```

这个中间件的作用呢，简单总结为以下三点：
1、通过watch mode，监听资源的变更，然后自动打包（如何实现，见下文详解);
2、快速编译，走内存；
3、返回中间件，支持express的use格式。

【webpack明明可以用watch mode，可以实现一样的效果，但是为什么还需要这个中间件呢？】
答案就是，第二点所提到的，采用了内存方式。如果，只依赖webpack的watch mode来监听文件变更，自动打包，每次变更，都将新文件打包到本地，就会很慢。
参考：[webpack-dev-middleware详解](https://juejin.im/entry/59806132f265da3e1e5bd613)


##### webpack-hot-middleware
按上面通过webpack的watch mode和webpack-dev-middleware就可以很好实现自动打包了，那webpack-hot-middleware有什么用？答案是：它能让浏览器自动刷新。

```
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
app.use(hotMiddleware)
```


##### http-proxy-middleware
用于把请求代理转发到其他服务器的中间件
config.dev.context定义了一组需要代理转发的路径

当用npm run dev运行时，凡是遇到context定义的路径时，把会被借到 http://elm.cangdu.org，context.dev.port为8002，也就是express监听了8002，当请求 http://localhost:8002/img 时(/img是context的路径之一)，实际请求被代理转发到 http://elm.cangdu.org/img
```
var proxyMiddleware = require('http-proxy-middleware')
var context = config.dev.context

switch(process.env.NODE_ENV){
    case 'local': var proxypath = 'http://localhost:8001'; break;
    case 'online': var proxypath = 'http://elm.cangdu.org'; break;
}
var options = {
    target: proxypath,
    changeOrigin: true,
}
if (context.length) {
    // context可以单路径，如'api/'，也可以是包含多个路径的数组
    app.use(proxyMiddleware(context, options))
}
```
参考：[一篇读懂http-proxy-middleware(转载)](https://juejin.im/post/5bd13c5ce51d457a203cebf4)


##### connect-history-api-fallback (浏览历史功能)
```
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())
```


#### 看这段是干什么的
```
// force page reload when html-webpack-plugin template changes
// 当html-webpack-plugin模块变化时强制页面刷新
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})
```

#### 奇怪的Promise用法
[【大白话讲解Promise（一）】](https://www.cnblogs.com/lvdabao/p/es6-promise-1.html)中的Promise我是看得懂，这里的用法我看不懂，也没关系，不用Promise也是可以的，大概的意思就是devMiddleware启动服务，完成后在回调中打开页面
```
var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})
```




