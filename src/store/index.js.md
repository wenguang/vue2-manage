
##### mutations与actions的区别

- 只有mutation才能正真改变VUEX stroe中的state，且只支持同步操作
- actions通过commit提交的是mutations，而不是直接变更状态，它支持异步操作
```
// 单纯地改变state.adminInfo
const mutations = {
    saveAdminInfo(state, adminInfo){
        state.adminInfo = adminInfo;
    }
}
// 异步调用api，再通过commit提交mutations，最终改变state.adminInfo
const actions = {
    async getAdminData({commit}){
        try{
            const res = await getAdminInfo()
            if (res.status == 1) {
                commit('saveAdminInfo', res.data);
            }else{
                throw new Error(res.type)
            }
        }catch(err){
            // console.log(err.message)
        }
    }
}
```

