var setupPosFromFrequency = require('../../pos/setupPosFromFrequency');

var setStartFreqHz = function setStartFreqHz(inputtedStartFreqHz) {
  setupPosFromFrequency(this, inputtedStartFreqHz);
};

module.exports = setStartFreqHz;
