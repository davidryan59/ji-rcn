var Peo = require('peo');

var setAlg = require('../commas/setAlg');
var setFrequency = require('../freq/setFrequency');

var initialiseUsingFrequencies = function initialiseUsingFrequencies(jint, startFreqHz, endFreqHz, alg) {
  setAlg(jint, alg);
  jint.peo = new Peo(endFreqHz / startFreqHz);
  setFrequency(jint, startFreqHz);
};

module.exports = initialiseUsingFrequencies;
