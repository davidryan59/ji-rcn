var setupPosFromFrequency = require('../../pos/setupPosFromFrequency');

var getEndFreqText = function getEndFreqText(inputtedStartFreqHz) {
  setupPosFromFrequency(this, inputtedStartFreqHz);
  return this.pos.e.ftx;
};

module.exports = getEndFreqText;
