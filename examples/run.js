// var jircn = require('ji-rcn')           // via npm
var jircn = require('../index.js')       // locally

var Jinote = jircn.jinote
var jn = null

console.log("")
console.log("Example of newly created Jinote:")
console.log("`new Jinote(7, 5)`")
console.log("")
console.log(new Jinote(7, 5))
console.log("")
console.log("")

console.log("")
console.log("Example of Jinote with cached calculations:")
console.log("`new Jinote(7, 5)`")
console.log("")
jn = new Jinote(7, 5)
console.log(jn.getNotation())
console.log("")
console.log(jn)
console.log("")
console.log("")

console.log("")
console.log("Example of more complex Jinote:")
console.log("`new Jinote(31031000, 65537)`")
console.log("")
jn = new Jinote(31031000, 65537)
console.log(jn.getNotation())
console.log("")
console.log(jn)
console.log("")
console.log("")

console.log("")
console.log("Example of DR algorithm:")
console.log("`new Jinote(\"13/8\", \"DR\")`")
console.log("")
jn = new Jinote("13/8", "DR")
console.log(jn.getNotation())
console.log("")
console.log(jn)
console.log("")
console.log("")

console.log("")
console.log("Example of KG2 algorithm:")
console.log("`new Jinote(\"13/8\", \"KG2\")`")
console.log("")
jn = new Jinote("13/8", "KG2")
console.log(jn.getNotation())
console.log("")
console.log(jn)
console.log("")
console.log("")

for (var i=256; i<=320; i++) {
  var jn = new Jinote(i, 256)
  console.log(`${i}/256 maps to ${jn.getPitch()}`)
}
