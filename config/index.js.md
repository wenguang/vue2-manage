


##### context中的代理路径有什么用
```
context: [ //代理路径
        '/shopping',
        '/ugc',
        '/v1',
        '/v2',
        '/v3',
        '/v4',
        '/bos',
        '/member',
        '/promotion',
        '/eus',
        '/payapi',
        '/admin',
        '/statis',
        '/img',
    ],
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
