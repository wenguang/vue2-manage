
##### 暂时先这样配置
在nginx.conf的server节点下（http、https两个server节点的任意一个都可以）配置一个location，把webpack编译打包好的manage目录下所有东西连同目录放在nginx的html目录下，启动nginx访问即行。
```
location / {
    # html目录就在nginx的根目录下
    root   html;
    index  index.html;
}
```

#### 问题来了
1、我试着不把manage目录拷贝到html下，location的root改为/Users/wenguangpan/IdeaProjects/vue2-manage/manage，访问不了。
2、把location的匹配路径/改为/manage，root改为html/manage，访问不了。
3、不改变location的匹配路径/，只把root改为html/manage，访问http://localhost时，出来的是nginx的默认页。

**所以我先把manage放到html下，基于以上配置用http://localhost/manage/index.html来访问，3点问题有待研究**

更详细的nginx配置参考如下：
[nginx服务器安装及配置文件详解](https://segmentfault.com/a/1190000002797601)
[（总结）Nginx配置文件nginx.conf中文详解](http://www.ha97.com/5194.html)
[nginx配置location总结及rewrite规则写法](https://segmentfault.com/a/1190000002797606)

