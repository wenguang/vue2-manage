

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



####【[什么是Fetch](https://blog.csdn.net/crystal6918/article/details/53318194)】
因为XMLHttpRequest基于事件异步处理不符合关注点分离原则，所以Fetch被设计出来。

Fetch API 基于Promise，所以它一般的用法是这样的，但这里（fetch.js）还用到了async和await
```
fetch(url, requestConfig)
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response))
```

fetch的配置参数requestConfig
```
{
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
}
```

**Fetch详细的用法见：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch**


##### Object.defineProperty
这个函数接受三个参数，一个参数是obj，表示要定义属性的对象,一个参数是prop，是要定义或者更改的属性名字，另外是descriptor,描述符，来定义属性的具体描述。
Object.defineProperty(obj, prop, descriptor)
参考：[vue.js关于Object.defineProperty的利用原理](https://www.jianshu.com/p/07ba2b0c8fca)
```
if (type == 'POST') {
    // 给fetch的requestConfig定义一个新属性body，设其值为data的json
    Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
    })
}
```


##### Promise + XMLHttpRequest 的AJAX实现
onreadystatechange事件的readyState，它存有XMLHttpRequest的状态。从0到4发生变化。
0: 请求未初始化
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪
```
return new Promise((resolve, reject) => {
    let requestObj;
    if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
    } else {
        requestObj = new ActiveXObject;
    }

    let sendData = '';
    if (type == 'POST') {
        sendData = JSON.stringify(data);
    }
    // 建立连接
    requestObj.open(type, url, true);
    // 设置header
    requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // 发送了请求
    requestObj.send(sendData);

    // 这里要不要放在建立连接之前呢，为什么？
    requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
            if (requestObj.status == 200) {
                let obj = requestObj.response
                if (typeof obj !== 'object') {
                    obj = JSON.parse(obj);
                }
                resolve(obj)
            } else {
                reject(requestObj)
            }
        }
    }
})
```
Promise的基本用法参考这篇就行：[大白话讲解Promise（一）](https://www.cnblogs.com/lvdabao/p/es6-promise-1.html)