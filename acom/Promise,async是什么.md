
#### Promise是什么
简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完后，用链式调用的方式执行回调函数。


[【大白话讲解Promise（一）】](https://www.cnblogs.com/lvdabao/p/es6-promise-1.html)（直白易懂）
[【大白话讲解Promise（二）】](https://www.cnblogs.com/lvdabao/p/5320705.html)（规范难懂）
[【大白话讲解Promise（三）】](https://www.cnblogs.com/lvdabao/p/jquery-deferred.html)（jquery的Promise实现太过垃圾）


#### async/await 【异步编程的最高境界，就是根本不用关心它是不是异步。】

**目前的理解：async在函数前表示，函数内有异步操作，await写在需要异步操作的语句前面，它异步操作完成后，就招待await的下一条语句，一切就同步代码，没什么回调函数，也没什么then**
```
async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    //...省略
    try {
        // await只能写在async函数内
        // fetch(url, requestConfig)和response.json() 都是异步操作
        // 有了await的修饰，就像写同步代码一样就行
        // 待异步操作完成得到responseJson，直接返回它就行
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson
    } catch (error) {
        throw new Error(error)
    }
}
```

【[三分钟学会用ES7中的Async/Await进行异步编程](http://www.webhek.com/post/javascript-async-await-2.html)】

