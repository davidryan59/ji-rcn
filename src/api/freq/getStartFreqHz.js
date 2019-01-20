var consts = require('../../constants/consts');

var getStartFreqHz = function getStartFreqHz() {
  return this.freq.start.hz || consts.DEFAULT_FREQ_HZ;
};

module.exports = getStartFreqHz;
