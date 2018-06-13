var Fraction = require('fraction.js')
// var ji = require('ji-rcn')                     // npm
var getCommaP = require('../index.js').getCommaP    // Locally

var p_arr = [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 5.1, 5.99, 3, 2, 1, 0, -1, -2, 21, 35, 257, 65537, 149, 151, 179, 181, 45077, 59051, 2499949]
for (var p of p_arr) {
  // Find RCN comma (DR algorithm) for each prime
  console.log(p + ": " + getCommaP(p, "DR"))
}

getCommaP(5,"KG2")

var arr = [
  [5, [80, 81]]
, [7, [63, 64]]
, [11, [704, 729]]
, [13, [1052, 1024]]
, [17, [4131, 4097]]
, [19, [513, 512]]
, [23, [16767, 16384]]
, [29, [261, 257]]
, [31, [248, 243]]
, [37, [999, 1023]]
, [41, [82, 81]]
, [43, [129, 128]]
, [47, [47, 48]]
, [53, [53, 54]]
, [59, [246, 243]]
, [61, [244, 243]]
, [67, [16281, 16385]]
, [71, [71, 72]]
, [73, [73, 72]]
, [79, [79, 82]]
, [83, [249, 256]]
, [89, [712, 729]]
, [97, [97, 95]]
]
for (var i=0; i<arr.length; i++) {
  var p = arr[i][0]
  var actualValue = getCommaP(p, "KG2")
  var expectedValue = Fraction(arr[i][1])
  console.log("")
  console.log(p)
  console.log(actualValue)
  console.log(expectedValue)

}
