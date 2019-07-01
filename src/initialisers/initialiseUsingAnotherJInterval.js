var setAllSetupOptions = require('../properties/set/setAllSetupOptions');

var setupPosFromNotation = require('../properties/pos/setupPosFromNotation');

var initialiseUsingAnotherJInterval = function initialiseUsingAnotherJInterval(jint, otherJint) {
  // Construct the correct setup object
  var otherJintSetupObject = otherJint.getSetupObject();
  var jintSetupObject = jint.getSetupObject();
  var useSetupObject = {};
  // Properties from otherJintSetupObject get overridden by properties from jintSetupObject
  Object.assign(useSetupObject, otherJintSetupObject, jintSetupObject);
  setAllSetupOptions(jint, useSetupObject);

  // Interval ratios are described internally by Peos.
  // Give this JInterval a peo descriptor that is copy of other JInterval's peo.
  jint.peo = otherJint.ratioPeo().copy();

  // If absolute position is specified on otherJint, copy it to this jint
  if (otherJint.hasPos()) {
    var startNote = otherJint.getStartInputPitchNotation();
    var endNote = otherJint.getEndInputPitchNotation();
    setupPosFromNotation(jint, startNote, endNote);
  }
};

module.exports = initialiseUsingAnotherJInterval;
