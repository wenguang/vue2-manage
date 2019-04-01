
**semver库：**语义化版本（Semantic Versioning）规范的一个实现，实现了版本和版本范围的解析、计算、比较，常在package.json中出现的 1.2.3-2.3.4、1.x、^0.2、>1.4 之类，Npm使用了该工具来处理版本相关的工作。semver可以作为一个node模块，同时也可以作为一个命令行工具

几个例子：
```
// 计较两个版本号的大小
semver.gt('1.2.3', '2.3.4') // false
semver.lt('1.2.3', '2.3.4') // true

// 验证版本号是否合法，返回null即不合法
semver.valid('1.2.3') // '1.2.3'
semver.valid('a.b.c') // null

// 提取版本号
semver.clean('  =v1.2.3   ') // '1.2.3'
semver.clean(process.version)// 获取node的版本
semver.major('1.2.3') // '1'
semver.minor('1.2.3') // '2'
semver.patch('1.2.3') // '3'

// 判断是否满足版本要求
semver.satisfies(mod.currentVersion, mod.versionRequirement)
```


#####child_process模块提供了几种创建子进程的方式

异步方式：spawn、exec、execFile、fork
同步方式：spawnSync、execSync、execFileSync