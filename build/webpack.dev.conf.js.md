
##### devtool: '#cheap-module-eval-source-map' 绝大多数情况下都会是最好的选择，这也是下版本 webpack 的默认选项

原因参考：[webpack sourcemap 选项多种模式的一些解释](https://segmentfault.com/a/1190000004280859)



##### webpack.DefinePlugin插件（wepack内置）
允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和生产模式的构建允许不同的行为非常有用。
```
// 定义一个名为process.env的全局常量
new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
```
用法参考：https://webpack.docschina.org/plugins/define-plugin

##### HtmlWebpackPlugin（为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包）
```
// manage目录下的index.html就是利用该插件生成的
new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
```
更全配置：[html-webpack-plugin用法全解](https://segmentfault.com/a/1190000007294861)


##### webpack.HotModuleReplacementPlugin（热更新，内置）
##### webpack.NoEmitOnErrorsPlugin（在输出阶段时，遇到编译错误跳过，内置）
##### [FriendlyErrorsPlugin](https://www.npmjs.com/package/friendly-errors-webpack-plugin)
