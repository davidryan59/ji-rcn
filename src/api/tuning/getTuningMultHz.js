var consts = require('../../constants/consts');

var getTuningMultHz = function getTuningMultHz() {
  if (this.tuning && this.tuning.multHz) return this.tuning.multHz;
  return consts.DEFAULT_FREQ_HZ;
};

module.exports = getTuningMultHz;
