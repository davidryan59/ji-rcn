var setupPosFromFrequency = require('../../properties/pos/setupPosFromFrequency');

var getEndFreqHz = function getEndFreqHz(inputtedStartFreqHz) {
  setupPosFromFrequency(this, inputtedStartFreqHz);
  return this.pos.e.fhz;
};

module.exports = getEndFreqHz;
