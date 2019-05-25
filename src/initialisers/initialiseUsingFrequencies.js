var Peo = require('peo');

var setupPosFromFrequency = require('../pos/setupPosFromFrequency');

var initialiseUsingFrequencies = function initialiseUsingFrequencies(jint, startFreqHz, endFreqHz) {
  jint.peo = new Peo(endFreqHz / startFreqHz);
  setupPosFromFrequency(jint, startFreqHz);
};

module.exports = initialiseUsingFrequencies;
