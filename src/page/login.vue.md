
##### mounted的作用
mounted是vue的生命周期钩子函数（beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDesdroy、desdroyed）中的一个。
- created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
- mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。



##### computed
计算属性是基于它们的依赖进行缓存的，计算属性只有在它的相关依赖发生改变时才会重新求值。computed依赖的属性必须是响应式的，不然，即使属性变化了，也不触发计算属性重新计算。


[理解Vuex，看这篇就够了](https://mobilesite.github.io/2016/12/18/vuex-introduction/)


##### ...mapState ...mapActions
一个vue实例（通常对应一个页面）有其data、computed、methods和watch，这些都是这个vue实例的范围内作用，整个应用共享的数据则由vuex管理，有state、getters、actions、mutations。想在vue实例中访问vuex管理的共享数据，可以这样：this.$store.state.xxx，this.$store.actions.xxx。更好的方法是借助mapState、mapGetters、mapActions
```
computed: {
            // mapState接收一个数组，数组中的adminInfo就是vuex的state中的adminInfo
            // mapState就是把state中的adminInfo映射成vue实例的相同名称的计算属性
            // 把就有了在mounted生命周期方法中这样的代码this.adminInfo.id
            // ...是展开运行符，就是把数组中每个都做映射，这里数组只有一个元素adminInfo
            ...mapState(['adminInfo']),
        },
        methods: {
            // mapActions与mapState类似，它把vuex的actions映射为vue实例的methods
            ...mapActions(['getAdminData']),
```

##### this.$refs、this.$message、this.$notify、this.$store、this.$router
在ui元素中标注ref属性，就可以用this$refs\[refName\]就
```
<el-form :model="loginForm" :rules="rules" ref="loginForm">
...
this.$refs['loginForm']
```

this.$store、this.$router分别是vuex和vue-router
this.$message是element-ui的公共提示组件
this.$notify是element-ui的通知组件


##### this.$refs\[formName\].validate
它验证输出是否符合rules定义的规则
```
async submitForm(formName) {
    this.$refs[formName].validate(async (valid) => {
        if (valid) {
            //...
        } else {
            //...
        }
    });
},
```









