

##### 主要是底部加载与动画效果（待续...）


##### style、currentStyle、computedStyle

- style只能获取元素的内联样式，内部样式和外部样式使用style是获取不到的。
- currentStyle可以弥补style的不足，但是只适用于IE。
- getComputedStyle同currentStyle作用相同，但是适用于FF、opera、safari、chrome。

这是内嵌样式
```
<style type="text/css">
   /*这是嵌入样式*/
   .stuff{color:#f90}
</style>
```
这是外部样式
```
<link rel="stylesheet" href="path/style.css" type="text/css">
```


##### requestAnimationFrame
requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。

设置这个API的目的是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。代码中使用这个API，就是告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘。

requestAnimationFrame的优势，在于充分利用显示器的刷新机制，比较节省系统资源。显示器有固定的刷新频率（60Hz或75Hz），也就是说，每秒最多只能重绘60次或75次，requestAnimationFrame的基本思想就是与这个刷新频率保持同步，利用这个刷新频率进行页面重绘。此外，使用这个API，一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了CPU、GPU和电力。

不过有一点需要注意，requestAnimationFrame是在主线程上完成。这意味着，如果主线程非常繁忙，requestAnimationFrame的动画效果会大打折扣。

requestAnimationFrame使用一个回调函数作为参数。这个回调函数会在浏览器重绘之前调用。

参考：https://javascript.ruanyifeng.com/htmlapi/requestanimationframe.html