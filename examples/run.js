var Peo = require('peo')
// var ji = require('ji-rcn')           // via npm
var ji = require('../src/index.js')       // locally
var Jinote = ji.jinote
var jn = null
var peo = null

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

console.log("")
console.log("Example of getting a comma:")
console.log("`Jinote.getComma(7)`")
console.log("")
console.log(Jinote.getComma(7))
console.log("")
console.log("")

console.log("")
console.log("Example of parsing notation text:")
console.log("`Jinote.parseNotation(\"D'[7]6\")`")
console.log("")
peo = Jinote.parseNotation("D'[7]6")
console.log(peo)
console.log("")
console.log(peo.getText())
console.log("")
console.log("")

console.log("")
console.log("Creation of Jinote on same notation text:")
console.log("`new Jinote(\"D'[7]6\")`")
console.log("")
jn = new Jinote("D'[7]6")
console.log(jn)
console.log("")
console.log(jn.getFraction())
console.log("")
console.log("")

console.log("")
console.log("Alternative notations using Pythagorean commas:")
console.log("`new Jinote(\"Cp4\")`")
console.log("`new Jinote(\"B#3\")`")
console.log("")
jn1 = new Jinote("Cp4")
jn2 = new Jinote("B#3")
console.log(jn1)
console.log(jn2)
console.log("")
console.log(jn1.getFraction())
console.log(jn2.getFraction())
console.log("")

console.log("")
for (var i=1; i<=32; i++) {
  var jn = new Jinote(i, i+1)
  var fract = "" + jn.getFraction()
  var fractText = fract + " ".repeat(6-fract.length)
  console.log(`${i}/${i+1} maps to ${fractText} ${jn.getPitch()}`)
}

console.log("")
for (var i=16; i<=32; i++) {
  var jn = new Jinote(1, i)
  console.log(`1/${i} maps to ${jn.getPitch()}`)
}

console.log("")
for (var i=32; i<=64; i++) {
  var jn = new Jinote(i)
  console.log(`${i} maps to ${jn.getPitch()}`)
}

console.log("")
for (var i=360; i<=400; i++) {
  var jn = new Jinote(i, 360)
  var fract = "" + jn.getFraction()
  var fractText = fract + " ".repeat(8-fract.length)
  console.log(`${i}/360 maps to ${fractText} ${jn.getPitch()}`)
}

console.log("")
for (var i=1e6; i<=1e6+10; i++) {
  var jn = new Jinote(i, 65536)
  var fract = "" + jn.getFraction()
  var fractText = fract + " ".repeat(13-fract.length)
  console.log(`${i}/65536 maps to ${fractText} ${jn.getPitch()}`)
}

console.log("")
for (var i=1e14-4; i<=1e14+4; i++) {
  var jn = new Jinote(i)
  console.log(`${i} maps to ${jn.getPitch()}`)
}

console.log("")
console.log("Constructing a Jinote for factorial of 60 (big number)")
jn = new Jinote(Peo.fact(60))
jn.getNotation()
console.log(jn)
console.log("")
console.log("Jinote can go much higher than this - factorial of 1000000 should be fine to calculate, but take a while to print!")
console.log("")
