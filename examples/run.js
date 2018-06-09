// var ji = require('ji-rcn')      // npm
var ji = require('../index.js')    // Locally

var p_arr = [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 5.1, 5.99, 3, 2, 1, 0, -1, -2, 21, 35, 257, 65537, 149, 151, 179, 181, 45077, 59051, 2499949]
for (var p of p_arr) {
  // Find RCN comma (DR algorithm) for each prime
  console.log(p + ": " + ji.primeToComma(p, "DR"))
}
