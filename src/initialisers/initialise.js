var Peo = require('peo');
var isString = require('is-string');

var initialiseFromObject = require('./initialiseFromObject');
var initialiseFromAnotherJInterval = require('./initialiseFromAnotherJInterval');
var initialiseFromDecimal = require('./initialiseFromDecimal');
var initialiseFromFraction = require('./initialiseFromFraction');
var initialiseFromNotations = require('./initialiseFromNotations');
var initialiseFromPeo = require('./initialiseFromPeo');

var parseAlg = require('../commas/parseAlg');


var canInitialiseFromObject = function canInitialiseFromObject(obj) {
  if (obj.startPitchNotation || obj.endPitchNotation || obj.startFreqHz || obj.endFreqHz || obj.jint || obj.peo || obj.width || obj.num || obj.denom) {
    return true;
  }
  return false;
};

var initialise = function initialise(jint, argumentArray) {
  // Standard way of initialising a JInterval is via an object in various ways,
  // see initialiseFromObject method.

  // Most of the cases below are shortcut methods, to initialise directly on a number, fraction, etc.
  // optionally specifying the algorithm too

  var arg0 = argumentArray[0];
  var arg1 = argumentArray[1];
  var arg2 = argumentArray[2];
  var algor1 = parseAlg(arg1);
  var algor2 = parseAlg(arg2);

  if (arg0 instanceof jint.constructor) {
    // Case: new JInterval(jint, [alg])
    initialiseFromAnotherJInterval(jint, arg0, algor1);
  } else if (arg0 instanceof Peo) {
    // Case: new JInterval(peo, [alg])
    initialiseFromPeo(jint, arg0, algor1);
  } else if (Number.isInteger(arg0) && arg0 > 0) {
    // Integer cases
    if (Number.isInteger(arg1) && arg1 > 0) {
      // Case: new JInterval(num, denom, [alg])
      initialiseFromFraction(jint, arg0, arg1, algor2);
    } else {
      // Case: new JInterval(integer, [alg])
      initialiseFromFraction(jint, arg0, 1, algor1);
    }
  } else if (Number.isFinite(arg0) && arg0 > 0) {
    // Case: new JInterval(decimal, [alg])
    initialiseFromDecimal(jint, arg0, algor1);
  } else if (isString(arg0)) {
    // Text cases
    var numChar = Number.parseFloat(arg0[0]);
    if (Number.isNaN(numChar)) {
      // First character of string is not a number. Treat as a notation.
      // Case: new JInterval(startNotation, endNotation, [alg])
      // (Force arg0 and arg1 to strings)
      initialiseFromNotations(jint, '' + arg0, '' + arg1, algor2);
    } else {
      // First character of string is a number.
      // Use Peo to parse it fully.
      // Case: new JInterval("decimal", [alg])
      initialiseFromPeo(jint, new Peo(arg0), algor1);
    }
  } else if (typeof arg0 === 'object' && arg0 !== null) {
    // Object cases
    if (canInitialiseFromObject(arg0)) {
      // Case: new JInterval(options)
      initialiseFromObject(jint, arg0);
    } else {
      // Case: new JInterval({p1:e1, ...pi:ei})
      initialiseFromPeo(jint, new Peo(arg0), algor1);
    }
  } else {
    // If all else fails, initialise on fraction of unison interval
    initialiseFromFraction(jint, 1, 1);
  }
};

module.exports = initialise;
