var path = require('path')
var utils = require('./build/utils')

console.log(path.join(__dirname, '..', "test"));
console.log(utils.cssLoaders())
console.log('\n\n')
//console.log(utils.styleLoaders({ sourceMap: true, extract: true }))
