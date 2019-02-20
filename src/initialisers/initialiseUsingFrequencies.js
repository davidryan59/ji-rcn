var Peo = require('peo');

var setupPosFromFrequency = require('../pos/setupPosFromFrequency');

var initialiseUsingFrequencies = function initialiseUsingFrequencies(jint, startFreqHz, endFreqHz) {
  var thePeo = new Peo(endFreqHz / startFreqHz);
  jint.peo = thePeo;
  setupPosFromFrequency(jint, startFreqHz);
};

module.exports = initialiseUsingFrequencies;
