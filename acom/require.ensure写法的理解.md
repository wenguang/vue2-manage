
#### const login = r => require.ensure(\[\], () => r(require('@/page/login')), 'login');

【这个写法的理解太重要了】https://zhenyong.github.io/vue-router/advanced/lazy-loading.html

改为如下页面加载不出login模块了：
```
const login = require.ensure([], () => { require('@/page/login') }, 'login');
```

[在Webpack中使用Code Splitting实现按需加载](http://www.alloyteam.com/2016/02/code-split-by-routes/)


#### require.ensure 异步加载/分割代码

比如应用的首页里面有个按钮，点击后可以打开某个地图。打开地图的话就要利用百度地图的js,于是
我们不得不在首页中把百度地图的js一起打包进去首页,一个百度地图的js文件是非常大的，假设为
1m，于是就造成了我们首页打包的js非常大，用户打开首页的时间就比较长了。我们细想，百度地图是用户点击了才弹出来的，也就是说，这个功能是可选的。那么解决方案就来了，能不能在用户点击的时候，我在去下载百度地图的js.当然可以。那如何实现用户点击的时候再去下载百度地图的js呢？于是，我们可以写一个按钮的监听器
```
mapBtn.click(function() {
    //获取 文档head对象
    var head = document.getElementsByTagName('head')[0];
    //构建 <script>
    var script = document.createElement('script');
    //设置src属性
    script.async = true;
    script.src = "http://map.baidu.com/.js"
    //加入到head对象中
    head.appendChild(script);
})
```
require.ensure的大概的原理就是：把一些js模块给独立出一个个js文件，然后需要用到的时候，在创建一个script对象，加入到document.head对象中即可，浏览器会自动帮我们发起请求，去请求这个js文件，用了require.ensure，上面的这样操作会由webpack和浏览器帮我们做了，代码就简单多了，像这样：
```
// 参数r干啥的？
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
```

**用require.ensure加载的模块会被webpack单独打包（即打成一个单独的chunk，如0.854995a184daf485ed5d.js），除非该模块已经被require加载到内存中了。index.js用require.ensure加载page目录的16个vue组件，生成目录manage/js下就有0.xxx.js到16.xxx这16个文件，这就对上了**

```
// 这里官方文档的代码
// 对比index.js与这里的写法
require('a');
require.ensure([], function(require){
    require('b');
});
```

参考:
[require.ensure的用法;异步加载-代码分割](https://www.jianshu.com/p/9fa38e536033)
[代码分割 - 使用 require.ensure](https://www.html.cn/doc/webpack2/guides/code-splitting-require/)
