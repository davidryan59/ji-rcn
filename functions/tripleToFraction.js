var Fraction = require('fraction.js')

var tripleToFraction = function(p, a, b) {
  var num = p * Math.pow(2, Math.max(0, a)) * Math.pow(3, Math.max(0, b))
  var denom = Math.pow(2, Math.max(0, -a)) * Math.pow(3, Math.max(0, -b))
  return Fraction(num, denom)
}

module.exports = tripleToFraction
