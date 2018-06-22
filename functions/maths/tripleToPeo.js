var Peo = require('peo')

var tripleToPeo = function(p, a, b) {

  // The triple is a prime, a power of 2, and a power of 3
  // Output an instance of Peo

  var peoP = new Peo(p)            // p
  var peo23 = new Peo({2:a, 3:b})  // 2^a * 3^b
  var result = peoP.mult(peo23)    // 2^a * 3^b * p
  return result

}

module.exports = tripleToPeo
