var consts = require('../../constants/consts')

var getStartFreqHz = function() {
  return this.freq.start.hz || consts.DEFAULT_BASE_FREQ_HZ
}

module.exports = getStartFreqHz
