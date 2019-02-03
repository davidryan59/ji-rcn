var setAlg = require('../commas/setAlg');
var setTuning = require('../tuning/setTuning');
var setFrequency = require('../freq/setFrequency');
var setNotation = require('../notation/setNotation');

var initialiseUsingAnotherJInterval = function initialiseUsingAnotherJInterval(jint, otherJint) {
  // Ought to have already set tuning of jint to thisTuning

  // Set algorithm from otherJint, if its blank
  if (!jint.hasAlg() && otherJint.hasAlg()) {
    setAlg(jint, otherJint.getAlgSetupObject());
    setTuning(jint, jint.getTuningSetupObject());    // Ought to reset after alg changes!
  }

  // Set tuning from otherJint, if its blank
  if (!jint.hasTuning() && otherJint.hasTuning()) {
    setTuning(jint, otherJint.getTuningSetupObject());
  }

  // Set the interval width from otherJint
  var thePeo = otherJint.getPeo();  // Creates a copy
  jint.peo = thePeo;

  // If either of notation or frequency are specified on otherJint,
  // specify them here too.
  if (otherJint.hasNotation() || otherJint.hasFreq()) {
    // Bring notation over unchanged
    var startNotation = otherJint.getStartPitchNotation();
    setNotation(jint, startNotation);
    // Scale frequencies according to any tuning shift
    var mult1 = jint.getTuningMultHz();
    var mult2 = otherJint.getTuningMultHz();
    var startFreqHz = otherJint.getStartFreqHz() * (mult1 / mult2);
    setFrequency(jint, startFreqHz);
  }
};

module.exports = initialiseUsingAnotherJInterval;
