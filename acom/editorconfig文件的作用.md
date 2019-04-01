
**痛点**
```
当多人共同开发一个项目的时候，往往会出现大家用不同编辑器的情况。就前端开发者来说，有人喜欢 Sublime，有人喜欢 Webstorm , 也有人喜欢 Atom，还有人喜欢 Vim，HBuilder 等等。各种不同编程语言的开发者喜欢各种不同的编辑器。
问题来了，如何让使用不同编辑器的开发者在共同开发一个项目时“无痛”地遵循编码规范(编码风格)？
```

**要做两件事：**
- 安装与编辑器对应的 EditorConfig 插件
- 在项目根创建一个名为 .editorconfig 的文件

**EditorConfig 支持的常用的编码规范**

charset：文件编码。可选值
latin1
utf-8。一般用这个。
utf-16be
utf-16le

indent_style: 缩进类型。可选值
space
tab

indent_size: 缩进数量。可选值
整数。一般设置 2 或 4。
tab

insert_final_newline：是否在文件的最后插入一个空行。可选值
true
false

end_of_line：换行符格式。说明见Wiki：换行。可选值
lf。一般用这个。
crlf
cr

trim_trailing_whitespace：是否删除行尾的空格。可选值
true
false


参考：[EditorConfig 介绍](https://www.jianshu.com/p/712cea0ef70e)

