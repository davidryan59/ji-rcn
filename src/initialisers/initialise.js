var Peo = require('peo');
var isString = require('is-string');

var initialiseFromPeo = require('./initialiseFromPeo');
var initialiseFromNotation = require('./initialiseFromNotation');

var initialise = function initialise(jint, argumentArray) {
  // argumentArray should contain first a number, fraction, Peo or JInterval
  // representing the frequency shift of the interval.
  // Args can then contain an optional algorithm string: "DR" (default), "SAG", "KG2"

  // Get the first few arguments given to JInterval constructor
  var arg0 = argumentArray[0];
  var arg1 = argumentArray[1];
  var arg2 = argumentArray[2];

  // Declare variables
  var peo = null;
  var alg = null;

  // Case: new JInterval(jint)
  if (arg0 instanceof jint.constructor) {
    initialiseFromPeo(jint, arg0.peo, arg1 || arg0.getAlg());
    return;
  }

  // Case: new JInterval(peo)
  if (arg0 instanceof Peo) {
    initialiseFromPeo(jint, arg0, arg1);
    return;
  }

  // Check for numeric case - Integer
  if (Number.isInteger(arg0)) {
    if (Number.isInteger(arg1)) {
      peo = new Peo(arg0, arg1);
      alg = arg2;
    } else {
      peo = new Peo(arg0);
      alg = arg1;
    }
    initialiseFromPeo(jint, peo, alg);
    return;
  }

  // Check for numeric case - Decimal
  // Pass through to Peo to parse
  if (Number.isFinite(arg0)) {
    initialiseFromPeo(jint, new Peo(arg0), arg1);
    return;
  }

  // Check for text case
  if (isString(arg0)) {
    var numChar = Number.parseFloat(arg0[0]);
    if (Number.isNaN(numChar)) {
      // Its a string string
      // This one's different, its notation -> jint
      // Going to try and parse a notation here...
      initialiseFromNotation(jint, arg0);
      return;
    }
    // Its a number presented as a string
    // Pass through to Peo to parse it
    initialiseFromPeo(jint, new Peo(arg0), arg1);
    return;
  }

  // Need to do this check last, since its 'object', the most general!
  if (typeof arg0 === 'object' && arg0 !== null) {
    // Assuming {p1:e1, ...pi:ei} format for object
    peo = new Peo(arg0);
    initialiseFromPeo(jint, peo, arg1);
    return;
  }

  // If all else fails, return 1/1 as default JInterval
  initialiseFromPeo(jint, new Peo(1));
};

module.exports = initialise;
