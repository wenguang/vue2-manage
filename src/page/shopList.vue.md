
##### bug: 点击扩开显示，点编辑，关闭编辑框，再点关闭行扩开显示就不动了



##### props的用法，向子组件传递数据（通过定义组件属性）
看完下面的例子，就明白props就是定义组件的属性，vue组件相当于html的标签，props就是定义标签的属性，完成组件定义后，就可以给props定义属性传值，这样就完成了对vue组件传递数据的目的
```
<body>
    <div>
        <p>组件意味着协同工作，通常父子组件会是这样的关系：组件 A 在它的模板中使用了组件 B。它们之间必然需要相互通信：父组件要给子组件传递数据，子组件需要将它内部发生的事情告知给父组件。然而，在一个良好定义的接口中尽可能将父子组件解耦是很重要的。这保证了每个组件可以在相对隔离的环境中书写和理解，也大幅提高了组件的可维护性和可重用性。 在 Vue 中，父子组件的关系可以总结为 props down, events up。父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息。看看它们是怎么工作的。</p>
        <img src="https://github.com/wenguang/startup/blob/master/imgs/vue-components-com.png?raw=true" alt="">
    </div>
    <div id="vm">
        <div><strong>在子组件中用props定义属性，父组件向子组件属性赋值，子组件在template中用插值方式使用属性的值，这就是父组件向子组件传递数据的过程，关键就是prop</strong></div>
        <div>
            <child message="hello!"></child>
        </div>
        <div>
            <input v-model="parentMsg">
            <br>
            <child v-bind:message="parentMsg"></child>
        </div>
    </div>
    <script type="text/javascript">
    Vue.component('child', {
        props: ['message'],
        template: '<span>{{message}}</span>'
    });
    new Vue({
        el: '#vm',
        data: {
            parentMsg: ''
        }
    });
    </script>
</body>
```


##### 插槽 slot，匿名slot，具名slot，作用域slot(也叫带数据的slot)

插槽有一个简单的概念：**插槽，也就是slot，是组件的一块HTML模板，这块模板显示不显示、以及怎样显示由父组件来决定。 实际上，一个slot最核心的两个问题这里就点出来了，是显示不显示和怎样显示。**

匿名slot（一个组件能且只能有一个匿名slot）
```
/*
这里子组件只有一个slot，父组件只有给出一段html模板就会默认放在这个匿名的slot中了，
若父组件在用子组件时没有为其slot提供html模板，那slot就啥都不显示
 */

// 父组件
<template>
    <div class="father">
        <h3>这里是父组件</h3>
        <child>
            <div class="tmpl">
              <span>菜单1</span>
            </div>
        </child>
    </div>
</template>

// 子组件
<template>
    <div class="child">
        <h3>这里是子组件</h3>
        <slot></slot>
    </div>
</template>
```

具名slot（一个组件可以有多个具名slot）
```
//父组件
<template>
  <div class="father">
    <h3>这里是父组件</h3>
    <child>
      <div class="tmpl" slot="up">
        <span>菜单1</span>
      </div>
      <div class="tmpl" slot="down">
        <span>菜单-1</span>
      </div>
      <div class="tmpl">
        <span>菜单->1</span>
      </div>
    </child>
  </div>
</template>

//子组件
<template>
  <div class="child">
    // 具名插槽
    <slot name="up"></slot>
    <h3>这里是子组件</h3>
    // 具名插槽
    <slot name="down"></slot>
    // 匿名插槽
    <slot></slot>
  </div>
</template>
```

作用域slot(带数据的slot)
```
/*
作用域插槽和单个插槽和具名插槽的区别，因为单个插槽和具名插槽不绑定数据，所以父组件是提供的模板要既包括样式由包括内容的，而作用域插槽，父组件只需要提供一套样式（在确实用作用域插槽绑定的数据的前提下）。
 */

//父组件
<template>
  <div class="father">
    <h3>这里是父组件</h3>
    <!--第一次使用：用flex展示数据-->
    <child>
      <template slot-scope="user">
        <div class="tmpl">
          <span v-for="item in user.data">{{item}}</span>
        </div>
      </template>

    </child>

    <!--第二次使用：用列表展示数据-->
    <child>
      <template slot-scope="user">
        <ul>
          <li v-for="item in user.data">{{item}}</li>
        </ul>
      </template>

    </child>

    <!--第三次使用：直接显示数据-->
    <child>
      <template slot-scope="user">
       {{user.data}}
      </template>

    </child>

    <!--第四次使用：不使用其提供的数据, 作用域插槽退变成匿名插槽-->
    <child>
      我就是模板
    </child>
  </div>
</template>

//子组件
<template>
  <div class="child">

    <h3>这里是子组件</h3>
    // 作用域插槽
    <slot :data="data"></slot>
  </div>
</template>

 export default {
    data: function(){
      return {
        data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
      }
    }
}
```

参考：
[深入理解vue中的slot与slot-scope](https://segmentfault.com/a/1190000012996217)
[官方文档：插槽，也就是把显示什么和怎么显示的权力交给了父组件，显示什么和怎么显示](https://cn.vuejs.org/v2/guide/components-slots.html)(2.6.0后slot-scope特性被废弃)


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






