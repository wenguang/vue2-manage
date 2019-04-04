
#### 这个配置怎么搞，vueLoaderConfig用的是utils.cssLoaders，奇怪这里对应的options！？
```
{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }
```


#### output.filename中的\[name\]、\[id\]、\[hash\]、\[chunkhash\]
\[name\]：使用入口名称
\[id\]：使用内部 chunk id
\[hash\]：使用每次构建过程中，唯一的 hash 生成
\[chunkhash\]：使用基于每个 chunk 内容的 hash


##### resolve.extensions
```
resolve: {
  // // 当你reuire时，不需要加上以下扩展名
  extensions: ['.js', '.vue', '.json'],
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src')
  }
}
```


##### path.join方法
```
return path.join(__dirname, '..', dir)
```
join的参数可大于两个，2 3 4都可以，'..'表示上级目录


##### 配置eslint-loader 及enforce选项
```
rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce : 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
```
eslint是规范js语法，所以他需要处理的是js文件，而且应该是先于所有loader去处理js文件，如果出错或者不规范则纠正之，这里可以利用webpack的 enforce 属性，设置eslint检查，先于其他loader，include表示要检查src、test目录下的代码，options中的formatter引用了eslint-friendly-formatter，表示让eslint的错误信息出现在终端上。


##### eslint依赖包
```
"babel-eslint": "^7.1.1",               //eslint解析器，使其能支持es6等语法检测
"eslint": "^3.19.0",
"eslint-loader": "^1.7.1",              //连接eslint与webpack的loader
"eslint-config-standard": "^6.2.1",     //Airbnb的规范配置，目前最流行的js规范
"eslint-friendly-formatter": "^2.0.7",  //让eslint的错误信息出现在终端上
"eslint-plugin-html": "^2.0.0",         //让eslint可以检查html中内嵌的js
"eslint-plugin-promise": "^3.4.0",      //让eslint可以检查有promise特性的代码
"eslint-plugin-standard": "^2.0.1",     //
```

##### url-loader的options.name

```
name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
```

```
 [path]，[name]， [hash] 和 [ext] 占位符，它们对应的含义是：

[ext]：String，默认值为 file.extname，表示资源扩展名；
[name]：String，默认值为 file.basename，表示资源的基本名称；
[path]：String，默认值为 file.dirname，表示资源相对于 context 的路径；
[hash]：String，默认值为 md5，内容的哈希值，支持灵活的 hashes 配置，配置规则为：[<hashType>:hash:<digestType>:<length>]，对应的说明如下：
```

若options为{}，则name为默认的文件名为 \[hash\].\[ext\]（如 bd62c377ad80f89061ea5ad8829df35b.png)



