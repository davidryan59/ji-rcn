// var jircn = require('ji-rcn')           // via npm
var jircn = require('../index.js')       // locally

var Jinote = jircn.jinote

console.log("Example of newly created Jinote")
console.log(new Jinote(7, 5))
console.log("")

console.log("Example of Jinote with cached calculations")
var jn = new Jinote(7, 5)
jn.getNotation()
console.log(jn)
console.log("")

console.log("Example of more complex Jinote")
var jn = new Jinote(31031000, 65537)
jn.getNotation()
console.log(jn)
console.log("")
