var Fraction = require('fraction.js')

var tripleToFraction = function(p, a, b) {

  // The triple is a prime, a power of 2, and a power of 3
  // Output a Fraction as per fraction.js package

  var num = p * Math.pow(2, Math.max(0, a)) * Math.pow(3, Math.max(0, b))
  var denom = Math.pow(2, Math.max(0, -a)) * Math.pow(3, Math.max(0, -b))
  return new Fraction(num, denom)
  
}

module.exports = tripleToFraction
