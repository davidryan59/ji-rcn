var setupPosFromFrequency = require('../../pos/setupPosFromFrequency');

var getStartFreqText = function getStartFreqText() {
  setupPosFromFrequency(this);
  return this.pos.start.freqTxt;
};

module.exports = getStartFreqText;
