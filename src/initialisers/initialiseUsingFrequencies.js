var Peo = require('peo');

var setAlg = require('./setAlg');
var recalcStartAndEndFrequencies = require('../freq/recalcStartAndEndFrequencies');

var initialiseUsingFrequencies = function initialiseUsingFrequencies(jint, startFreqHz, endFreqHz, alg) {
  setAlg(jint, alg);
  jint.peo = new Peo(endFreqHz / startFreqHz);
  recalcStartAndEndFrequencies(jint, startFreqHz);
};

module.exports = initialiseUsingFrequencies;
