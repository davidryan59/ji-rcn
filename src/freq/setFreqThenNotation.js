var Peo = require('peo');
var setFrequency = require('./setFrequency');
var calcNotationObject = require('../notation/calcNotationObject');
var setNotation = require('../notation/setNotation');

var setFreqThenNotation = function setFreqThenNotation(jint, inputStartFreqHz) {
  var startFreqChecked = setFrequency(jint, inputStartFreqHz);
  // This is only returned if start freq has changed
  if (startFreqChecked) {
    var theStartPeo = new Peo(startFreqChecked / jint.getTuningMultHz());
    var theStartNotation = calcNotationObject(theStartPeo, jint.getAlgFn()).pitch;
    setNotation(jint, theStartNotation);
  }
};

module.exports = setFreqThenNotation;
