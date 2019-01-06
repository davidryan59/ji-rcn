var Fraction = require('fraction.js')
var Peo = require('peo')

var initialiseFromPeo = require('./initialiseFromPeo')
var initialiseFromNotation = require('./initialiseFromNotation')

var initialise = function(jint, argumentArray) {
  // argumentArray should contain first a number, fraction, Peo or JInterval
  // representing the frequency shift of the interval.
  // Args can then contain an optional algorithm string: "DR" (default), "SAG", "KG2"

  // Get the first few arguments given to JInterval constructor
  var arg0 = argumentArray[0]
  var arg1 = argumentArray[1]
  var arg2 = argumentArray[2]

  // Check for JInterval case
  // Have to use jint.constructor, rather than JInterval
  if (arg0 instanceof jint.constructor) {
    // arg0 is a JInterval.
    // Initialise from its actual Peo, not a copy
    initialiseFromPeo(jint, arg0.peo, arg1 || arg0.getAlg())
    return
  }

  // Check for Peo case
  if (arg0 instanceof Peo) {
    initialiseFromPeo(jint, arg0, arg1)
    return
  }

  // Check for Fraction case
  if (arg0 instanceof Fraction) {
    initialiseFromPeo(jint, new Peo(arg0), arg1)
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
    initialiseFromPeo(jint, peo, alg)
    return
  }

  // Check for numeric case - Decimal - use Fraction to convert
  if (Number.isFinite(arg0)) {
    initialiseFromPeo(jint, new Peo(new Fraction(arg0)), arg1)
    return
  }

  // Check for text case
  if (typeof arg0 === 'string' || arg0 instanceof String) {
    // Its a string or String. Check if first character is numeric?
    var numChar = Number.parseFloat(arg0[0])
    if (Number.isNaN(numChar)) {
      // Its a string string
      // This one's different, its notation -> jint
      // Going to try and parse a notation here...
      initialiseFromNotation(jint, arg0)
      return
    } else {
      // Its a number presented as a string
      initialiseFromPeo(jint, new Peo(new Fraction(arg0)), arg1)
      return
    }
  }

  // Need to do this check last, since its 'object', the most general!
  if (typeof(arg0)==='object') {
    // Assuming {p1:e1, ...pi:ei} format for object
    var peo = new Peo(arg0)
    initialiseFromPeo(jint, peo, arg1)
    return
  }

  // If all else fails, return 1/1 as default JInterval
  initialiseFromPeo(jint, new Peo(1))

}

module.exports = initialise
