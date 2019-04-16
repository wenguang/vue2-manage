
#### 关键是slot-scope的理解
理解了以下两点，及它们的使用场景，也就算是理解了slot-scope了
```
/*
子组件插槽中的这个:data="data"表示什么？
右边的data表示某个数据，这个数据可以也父组件提供的原始数据，也可以是经子组件封闭后的数据
左边的:data可以随意取名，如:row。
有了这一句，就可以把某个数据回传给父组件处理，比如根据回传的数据判断要不要显示。
为什么要把数据回传给父组件，而不在子组件做处理呢？因为要保持子组件功能的单纯性，既然子组件提供了插槽，也就是把显示什么和怎样显示的权力交给了父组件，显示什么和怎样显示通常是根据数据要判断的，那么数据的处理逻辑权力自然就应该交回父组件了。
 */
<slot :data="data"></slot>

/*
父组件给子组件插槽提供模板时，slot-scope="user"又有什么用呢？
右边的user可能随意取名，通过slot-scope定义的名字加上子组件slot中左边定义的名称就可以得到子组件回传的数据了。
 */
}
<template slot-scope="user">
   {{user.data}}
</template>
```

#### 看回shopList.vue中的代码
```
// 点击行头扩展显示的例子
<el-table-column type="expand">
    <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="店铺名称">
            <span>{{ props.row.name }}</span>
            </el-form-item>
            //...更多el-form-item
        </el-form>
    </template>
</el-table-column>
/*
子组件el-table-column提供了插槽（作用域插槽），且在插槽中定义:row回数据给父组件el-table
父组件el-table要它提供el-form的模板，用slot-scope定义了props要提取el-table-column的回传数据
 */

// 再点击行编辑数据的例子
<el-table-column label="操作" width="200">
    <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        //...更多el-button
    </template>
</el-table-column>
/*
子组件el-table-column在插槽中定义:$index回行索引
 */
```



参考：[Vue的slot-scope的场景的个人理解](https://segmentfault.com/a/1190000015884505)