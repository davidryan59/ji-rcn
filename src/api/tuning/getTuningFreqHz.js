var consts = require('../../constants/consts');

var getTuningFreqHz = function getTuningFreqHz() {
  if (this.tuning && this.tuning.freqHz) return this.tuning.freqHz;
  return consts.DEFAULT_FREQ_HZ;
};

module.exports = getTuningFreqHz;
