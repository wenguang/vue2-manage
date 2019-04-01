####eslintrc.js文件作用

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

更全eslint配置见：http://eslint.cn/docs/user-guide/configuring
分门别类的eslint规则见：http://eslint.cn/docs/rules/
