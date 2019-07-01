var setupPosFromFrequency = require('../../properties/pos/setupPosFromFrequency');

var setStartFreqHz = function setStartFreqHz(inputtedStartFreqHz) {
  setupPosFromFrequency(this, inputtedStartFreqHz);
};

module.exports = setStartFreqHz;
