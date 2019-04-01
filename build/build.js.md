
**rimraf库：**用于不同平台下（操作系统）进行多级目录删除。 等同于 rm -rf

**chalk库：**修改控制台中字符串的样式

#####编程方式使用webpack库 (api参考：https://webpack.docschina.org/api/node/#webpack-)
```
webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,         // 在控制台展示颜色
      modules: false,       // 添加构建模块信息
      children: false,      // 添加 children 信息
      chunks: false,        // （设置为 `false` 能允许较少的冗长输出）
      chunkModules: false   // 将构建模块信息添加到 chunk 信息
    }) + '\n\n')
```
其中的stats是webpack编译回调的一个参数，它包括：
- 错误和警告（如果有的话）
- 计时信息
- module和chunk 信息

stats.toString(options)：以格式化的字符串形式返回描述编译信息
stats对象包括什么信息与options选项 参考：https://webpack.docschina.org/configuration/stats


**console.log()调用process.stdout.write格式化输出**，很大的区别是process.stdout只将字符串作为参数（也可以是管道流）
```
Console.prototype.log = function() {
    this._stdout.write(util.format.apply(this, arguments) + '\n');
};
```