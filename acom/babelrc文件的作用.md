

**babel是js的转译器，js的新语法层出不穷，es2015、es7...还有各种新出API，新语法和新API让编写js更爽，但有些浏览器还未来得及兼容这些新东西，那为了让浏览器都能识别这些新东西，就需要一个工具给新语法做下转译，babel就是这么个东西。.babelrc就是babel的配置文件**

要用babel，先得在package.json的devDependencies引入babel相关的包，这里就是：
```
    "babel-core": "^6.0.0",
    "babel-loader": "^6.0.0",
    "babel-plugin-transform-runtime": "^6.0.0",
    "babel-preset-es2015": "^6.0.0",
    "babel-preset-stage-2": "^6.0.0",
    "babel-register": "^6.0.0",
    "babel-runtime": "^6.23.0",
```


这里的.babelrc文件很简洁，就几行：
```
{
  "presets": ["es2015", "stage-2"],
  "plugins": ["transform-runtime"],
  "comments": false,
}
```

```
{
  "presets": [
    ["env", { "modules": false }],
    "stage-2"
  ],
  "plugins": ["transform-runtime"],
  "comments": false,
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": [ "istanbul" ]
    }
  }
}
```


presets是预设，它里面的值es2015对应babel-preset-es2015包，stage-2对应babel-preset-stage-2包，**persets的意思就是告诉babel按es2015和stage-2的定义范围来转译。**


plugins就是转译插件，**它就是告诉babel要转译js的某个特性**，如transform-runtime，对应babel-plugin-transform-runtime包，它为了解决这种全局对象或者全局对象方法编译不足的情况，但是它只会对es6的语法进行转换，而不会对新API进行转换

**一个preset通常包括很多plugin的功能**，所以plugins只配置那个presets中没包含但又很重要的转译特性。

comments就很简单了，就是转译后带不带注释。


除presets、plugins、comments，还有其他的配置，presets配置中除了es2015、stage-2，还有stage-0、stage-1、stage-3，它们要各有什么含义？请参考：
[babel之配置文件.babelrc入门详解](https://juejin.im/post/5a79adeef265da4e93116430)
[Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)



