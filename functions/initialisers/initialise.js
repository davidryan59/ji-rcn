var Fraction = require('fraction.js')
var Peo = require('peo')

var privateGetPeo = require('../private/privateGetPeo')
var initialiseFromPeo = require('./initialiseFromPeo')

var initialise = function(jn, args) {

  // Get the first few arguments given to Jinote constructor
  var arg0 = args[0]
  var arg1 = args[1]
  var arg2 = args[2]

  // Check for Jinote case
  // Have to use jn.constructor, rather than Jinote
  if (arg0 instanceof jn.constructor) {
    // arg0 is a Jinote.
    // Initialise from its actual Peo, not a copy
    initialiseFromPeo(jn, privateGetPeo(arg0))
    return
  }

  // Check for Peo case
  if (arg0 instanceof Peo) {
    initialiseFromPeo(jn, arg0)
    return
  }

  // Check for Fraction case
  if (arg0 instanceof Fraction) {
    initialiseFromPeo(jn, new Peo(arg0))
    return
  }

  // Check for numeric case
  if (Number.isInteger(arg0)) {
    var peo = (Number.isInteger(arg1)) ? new Peo(arg0, arg1) : new Peo(arg0)
    initialiseFromPeo(jn, peo)
    return
  }

  // // Check for text case
  // // This one's different, its notation -> jn
  // if (typeof arg0 === 'string' || arg0 instanceof String) {
  //   initialiseFromNotation(jn, arg0)
  //   return
  // }

  // Need to do this check last, since its 'object', the most general!
  if (typeof(arg0)==='object') {
    // Assuming {p1:e1, ...pi:ei} format for object
    var peo = new Peo(arg0)
    initialiseFromPeo(jn, peo)
    return
  }

  initialiseFromPeo(jn, new Peo(1))

}

module.exports = initialise
