var getHigherPrimesArray = function(peo) {

  // These two will be modified and outputted
  var result = ""
  var spacer = ""

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
    var thatLabel = "" + prime + ((absExp>1) ? "^" + absExp : "")
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

  if (numText || denomText) {
    if (denomText) {
      if (numText) {
        result = numText + spacer + "/" + spacer + denomText
      } else {
        result = "1" + spacer + "/" + spacer + denomText
      }
    } else {
      result = numText
    }
    result = "[" + result + "]"
  }

  return [result, spacer]

}

module.exports = getHigherPrimesArray
