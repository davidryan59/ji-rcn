var consts = require('../../constants/consts');

var getTuningFreqHz = function getTuningFreqHz() {
  if (this.setup.tuning && this.setup.tuning.freqHz) return this.setup.tuning.freqHz;
  return consts.DEFAULT_FREQ_HZ;
};

module.exports = getTuningFreqHz;
