/* eslint-disable consistent-return */

var tripleToPeo = require('../../maths/tripleToPeo');
var calcExp2 = require('../../maths/calcExp2');
var calcCents = require('../../maths/calcCents');

var getCommaSAG = function getCommaSAG(p) {
  // Calculate a prime comma, according to the SAG algorithm

  // Could add a primality check here

  var cutoff = 68.5725082211804;     // (3^19/2^30)^0.5 in cents

  // Check b in paired sequence: 0, (0), 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6
  for (var b = 0; b <= 6; b++) {
    var b1 = b;
    var a1 = calcExp2(p, b1);
    var peo1 = tripleToPeo(p, a1, b1);
    var absCents1 = Math.abs(calcCents(peo1.getAsDecimal()));

    var b2 = -b;
    var a2 = calcExp2(p, b2);
    var peo2 = tripleToPeo(p, a2, b2);
    var absCents2 = Math.abs(calcCents(peo2.getAsDecimal()));

    if (absCents1 < absCents2) {
      if (absCents1 <= cutoff) {
        return peo1;
      }
    } else if (absCents2 <= cutoff) {
      return peo2;
    }
  }

  // -6 to +6 should take care of ANY fraction.
  // Should never reach here, and never need a default!
};

module.exports = getCommaSAG;
