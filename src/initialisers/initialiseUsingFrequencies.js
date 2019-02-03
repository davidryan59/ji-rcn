var Peo = require('peo');

var setFrequency = require('../freq/setFrequency');
var calcNotationObject = require('../notation/calcNotationObject');
var setNotation = require('../notation/setNotation');

var initialiseUsingFrequencies = function initialiseUsingFrequencies(jint, startFreqHz, endFreqHz) {
  var thePeo = new Peo(endFreqHz / startFreqHz);
  jint.peo = thePeo;
  setFrequency(jint, startFreqHz);
  var theStartPeo = new Peo(startFreqHz / jint.getTuningMultHz());
  var theStartNotation = calcNotationObject(theStartPeo, jint.getAlgFn()).pitch;
  setNotation(jint, theStartNotation);
};

module.exports = initialiseUsingFrequencies;
