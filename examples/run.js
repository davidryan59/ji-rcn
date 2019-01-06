var Peo = require('peo')
// var ji = require('ji-rcn')           // via npm
var ji = require('../src/index.js')       // locally
var JInterval = ji.jinterval
var jint = null
var peo = null

console.log("")
console.log("Example of newly created JInterval:")
console.log("`new JInterval(7, 5)`")
console.log("")
console.log(new JInterval(7, 5))
console.log("")
console.log("")

console.log("")
console.log("Example of JInterval with cached calculations:")
console.log("`new JInterval(7, 5)`")
console.log("")
jint = new JInterval(7, 5)
console.log(jint.getNotation())
console.log("")
console.log(jint)
console.log("")
console.log("")

console.log("")
console.log("Example of more complex JInterval:")
console.log("`new JInterval(31031000, 65537)`")
console.log("")
jint = new JInterval(31031000, 65537)
console.log(jint.getNotation())
console.log("")
console.log(jint)
console.log("")
console.log("")

console.log("")
console.log("Example of DR algorithm:")
console.log("`new JInterval(\"13/8\", \"DR\")`")
console.log("")
jint = new JInterval("13/8", "DR")
console.log(jint.getNotation())
console.log("")
console.log(jint)
console.log("")
console.log("")

console.log("")
console.log("Example of KG2 algorithm:")
console.log("`new JInterval(\"13/8\", \"KG2\")`")
console.log("")
jint = new JInterval("13/8", "KG2")
console.log(jint.getNotation())
console.log("")
console.log(jint)
console.log("")
console.log("")

console.log("")
console.log("Example of getting a comma:")
console.log("`JInterval.getComma(7)`")
console.log("")
console.log(JInterval.getComma(7))
console.log("")
console.log("")

console.log("")
console.log("Example of parsing notation text:")
console.log("`JInterval.parseNotation(\"D'[7]6\")`")
console.log("")
peo = JInterval.parseNotation("D'[7]6")
console.log(peo)
console.log("")
console.log(peo.getText())
console.log("")
console.log("")

console.log("")
console.log("Creation of JInterval on same notation text:")
console.log("`new JInterval(\"D'[7]6\")`")
console.log("")
jint = new JInterval("D'[7]6")
console.log(jint)
console.log("")
console.log(jint.getFraction())
console.log("")
console.log("")

console.log("")
console.log("Alternative notations using Pythagorean commas:")
console.log("`new JInterval(\"Cp4\")`")
console.log("`new JInterval(\"B#3\")`")
console.log("")
jn1 = new JInterval("Cp4")
jn2 = new JInterval("B#3")
console.log(jn1)
console.log(jn2)
console.log("")
console.log(jn1.getFraction())
console.log(jn2.getFraction())
console.log("")

console.log("In the examples below, it is assumed 1/1 is notated C4, e.g. C4 is the base notation:")

console.log("")
for (var i=1; i<=32; i++) {
  var jint = new JInterval(i)
  console.log(`${i}  ->  ${jint.getPitch()}`)
}

console.log("")
for (var i=1; i<=32; i++) {
  var jint = new JInterval(1, i)
  console.log(`1/${i}  ->  ${jint.getPitch()}`)
}

console.log("")
for (var i=1; i<=32; i++) {
  var jint = new JInterval(i+1, i)
  console.log(`${i+1}/${i}  ->  ${jint.getPitch()}`)
}

console.log("")
for (var i=512; i<=540; i++) {
  var jint = new JInterval(i, 32)
  console.log(`${i}/32  ->  ${jint.getPitch()}`)
}

console.log("")
for (var i=1; i<=49; i++) {
  var num = Math.pow(2, i)
  var jint = new JInterval(num+1, num)
  console.log(`${num+1}/${num}  ->  ${jint.getPitch()}`)
}

console.log("")
for (var i=60; i<=90; i++) {
  var jint = new JInterval(i, 60)
  var fract = "" + jint.getFraction()
  var fractText = fract + " ".repeat(5-fract.length)
  console.log(`${i}/60 = ${fractText}  ->  ${jint.getPitch()}`)
}

console.log("")
for (var i=65536; i<=65536+15; i++) {
  var jint = new JInterval(i, 65536)
  var fract = "" + jint.getFraction()
  var fractText = fract + " ".repeat(11-fract.length)
  console.log(`${i}/65536 = ${fractText}  ->  ${jint.getPitch()}`)
}

console.log("")
for (var i=1e14-4; i<=1e14+4; i++) {
  var jint = new JInterval(i)
  console.log(`${i}  ->  ${jint.getPitch()}`)
}

console.log("")
var num = 1
var denom = 0
var temp = null
for (var i=1; i<=20; i++) {
  temp = num + denom
  denom = num
  num = temp
  var jint = new JInterval(num, denom)
  console.log(`${num}/${denom}  ->  ${jint.getPitch()}`)
}

console.log("")
var mid = 34650
var count = 15
var denom = 6930
for (var i=mid-count; i<=mid+count; i++) {
  var jint = new JInterval(i, denom)
  var fract = "" + jint.getFraction()
  var fractText = fract + " ".repeat(11-fract.length)
  console.log(`${i}/${denom} = ${fractText}  ->  ${jint.getPitch()}`)
}
console.log("")
for (var j=0; j<=20; j+=2) {
  for (var i=-5; i<=5; i++) {
    var mult = Math.pow(2, j)
    var num = i + 8*mult
    var jint = new JInterval(num, mult)
    console.log(`${num}/${mult}  ->  ${jint.getPitch()}`)
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
  var jint = new JInterval(num, denom)
  console.log(`${num}/${denom}  ->  ${jint.getPitch()}`)
}

console.log("")
console.log("Constructing a JInterval for factorial of 60 (big number)")
jint = new JInterval(Peo.fact(60))
jint.getNotation()
console.log(jint)
console.log("")
console.log("JInterval can go much higher than this - factorial of 1000000 should be fine to calculate, but take a while to print!")
console.log("")
