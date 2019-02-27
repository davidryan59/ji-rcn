var consts = require('../../constants/consts');

var getTuningMultHz = function getTuningMultHz() {
  if (this.setup.tune && this.setup.tune.multHz) return this.setup.tune.multHz;
  return consts.DEFAULT_FREQ_HZ;
};

module.exports = getTuningMultHz;
