var constants = require('../constants/general')

var bl = constants.BRACKET_HIGHER_COMMA_LEFT
var bmid = constants.SYMBOL_HIGHER_COMMA_MID
var bpow = constants.SYMBOL_HIGHER_COMMA_POW
var br = constants.BRACKET_HIGHER_COMMA_RIGHT

var unsplitDigits = constants.MAX_DIGITS_UNSPLIT_HIGHER_PRIMES


var getHigherPrimesArray = function(peo) {

  // These two will be modified and outputted
  var result = ""
  var spacer = ""

  // If both numerator and denominator are of length max unsplitDigits
  // use the text representation of the fraction instead of
  // splitting into prime factors
  if (peo.getLogNum(10) < unsplitDigits && peo.getLogDenom(10) < unsplitDigits) {
    if (peo.getLog(10)===0) {
      return ["", spacer]
    } else {
      return ["" + bl + peo.getText() + br, spacer]
    }
  }

  var numText = ""
  var denomText = ""
  var obj = peo.getPrimeExps()
  var keys = Object.keys(obj)
  for (var i=0; i<keys.length; i++) {
    var key = keys[i]
    var val = obj[key]
    var prime = Number.parseInt(key)
    var exp = Number.parseInt(val)
    var absExp = Math.abs(exp)
    var thisLabel = "" + Math.pow(prime, absExp)
    var thatLabel = "" + prime + ((absExp>1) ? bpow + absExp : "")
    thisLabel = (thisLabel.length<4) ? thisLabel : thatLabel
    if (exp>0) {
      if (numText) {
        spacer = " "
        numText = numText + spacer + thisLabel
      } else {
        numText = thisLabel
      }
    } else {
      // exp<=0
      // In fact, since Peo has no zero exponents, exp<0
      if (denomText) {
        spacer = " "
        denomText = denomText + spacer + thisLabel
      } else {
        denomText = thisLabel
      }
    }
  }

  // Must have at least one of numText, denomText populated
  // since cases of less than 4 digits already taken care of
  if (denomText) {
    if (numText) {
      result = numText + spacer + bmid + spacer + denomText
    } else {
      result = "1" + spacer + bmid + spacer + denomText
    }
  } else {
    result = numText
  }
  result = "" + bl + result + br

  return [result, spacer]

}

module.exports = getHigherPrimesArray