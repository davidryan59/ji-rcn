var Fraction = require('fraction.js')
var tripleToFraction = require('./tripleToFraction.js')
var calcExp2 = require('./calcExp2.js')
var calcCents = require('./calcCents.js')

var getCommaSAG = function(p) {

  var cutoff = 68.5725082211804     // (3^19/2^30)^0.5 in cents

  for (var bp=0; bp<=6; bp++) {
    for (var s=-1; s<=1; s=s+2) {
      var b = bp * s
      var a = calcExp2(p, b)
      var fraction = tripleToFraction(p, a, b)
      var cents = calcCents(fraction)
      if (Math.abs(cents) <= cutoff) {
        return fraction
      }
    }
  }

  // -6 to +6 should take care of ANY fraction.
  // Should never reach here, and never need a default!
}

module.exports = getCommaSAG
