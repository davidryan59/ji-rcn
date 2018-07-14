var ibn = require('is-bounded-number')
var Peo = require('peo')

var fPeo = new Peo(4, 3)
var cPeo = new Peo()
var gPeo = new Peo(3, 2)
var dPeo = new Peo(9, 8)
var aPeo = new Peo(27, 16)
var ePeo = new Peo(81, 64)
var bPeo = new Peo(243, 128)

var getDiatonicArray = function(exp3) {

  // Turns an exponent of 3 between -1 and 6
  // into a standard scale note name

  // Deal with error cases
  if (!ibn(exp3, 1e15)) {
    // Error output
    return ["Na", cPeo]
  }
  // Have a number
  exp3 = Math.round(exp3)
  if (exp3 < -1) {
    return ["Lo", cPeo]
  }
  if (exp3 > 5) {
    return ["Hi", cPeo]
  }

  // Give some output
  var result = null
  switch (exp3) {
    case -1: return ["F", fPeo]
    case 0: return ["C", cPeo]
    case 1: return ["G", gPeo]
    case 2: return ["D", dPeo]
    case 3: return ["A", aPeo]
    case 4: return ["E", ePeo]
    case 5: return ["B", bPeo]
  }
}

module.exports = getDiatonicArray
