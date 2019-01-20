var consts = require('../../constants/consts');

var getTuningMultHz = function getTuningMultHz() {
  if (this.tuning) {
    var theResult = this.tuning.multHz;
    if (theResult) return theResult;
  }
  return consts.DEFAULT_FREQ_HZ;
};

module.exports = getTuningMultHz;
