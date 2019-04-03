
####除assetsPath方法是拼接路径外，其他那是为了生成样式loader配置的。
**styleLoaders方法和cssLoaders方法是暴露给外部，generateLoaders是cssLoaders的内部方法。styleLoaders方法为cssLoaders的各个loader加上前面test匹配文件扩展名**

#####styleLoaders带参 { sourceMap: true, extract: true } 得到的结果相当于如下
```
[
    {
        test:  /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [ { loader: 'css-loader', options: { minimize: false, sourceMap: true } } ],
          fallback: 'vue-style-loader'
         })
      },
      {
        test:  /\.postcss$/,
        use: ExtractTextPlugin.extract({
          use: [ { loader: 'css-loader', options: { minimize: false, sourceMap: true } } ],
          fallback: 'vue-style-loader'
         })
      },
      {
        test:  /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [ { loader: 'css-loader', options: { minimize: false, sourceMap: true } },
                   { loader: 'less-loader', options: { sourceMap: true } }
               ],
          fallback: 'vue-style-loader'
        })
      },
      {
        test:  /\.sass$/,
        use: ExtractTextPlugin.extract({
          use: [ { loader: 'css-loader', options: { minimize: false, sourceMap: true } },
                     { loader: 'sass-loader', options: { indentedSyntax: true, sourceMap: true } }
               ],
          fallback: 'vue-style-loader'
        })
      },
      {
        test:  /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [ { loader: 'css-loader', options: { minimize: false, sourceMap: true } },
                   { loader: 'scss-loader', options: { sourceMap: true } }
               ],
          fallback: 'vue-style-loader'
        })
      },
      {
        test:  /\.stylus$/,
        use: ExtractTextPlugin.extract({
          use: [ { loader: 'css-loader', options: { minimize: false, sourceMap: true } },
                 { loader: 'stylus-loader', options: { sourceMap: true } }
               ],
          fallback: 'vue-style-loader'
         })
      },
      {
        test:  /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: [ { loader: 'css-loader', options: { minimize: false, sourceMap: true } },
                   { loader: 'stylus-loader', options: { sourceMap: true } }
               ],
          fallback: 'vue-style-loader'
        })
      }
  ]
```


#####ExtractTextWebpackPlugin插件的作用
css在webpack被当作模块，会被打包到js中，ExtractTextWebpackPlugin是为了把css从最终的js中分离出来。**重要的是配置中use和fallback的含义**
```
// use: 用css-loader把css文件编译成js模块
// fallback: 编译后用vue-style-loader去提取独立的css文件
{
    test:  /\.css$/,
    use: ExtractTextPlugin.extract({
        use: [ { loader: 'css-loader', options: { minimize: false, sourceMap: true } } ],
        fallback: 'vue-style-loader'
     })
}
```



#####各样式loader的作用
- style-loader：以\<style\>标签的方式把css加DOM中
- css-loader：将 CSS 转化成 CommonJS 模块，css-loader 的作用是解释css文件中 @import，url之类的语句
- less-loader：将 less 编译成 CSS
- sass-loader：将 Sass 编译成 CSS
- postcss-loader：将 PostCSS 编译成 CSS

**一般less-loader、sass-loader、postcss-loader都会搭配css-loader使用，这是为什么代码已经定义好了一个css-loader配置，当用generateLoaders方法生成less类似配置时，都会加上这个定义好的css-loader配置，无论less、sass、postcss还是stylus预处理css语言编译成css后，还是要用到css-loader来处理@import、url之类的语句**




#####Object.assign(target, ...sources)
方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象

#####各样式loader的详细配置
[style-loader配置](https://webpack.docschina.org/loaders/style-loader/)
[css-loader配置](https://webpack.docschina.org/loaders/css-loader)
[less-loader配置](https://webpack.docschina.org/loaders/less-loader/)
[sass-loader配置](https://webpack.docschina.org/loaders/sass-loader/)
[postcss-loader配置](https://webpack.docschina.org/loaders/postcss-loader/)




[ExtractTextWebpackPlugin插件的作用
配置](https://webpack.docschina.org/plugins/extract-text-webpack-plugin/)
