var consts = require('../../constants/consts')

var getStartFreqText = function() {
  return this.freq.start.txt || consts.DEFAULT_BASE_FREQ_TXT
}

module.exports = getStartFreqText
