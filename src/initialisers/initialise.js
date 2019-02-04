var Peo = require('peo');
var isString = require('is-string');

var initialiseFromObject = require('./initialiseFromObject');
var initialiseUsingAnotherJInterval = require('./initialiseUsingAnotherJInterval');
var initialiseUsingDecimal = require('./initialiseUsingDecimal');
var initialiseUsingFraction = require('./initialiseUsingFraction');
var initialiseUsingNotations = require('./initialiseUsingNotations');
var initialiseUsingPeo = require('./initialiseUsingPeo');

var setAlg = require('../commas/setAlg');

var canInitialiseFromObject = function canInitialiseFromObject(obj) {
  if (obj.startPitchNotation || obj.endPitchNotation || obj.startFreqHz || obj.endFreqHz || obj.jint || obj.peo || obj.width || obj.num || obj.denom) return true;
  return false;
};


var initialise = function initialise(jint, argumentArray) {
  // Standard way of initialising a JInterval is via an object in various ways,
  // see initialiseFromObject method.

  // Most of the cases below are shortcut methods, to initialise directly on a number, fraction, etc.
  // optionally specifying the algorithm too

  var arg0 = argumentArray[0];
  var arg1 = argumentArray[1];

  var alg1 = argumentArray[1];
  var alg2 = argumentArray[2];
  setAlg(jint, alg1);          // A couple of cases its alg2 not alg1. If so, overwrite later.
  // Won't set a tuning here. Only deal with tuning for i) inside object, ii) inside other JInterval.

  if (arg0 instanceof jint.constructor) {
    // Case: new JInterval(jint)
    initialiseUsingAnotherJInterval(jint, arg0);
  } else if (arg0 instanceof Peo) {
    // Case: new JInterval(peo)
    initialiseUsingPeo(jint, arg0);
  } else if (Number.isInteger(arg0) && arg0 > 0) {
    // Integer cases
    if (Number.isInteger(arg1) && arg1 > 0) {
      // Case: new JInterval(num, denom)
      setAlg(jint, alg2);
      initialiseUsingFraction(jint, arg0, arg1);
    } else {
      // Case: new JInterval(integer)
      initialiseUsingFraction(jint, arg0, 1);
    }
  } else if (Number.isFinite(arg0) && arg0 > 0) {
    // Case: new JInterval(decimal)
    initialiseUsingDecimal(jint, arg0);
  } else if (isString(arg0)) {
    // Text cases
    var numChar = Number.parseFloat(arg0[0]);
    if (Number.isNaN(numChar)) {
      // First character of string is not a number. Treat as a notation.
      // Case: new JInterval(startNotation, endNotation)
      // (Force arg0 and arg1 to strings)
      setAlg(jint, alg2);
      initialiseUsingNotations(jint, arg0, arg1);
    } else {
      // First character of string is a number.
      // Use Peo to parse it fully.
      // Case: new JInterval("decimal")
      initialiseUsingPeo(jint, new Peo(arg0));
    }
  } else if (typeof arg0 === 'object' && arg0 !== null) {
    // Object cases
    if (canInitialiseFromObject(arg0)) {
      // Case: new JInterval(options)
      initialiseFromObject(jint, arg0);
    } else {
      // Case: new JInterval({p1:e1, ...pi:ei})
      initialiseUsingPeo(jint, new Peo(arg0));
    }
  } else {
    // If all else fails, initialise on fraction of unison interval
    initialiseUsingFraction(jint, 1, 1);
  }
};

module.exports = initialise;
