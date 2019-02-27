var Peo = require('peo');
var isString = require('is-string');

var initialiseUsingAnotherJInterval = require('./initialiseUsingAnotherJInterval');
var initialiseUsingDecimal = require('./initialiseUsingDecimal');
var initialiseUsingFraction = require('./initialiseUsingFraction');
var initialiseUsingFrequencies = require('./initialiseUsingFrequencies');
var initialiseUsingNotations = require('./initialiseUsingNotations');
var initialiseUsingPeo = require('./initialiseUsingPeo');

var setAllSetupOptions = require('../setup/setAllSetupOptions');


var initialiseFromObject = function initialiseFromObject(jint, theObject) {
  // Initialise in various ways depending on which options are specified via theObject

  // Must have at least one of these
  var startPitchNotation = theObject.startPitchNotation;  // Interval frequency ratio from parsed notations
  var endPitchNotation = theObject.endPitchNotation;
  var startFreqHz = theObject.startFreqHz;                // Interval frequency ratio from two frequencies
  var endFreqHz = theObject.endFreqHz;
  var otherJint = theObject.jint; // This JInterval will be constructed based on another JInterval
  var peo = theObject.peo;        // Interval frequency ratio defined by a Peo
  var num = theObject.num;        // Interval frequency ratio define by a rational number, num/denom
  var denom = theObject.denom;
  var freqRatio = theObject.ratio;    // Interval frequency ratio supplied as any number (integer, decimal)

  // Setup JInterval here.
  // Do things that need to be done before other things are set, such as frequency ratio.
  setAllSetupOptions(jint, theObject);

  if (isString(startPitchNotation) && isString(endPitchNotation)) {
    // Case: interval ratio is from pitch difference of two notations
    initialiseUsingNotations(jint, startPitchNotation, endPitchNotation);
  } else if (Number.isFinite(startFreqHz) && Number.isFinite(endFreqHz) && startFreqHz > 0 && endFreqHz > 0) {
    // Case: interval ratio is from ratio of two frequencies in Hz
    initialiseUsingFrequencies(jint, startFreqHz, endFreqHz);
  } else if (otherJint instanceof jint.constructor) {
    // Case: interval ratio copied from another JInterval
    initialiseUsingAnotherJInterval(jint, otherJint);
  } else if (peo && peo.constructor.name === Peo.name) {
    // Case: interval ratio = size of Peo
    //
    // Note: 'peo instanceof Peo' should have worked here, but for unknown reasons did not...
    // Checking by a string (class name) text isn't ideal, since another class could have same name...
    initialiseUsingPeo(jint, peo);
  } else if (Number.isInteger(num) && num > 0) {
    if (Number.isInteger(denom) && denom > 0) {
      // Case: interval ratio is a rational number, num/denom
      initialiseUsingFraction(jint, num, denom);
    } else {
      // Case: interval ratio = num, in harmonic series
      initialiseUsingFraction(jint, num, 1);
    }
  } else if (Number.isInteger(denom) && denom > 0) {
    // Case: interval ratio is 1/denom, subharmonic series
    initialiseUsingFraction(jint, 1, denom);
  } else if (Number.isFinite(freqRatio) && freqRatio > 0) {
    // Case: interval ratio directly inputted as any positive number (decimal or integer)
    initialiseUsingDecimal(jint, freqRatio);
  } else {
    // Case: parsing options failed, so return default case, a interval of unison
    initialiseUsingFraction(jint, 1, 1);
  }
};

module.exports = initialiseFromObject;
