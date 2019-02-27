var consts = require('../../constants/consts');

var getTuningFreqHz = function getTuningFreqHz() {
  if (this.setup.tune && this.setup.tune.freqHz) return this.setup.tune.freqHz;
  return consts.DEFAULT_FREQ_HZ;
};

module.exports = getTuningFreqHz;
