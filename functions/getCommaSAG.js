var Fraction = require('fraction.js')
var tripleToFraction = require('./tripleToFraction.js')
var calcExp2 = require('./calcExp2.js')
var calcCents = require('./calcCents.js')

var getCommaSAG = function(p) {

  var cutoff = 68.5725082211804     // (3^19/2^30)^0.5 in cents

  // Check b in paired sequence: 0, (0), 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6
  for (var b=0; b<=6; b++) {

    var b1 = b
    var a1 = calcExp2(p, b1)
    var fraction1 = tripleToFraction(p, a1, b1)
    var absCents1 = Math.abs(calcCents(fraction1))

    var b2 = -b
    var a2 = calcExp2(p, b2)
    var fraction2 = tripleToFraction(p, a2, b2)
    var absCents2 = Math.abs(calcCents(fraction2))

    if (absCents1 < absCents2) {
      if (absCents1 <= cutoff) {
        return fraction1
      }
    } else {
      if (absCents2 <= cutoff) {
        return fraction2
      }
    }
  }

  // -6 to +6 should take care of ANY fraction.
  // Should never reach here, and never need a default!
}

module.exports = getCommaSAG
