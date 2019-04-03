
##### output.filename
```
/*
此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。

[id]        使用内部 chunk id
[hash]      模块标识符(module identifier)的 hash
[chunkhash] chunk 内容的 hash
[name]      模块名称
[id]        模块标识符(module identifier)
[query]     模块的 query，例如，文件名 ? 后面的字符串
 */
filename: utils.assetsPath('js/[name].[chunkhash].js')
```

##### output.chunkFileName
```
/*
此选项决定了非入口(non-entry) chunk 文件的名称。有关可取的值的详细信息，请查看 output.filename 选项
 */
chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
```

##### webpack.optimize.UglifyJsPlugin 命令webpack -p即表示调用UglifyJS来压缩代码
```
new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
```
[UglifyJS中文文档](https://segmentfault.com/a/1190000008995453)

##### OptimizeCSSPlugin (optimize-css-assets-webpack-plugin) 压缩css
配置参考：https://www.jianshu.com/p/9b848f732926

##### HtmlWebpackPlugin
```
new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      // js在生成的html中插入的位置，有4个值：true、body、head、false
      // true和body一样，script标签位于html文件的 body 底部
      // head表示script 标签位于 head 标签内
      // 不插入生成的 js 文件，只是单纯的生成一个 html 文件
      inject: true,
      // minify表示最小化生成的html，去掉注释、空格、移除属性的引号
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        // 如<script type='text/javascript' 变成 <script type=text/javascript
        // 把单引号去掉
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // 这个选项决定了 script 标签的引用顺序。
      // 默认有四个选项，'none', 'auto', 'dependency', '{function}'
      // 'dependency' 不用说，按照不同文件的依赖关系来排序
      // 'auto' 默认值，插件的内置的排序方式
      // 'none' 无序
      // {function} 提供一个函数？但是函数的参数又是什么? 不太清楚...
      chunksSortMode: 'dependency'
    })
```

更全配置：[html-webpack-plugin用法全解](https://segmentfault.com/a/1190000007294861)

##### webpack.optimize.CommonsChunkPlugin
CommonsChunkPlugin主要是用来提取第三方库和公共模块，避免首屏加载的bundle文件或者按需加载的bundle文件体积过大，从而导致加载时间过长，着实是优化的一把利器。

CommonsChunkPlugin提及到chunk有哪几种，主要有以下三种：

1、webpack当中配置的入口文件（entry）是chunk，可以理解为entry chunk
2、入口文件以及它的依赖文件通过code split（代码分割）出来的也是chunk，可以理解为children chunk
3、通过CommonsChunkPlugin创建出来的文件也是chunk，可以理解为commons chunk

【配置选项】
- name：可以是已经存在的chunk（一般指入口文件）对应的name，那么就会把公共模块代码合并到这个chunk上；否则，会创建名字为name的commons chunk进行合并
- filename：指定commons chunk的文件名
- chunks：指定source chunk，即指定从哪些chunk当中去找公共模块，省略该选项的时候，默认就是entry chunks
- minChunks：既可以是数字，也可以是函数，还可以是Infinity，具体用法和区别下面会说

```
new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    // minChunks作为函数会遍历每一个入口文件及其依赖的模块，返回一个布尔值，
    // 为true代表当前正在处理的文件（module.resource）合并到commons chunk中，
    // 为false则不合并。
    minChunks: function (module, count) {
        // 就对入口文件及其依赖的模块进行遍历，如果该模块是js文件并且在node_modules中，
        // 就会加入到vendor当中，其实这也是一种让vendor只保留第三方库的办法。
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
    }
}),
/*
经过上面的分离出来的第三方库还包含着webpack的运行文件，因为每次打包webpack运行文件都会变，如果你不分离出webpack运行文件，每次打包生成vendor.js对应的哈希值都会变化，导致vendor.js改变，但实际上你的第三方库其实是没有变，然而浏览器会认为你原来缓存的vendor.js就失效，要重新去服务器中获取，其实只是webpack运行文件变化而已，就要客户端就要重新加载，很不好，这里就要从vendor中分离出webpack的运行文件manifest，chunks表示要从哪些文件中分离出manifest。
 */
new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
})
```

更全配置和用法：[详解CommonsChunkPlugin的配置和用法](https://segmentfault.com/a/1190000012828879)


##### CompressionWebpackPlugin
```
/*
asset： 目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。

test： 所有匹配该正则的资源都会被处理。默认值是全部资源。
threshold： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0
minRatio： 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
 */
new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
    ),
    threshold: 10240,
    minRatio: 0.8
})
```


##### 通过使用webpack-bundle-analyzer可以看到项目各模块的大小，可以按需优化
```
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
```
https://segmentfault.com/a/1190000012220132




