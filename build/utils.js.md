
####除assetsPath方法是拼接路径外，其他那是为了生成样式loader配置的。

先看看不带参数的styleLoaders()方法的输出
```
[ { test: /\.css$/, use: [ 'vue-style-loader', [Object] ] },
  { test: /\.postcss$/, use: [ 'vue-style-loader', [Object] ] },
  { test: /\.less$/,
    use: [ 'vue-style-loader', [Object], [Object] ] },
  { test: /\.sass$/,
    use: [ 'vue-style-loader', [Object], [Object] ] },
  { test: /\.scss$/,
    use: [ 'vue-style-loader', [Object], [Object] ] },
  { test: /\.stylus$/,
    use: [ 'vue-style-loader', [Object], [Object] ] },
  { test: /\.styl$/,
    use: [ 'vue-style-loader', [Object], [Object] ] } ]
```


#####各样式loader的作用
- style-loader：以\<style\>标签的方式把css加DOM中
- css-loader：将 CSS 转化成 CommonJS 模块，css-loader 的作用是解释css文件中 @import，url之类的语句

- less-loader：将 less 编译成 CSS
- sass-loader：将 Sass 编译成 CSS
- postcss-loader：将 PostCSS 编译成 CSS

**一般less-loader、sass-loader、postcss-loader都会搭配css-loader使用，这是为什么代码已经定义好了一个css-loader配置，当用generateLoaders方法生成less类似配置时，都会加上这个定义好的css-loader配置，无论less、sass、postcss还是stylus预处理css语言编译成css后，还是要用到css-loader来处理@import、url之类的语句**


#####ExtractTextWebpackPlugin插件的作用

#####Object.assign(target, ...sources)
方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象



**styleLoaders方法和cssLoaders方法是暴露给外部，generateLoaders是cssLoaders的内部方法。styleLoaders方法为cssLoaders的各个loader加上前面test匹配文件扩展名**



各样式loader的详细配置
[style-loader配置](https://webpack.docschina.org/loaders/style-loader/)
[css-loader配置](https://webpack.docschina.org/loaders/css-loader)
[less-loader配置](https://webpack.docschina.org/loaders/less-loader/)
[sass-loader配置](https://webpack.docschina.org/loaders/sass-loader/)
[postcss-loader配置](https://webpack.docschina.org/loaders/postcss-loader/)

[ExtractTextWebpackPlugin插件的作用
配置](https://webpack.docschina.org/plugins/extract-text-webpack-plugin/)
