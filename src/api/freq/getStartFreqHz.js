var consts = require('../../constants/consts');

var getStartFreqHz = function getStartFreqHz() {
  if (this.freq && this.freq.start && this.freq.start.hz) return this.freq.start.hz;
  return consts.DEFAULT_FREQ_HZ;
};

module.exports = getStartFreqHz;
