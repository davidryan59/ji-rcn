var consts = require('../../constants/consts');

var getTuningMultHz = function getTuningMultHz() {
  if (this.setup.tuning && this.setup.tuning.multHz) return this.setup.tuning.multHz;
  return consts.DEFAULT_FREQ_HZ;
};

module.exports = getTuningMultHz;
