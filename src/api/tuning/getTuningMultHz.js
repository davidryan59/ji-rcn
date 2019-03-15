var consts = require('../../constants/consts');

var getTuningMultHz = function getTuningMultHz() {
  if (this.set.tn && this.set.tn.mhz) return this.set.tn.mhz;
  return consts.DEFAULT_FREQ_HZ;
};

module.exports = getTuningMultHz;
