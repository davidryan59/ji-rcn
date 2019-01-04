var consts = require('../../constants/consts')

var getBaseFreqHz = function() {
  return this.baseFreqHz || consts.DEFAULT_BASE_FREQ_HZ
}

module.exports = getBaseFreqHz
