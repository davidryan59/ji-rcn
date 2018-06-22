var Fraction = require('fraction.js')
var Peo = require('peo')

var privateGetPeo = require('../private/privateGetPeo')
var initialiseFromPeo = require('./initialiseFromPeo')
var initialiseFromNotation = require('./initialiseFromNotation')

var initialise = function(jn, args) {
  // Args should first contain a number, fraction, Peo or Jinote (the frequency)
  // Args can then contain an optional algorithm string: "DR" (default), "SAG", "KG2"

  // Get the first few arguments given to Jinote constructor
  var arg0 = args[0]
  var arg1 = args[1]
  var arg2 = args[2]

  // Check for Jinote case
  // Have to use jn.constructor, rather than Jinote
  if (arg0 instanceof jn.constructor) {
    // arg0 is a Jinote.
    // Initialise from its actual Peo, not a copy
    initialiseFromPeo(jn, privateGetPeo(arg0), arg1 || arg0.getAlg())
    return
  }

  // Check for Peo case
  if (arg0 instanceof Peo) {
    initialiseFromPeo(jn, arg0, arg1)
    return
  }

  // Check for Fraction case
  if (arg0 instanceof Fraction) {
    initialiseFromPeo(jn, new Peo(arg0), arg1)
    return
  }

  // Check for numeric case - Integer
  if (Number.isInteger(arg0)) {
    var peo = null
    var alg = null
    if (Number.isInteger(arg1)) {
      peo = new Peo(arg0, arg1)
      alg = arg2
    } else {
      peo = new Peo(arg0)
      alg = arg1
    }
    initialiseFromPeo(jn, peo, alg)
    return
  }

  // Check for numeric case - Decimal - use Fraction to convert
  if (Number.isFinite(arg0)) {
    initialiseFromPeo(jn, new Peo(new Fraction(arg0)), arg1)
    return
  }

  // Check for text case
  if (typeof arg0 === 'string' || arg0 instanceof String) {
    // Its a string or String. Check if first character is numeric?
    var numChar = Number.parseFloat(arg0[0])
    if (Number.isNaN(numChar)) {
      // Its a string string
      // This one's different, its notation -> jn
      // Going to try and parse a notation here...
      initialiseFromNotation(jn, arg0)
      return
    } else {
      // Its a number presented as a string
      initialiseFromPeo(jn, new Peo(new Fraction(arg0)), arg1)
      return
    }
  }

  // Need to do this check last, since its 'object', the most general!
  if (typeof(arg0)==='object') {
    // Assuming {p1:e1, ...pi:ei} format for object
    var peo = new Peo(arg0)
    initialiseFromPeo(jn, peo, arg1)
    return
  }

  // If all else fails, return 1/1 as default Jinote
  initialiseFromPeo(jn, new Peo(1))

}

module.exports = initialise
