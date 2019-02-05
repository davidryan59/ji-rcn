var Peo = require('peo');

var setAlg = require('../commas/setAlg');
var setTuning = require('../tuning/setTuning');
var setFrequency = require('../freq/setFrequency');
var calcNotationObject = require('../notation/calcNotationObject');
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
    // Bring frequencies across, scaled by any tuning shift
    var otherMult = otherJint.getTuningMultHz();
    var startWidth = otherJint.getStartFreqHz() / otherMult;
    var thisMult = jint.getTuningMultHz();
    var startFreqHz = startWidth * thisMult;
    setFrequency(jint, startFreqHz);
    // Recalculate notations
    var startNotationPeo = new Peo(startWidth);
    var startNotationObject = calcNotationObject(startNotationPeo, jint.getAlgFn());
    var startPitchNotation = startNotationObject.pitch;
    setNotation(jint, startPitchNotation);
  }
};

module.exports = initialiseUsingAnotherJInterval;
