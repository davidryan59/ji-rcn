var Peo = require('peo');
var isString = require('is-string');

var canInitialiseFromObject = require('./canInitialiseFromObject');
var initialiseUsingAnotherJInterval = require('./initialiseUsingAnotherJInterval');
var initialiseUsingDecimal = require('./initialiseUsingDecimal');
var initialiseUsingFraction = require('./initialiseUsingFraction');
var initialiseUsingNotations = require('./initialiseUsingNotations');
var initialiseUsingPeo = require('./initialiseUsingPeo');


var setRatioPrivate = function setRatioPrivate(jint, argumentArray) {
  // General way of initialising a JInterval is via an object in various ways, see initialiseFromObject method.
  // Specific cases also exist to initialise JInterval ratio on a number, fraction, peo, etc.
  // optionally specifying the algorithm too

  // Returns invalidBool.
  // true: if position info might be out of date
  // false: if position info is updated in this method
  var invalidBool = true;

  // Compare the cases below with initialise

  var arg0 = argumentArray[0];
  var arg1 = argumentArray[1];

  if (arg0 instanceof jint.constructor) {
    // Case: jint.setRatio(jint2)
    initialiseUsingAnotherJInterval(jint, arg0);
  } else if (arg0 instanceof Peo) {
    // Case: jint.setRatio(peo)
    initialiseUsingPeo(jint, arg0);
  } else if (Number.isInteger(arg0) && arg0 > 0) {
    // Integer cases
    if (Number.isInteger(arg1) && arg1 > 0) {
      // Case: jint.setRatio(integer)
      initialiseUsingFraction(jint, arg0, arg1);
    } else {
      // Case: jint.setRatio(num, denom)
      initialiseUsingFraction(jint, arg0, 1);
    }
  } else if (Number.isFinite(arg0) && arg0 > 0) {
    // Case: jint.setRatio(positive decimal)
    initialiseUsingDecimal(jint, arg0);
  } else if (isString(arg0)) {
    // Text cases
    var numChar = Number.parseFloat(arg0[0]);
    if (Number.isNaN(numChar)) {
      // First character of string is not a number. Treat as a notation.
      // Case: jint.setRatio(startNotation, endNotation)
      // (Force arg0 and arg1 to strings)
      initialiseUsingNotations(jint, arg0, arg1);
      invalidBool = false;
    } else {
      // First character of string is a number.
      // Use Peo to parse it fully.
      // Case: jint.setRatio("decimal") or jint.setRatio("num/denom")
      initialiseUsingPeo(jint, new Peo(arg0));
    }
  } else if (typeof arg0 === 'object' && arg0 !== null) {
    // Object cases
    if (canInitialiseFromObject(arg0)) {
      // Case: jint.setRatio(options)
      // This case has been disallowed, it updates many things,
      // but only want to update ratio in this method.
      invalidBool = false;
    } else {
      // Case: jint.setRatio({p1:e1, ...pi:ei})
      initialiseUsingPeo(jint, new Peo(arg0));
    }
  } else {
    // For setRatio, do nothing by default
    invalidBool = false;
  }
  return invalidBool;
};

module.exports = setRatioPrivate;
