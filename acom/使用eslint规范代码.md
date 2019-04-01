####使用eslint规范代码

#####添加依赖包
```
"babel-eslint": "^7.1.1",               //eslint解析器，使其能支持es6等语法检测
"eslint": "^3.19.0",
"eslint-loader": "^1.7.1",              //连接eslint与webpack的loader
"eslint-config-standard": "^6.2.1",     //Airbnb的规范配置，目前最流行的js规范
"eslint-friendly-formatter": "^2.0.7",  //让eslint的错误信息出现在终端上
"eslint-plugin-html": "^2.0.0",         //让eslint可以检查html中内嵌的js
"eslint-plugin-promise": "^3.4.0",      //让eslint可以检查有promise特性的代码
"eslint-plugin-standard": "^2.0.1",
```

#####在webpack配置中添加eslint模块
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
eslint是规范js语法，所以他需要处理的是js文件，而且应该是先于所有loader去处理js文件，如果出错或者不规范则纠正之，这里可以利用webpack的 enforce 属性，设置eslint检查，先于其他loader


#####eslint配置文件.enlintlr.js
```
module.exports = {
    // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找
    root: true,
    // 指定eslint解析器为babel-eslint
    parser: 'babel-eslint',
    parserOptions: {
        //sourceType - 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
        sourceType: 'module'
    },
    env: {
        // 预定义的全局变量，支持浏览器环境和node环境
        browser: true,
        node: true
    },
    // 所有的规则默认都是禁用的。使用 "extends": "eslint:recommended" 来启用推荐的规则
    extends: 'eslint:recommended',
    // required to lint *.vue files
    plugins: [
        //对应eslint-plugin-html插件
        'html'
    ],
    // check if imports actually resolve
    // ESLint 支持在配置文件添加共享设置。
    // 你可以添加 settings 对象到配置文件，它将提供给每一个将被执行的规则。
    // 如果你想添加的自定义规则而且使它们可以访问到相同的信息，这将很有用，并且很容易配置。
    // 这里似乎是共享webpack的配置，有什么呢？
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    //除了上面eslint:recommended的推荐规则，在这儿加额外的规则
    'rules': {
        // arrow-parens: 表示要求箭头函数的参数使用圆括号
        'arrow-parens': 0,
        // allow async-await, 强制 generator 函数中 * 号周围使用一致的空格
        'generator-star-spacing': 0,
        // allow debugger during development, no-debugger表示禁用debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 强制使用一致的缩进
        "indent": ["error", "tab"]
    }
}
```

#####eslint 配置项
- root 限定配置文件的使用范围
- parser 指定eslint的解析器
- parserOptions 设置解析器选项
- extends 指定eslint规范
- plugins 引用第三方的插件
- env 指定代码运行的宿主环境
- rules 启用额外的规则或覆盖默认的规则
- globals 声明在代码中的自定义全局变量

更全eslint配置见：http://eslint.cn/docs/user-guide/configuring
分门别类的eslint规则见：http://eslint.cn/docs/rules/

参考：[webpack引入eslint详解](https://segmentfault.com/a/1190000012936029)
