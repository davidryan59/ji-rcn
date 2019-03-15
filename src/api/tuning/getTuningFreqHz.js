var consts = require('../../constants/consts');

var getTuningFreqHz = function getTuningFreqHz() {
  if (this.set.tn && this.set.tn.fhz) return this.set.tn.fhz;
  return consts.DEFAULT_FREQ_HZ;
};

module.exports = getTuningFreqHz;
