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

console.log("In the examples below, it is assumed 1/1 is notated C4, e.g. C4 is the base notation:")

console.log("")
for (var i=1; i<=32; i++) {
  var jn = new Jinote(i)
  console.log(`${i}  ->  ${jn.getPitch()}`)
}

console.log("")
for (var i=1; i<=32; i++) {
  var jn = new Jinote(1, i)
  console.log(`1/${i}  ->  ${jn.getPitch()}`)
}

console.log("")
for (var i=1; i<=32; i++) {
  var jn = new Jinote(i+1, i)
  console.log(`${i+1}/${i}  ->  ${jn.getPitch()}`)
}

console.log("")
for (var i=512; i<=540; i++) {
  var jn = new Jinote(i, 32)
  console.log(`${i}/32  ->  ${jn.getPitch()}`)
}

console.log("")
for (var i=1; i<=49; i++) {
  var num = Math.pow(2, i)
  var jn = new Jinote(num+1, num)
  console.log(`${num+1}/${num}  ->  ${jn.getPitch()}`)
}

console.log("")
for (var i=60; i<=90; i++) {
  var jn = new Jinote(i, 60)
  var fract = "" + jn.getFraction()
  var fractText = fract + " ".repeat(5-fract.length)
  console.log(`${i}/60 = ${fractText}  ->  ${jn.getPitch()}`)
}

console.log("")
for (var i=65536; i<=65536+15; i++) {
  var jn = new Jinote(i, 65536)
  var fract = "" + jn.getFraction()
  var fractText = fract + " ".repeat(11-fract.length)
  console.log(`${i}/65536 = ${fractText}  ->  ${jn.getPitch()}`)
}

console.log("")
for (var i=1e14-4; i<=1e14+4; i++) {
  var jn = new Jinote(i)
  console.log(`${i}  ->  ${jn.getPitch()}`)
}

console.log("")
var num = 1
var denom = 0
var temp = null
for (var i=1; i<=20; i++) {
  temp = num + denom
  denom = num
  num = temp
  var jn = new Jinote(num, denom)
  console.log(`${num}/${denom}  ->  ${jn.getPitch()}`)
}

console.log("")
var mid = 34650
var count = 15
var denom = 6930
for (var i=mid-count; i<=mid+count; i++) {
  var jn = new Jinote(i, denom)
  var fract = "" + jn.getFraction()
  var fractText = fract + " ".repeat(11-fract.length)
  console.log(`${i}/${denom} = ${fractText}  ->  ${jn.getPitch()}`)
}
console.log("")
for (var j=0; j<=20; j+=2) {
  for (var i=-5; i<=5; i++) {
    var mult = Math.pow(2, j)
    var num = i + 8*mult
    var jn = new Jinote(num, mult)
    console.log(`${num}/${mult}  ->  ${jn.getPitch()}`)
  }
  console.log("")
}

var len3 = 15
var len5 = 3
var array3 = []
var array5 = []
var array = []
for (var i=0; i<len3; i++) {array3.push(Math.pow(3, i))}
for (var i=0; i<len5; i++) {array5.push(Math.pow(5, i))}
for (var i=0; i<len3; i++) {
  for (var j=0; j<len5; j++) {
    array.push(array3[i] * array5[j])
  }
}
array.filter(function(elt){return ((10000<elt) && (elt<100000))})
array.sort(function(elt1, elt2){return elt1-elt2})
for (var i=0; i<array.length; i++) {
  var num = array[i]
  var denom = Math.pow(2, Math.floor(Math.log(num)/Math.log(2)))
  var jn = new Jinote(num, denom)
  console.log(`${num}/${denom}  ->  ${jn.getPitch()}`)
}

console.log("")
console.log("Constructing a Jinote for factorial of 60 (big number)")
jn = new Jinote(Peo.fact(60))
jn.getNotation()
console.log(jn)
console.log("")
console.log("Jinote can go much higher than this - factorial of 1000000 should be fine to calculate, but take a while to print!")
console.log("")
