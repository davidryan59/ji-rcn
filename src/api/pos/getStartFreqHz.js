var setupPosFromFrequency = require('../../pos/setupPosFromFrequency');

var getStartFreqHz = function getStartFreqHz() {
  setupPosFromFrequency(this);
  return this.pos.s.fhz;
};

module.exports = getStartFreqHz;
