var path = require('path')
var utils = require('./build/utils')

// console.log(path.join(__dirname, '..', "test"));
//console.log(utils.cssLoaders())
// console.log('\n\n')
//console.log(utils.styleLoaders({ sourceMap: true, extract: true }))
// utils.styleLoaders({ sourceMap: true, extract: true })

new Promise(function(resolve, reject){
    //做一些异步操作
    setTimeout(function(){
        var num = Math.ceil(Math.random()*10); //生成1-10的随机数
        if(num % 2 == 0){
            resolve(num);
        }
        else{
            reject('我不要单数');
        }
    }, 2000)
}).then(
	function(data) {
		console.log(data)
	}//,
	// function(data) {
	// 	console.log(data)
	// }
).catch(function(error) {
	console.log(error)
})