var Peo = require('peo');
var isString = require('is-string');

var initialiseUsingAnotherJInterval = require('./initialiseUsingAnotherJInterval');
var initialiseUsingDecimal = require('./initialiseUsingDecimal');
var initialiseUsingFraction = require('./initialiseUsingFraction');
var initialiseUsingFrequencies = require('./initialiseUsingFrequencies');
var initialiseUsingNotations = require('./initialiseUsingNotations');
var initialiseUsingPeo = require('./initialiseUsingPeo');

var setOtherOptions = require('./setOtherOptions');


var initialiseFromObject = function initialiseFromObject(jint, theObject) {
  // Initialise in various ways depending on which options are specified via theObject

  // Must have at least one of these
  var startPitchNotation = theObject.startPitchNotation;  // Interval width defined as ratio between notations after parsing
  var endPitchNotation = theObject.endPitchNotation;
  var startFreqHz = theObject.startFreqHz;                // Interval width defined as ratio betweeo frequencies in Hz
  var endFreqHz = theObject.endFreqHz;
  var jint2 = theObject.jint;     // Interval width will be copied from another JInterval
  var peo = theObject.peo;        // Interval width defined by a Peo
  var num = theObject.num;        // Interval width define by a rational number, num/denom
  var denom = theObject.denom;
  var width = theObject.width;    // Interval width, a rational (integer or decimal) number

  // Optional
  // var tuning = parseTuning(theObject.tuning);  // Example: theObject.tuning = {notation: "A4", freqHz: 440 }
  var alg = theObject.alg;        // Algorithm text acronym or function: Number -> Peo

  if (isString(startPitchNotation) && isString(endPitchNotation)) {
    // Case: interval width is from pitch difference of two notations
    initialiseUsingNotations(jint, startPitchNotation, endPitchNotation, alg);
  } else if (Number.isFinite(startFreqHz) && Number.isFinite(endFreqHz) && startFreqHz > 0 && endFreqHz > 0) {
    // Case: interval width is from ratio of two frequencies in Hz
    initialiseUsingFrequencies(jint, startFreqHz, endFreqHz, alg);
  } else if (jint2 instanceof jint.constructor) {
    // Case: interval width copied from another JInterval
    initialiseUsingAnotherJInterval(jint, jint2, alg);
  } else if (peo && peo.constructor.name === Peo.name) {
    // Case: interval width = size of Peo
    //
    // Note: 'peo instanceof Peo' should have worked here, but for unknown reasons did not...
    // Checking by a string (class name) text isn't ideal, since another class could have same name...
    initialiseUsingPeo(jint, peo, alg);
  } else if (Number.isInteger(num) && num > 0) {
    if (Number.isInteger(denom) && denom > 0) {
      // Case: interval width is a rational number, num/denom
      initialiseUsingFraction(jint, num, denom, alg);
    } else {
      // Case: interval width = num, in harmonic series
      initialiseUsingFraction(jint, num, 1, alg);
    }
  } else if (Number.isInteger(denom) && denom > 0) {
    // Case: interval width is 1/denom, subharmonic series
    initialiseUsingFraction(jint, 1, denom, alg);
  } else if (Number.isFinite(width) && width > 0) {
    // Case: interval width directly inputted as any positive number (decimal or integer)
    initialiseUsingDecimal(jint, width, alg);
  } else {
    // Case: parsing options failed, so return default case, a interval of unison
    initialiseUsingFraction(jint, 1, 1, alg);
  }
  setOtherOptions(jint, theObject);
};

module.exports = initialiseFromObject;
