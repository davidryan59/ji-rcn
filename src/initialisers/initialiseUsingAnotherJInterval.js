var setAlg = require('../commas/setAlg');
var setTuning = require('../tuning/setTuning');
var setupPosFromNotation = require('../pos/setupPosFromNotation');

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

  // If absolute position is specified on otherJint, copy it to this jint
  if (otherJint.hasPos()) {
    var startNote = otherJint.getStartPitchInputNotation();
    var endNote = otherJint.getEndPitchInputNotation();
    setupPosFromNotation(jint, startNote, endNote);
  }
};

module.exports = initialiseUsingAnotherJInterval;
