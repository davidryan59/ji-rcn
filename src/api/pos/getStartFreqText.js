var setupPosFromFrequency = require('../../properties/pos/setupPosFromFrequency');

var getStartFreqText = function getStartFreqText() {
  setupPosFromFrequency(this);
  return this.pos.s.ftx;
};

module.exports = getStartFreqText;
