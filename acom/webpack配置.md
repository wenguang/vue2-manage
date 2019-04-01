
####webpack配置文件

完整的配置参考：https://webpack.docschina.org/configuration/


**resolve.fallback配置项的含义**：是模块在root及默认路径下都未找到时的最终查找路径

**output.path与output.publicPath**：output.path只是指示输出的目录，对应一个绝对路径，output.publicPath配置能帮助你为项目中的所有资源指定一个基础路径，它被称为公共路径。这里说的所有资源的基础路径是指项目中引用css，js，img等资源时候的一个基础路径
```
静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
```
例子：
```
output.publicPath = '/dist/'

// image
options: {
    name: 'img/[name].[ext]?[hash]'
}

// 最终图片的访问路径为
output.publicPath + 'img/[name].[ext]?[hash]' = '/dist/img/[name].[ext]?[hash]'

// js output.filename
output: {
    filename: '[name].js'
}
// 最终js的访问路径为
output.publicPath + '[name].js' = '/dist/[name].js'

// extract-text-webpack-plugin css
new ExtractTextPlugin({
    filename: 'style.[chunkhash].css'
})
// 最终css的访问路径为
output.publicPath + 'style.[chunkhash].css' = '/dist/style.[chunkhash].css'
```
参考：[Webpack中publicPath详解](https://juejin.im/post/5ae9ae5e518825672f19b094)


**css-loader与style-loader：**
- css-loader 的作用是处理css文件中 @import，url之类的语句，
- style-loader则是将css文件内容放在style标签内并插入head中

**从devtool: '#eval-source-map'说到webpack sourcemap的多种模式**：

**DefinePlugin插件**：允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和生产模式的构建允许不同的行为非常有用。
用法参考：https://webpack.docschina.org/plugins/define-plugin

**OccurenceOrderPlugin插件**：为组件分配id，通过这个插件webpack会分析使用频率最多的模块。

**HotModuleReplacementPlugin插件**：允许你在修改组件代码后，自动刷新实时预览修改后的效果。

**HtmlWebpackPlugin插件**：为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。

**[Webpack 常见静态资源处理 - 模块加载器（Loaders）+ExtractTextPlugin插件](https://www.cnblogs.com/sloong/p/5826818.html)**


**Object.keys**：[Object.keys用法总结](https://blog.csdn.net/juzipchy/article/details/76037755)


参考：[【30分钟】吃透webpack，也许这一篇就够了](https://segmentfault.com/a/1190000012631766#articleHeader20)


