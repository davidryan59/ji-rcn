var consts = require('../../constants/consts')

var getStartFreqHz = function() {
  // Return either:
  // - Last start frequency used (inputted to getEndFreqHz)
  // - Or default start frequency
  return this.freqHz.start || consts.DEFAULT_BASE_FREQ_HZ
}

module.exports = getStartFreqHz
