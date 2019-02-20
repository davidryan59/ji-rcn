var setupPosFromFrequency = require('../../pos/setupPosFromFrequency');

var getStartFreqHz = function getStartFreqHz() {
  setupPosFromFrequency(this);
  return this.pos.start.freqHz;
};

module.exports = getStartFreqHz;
