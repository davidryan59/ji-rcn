var consts = require('../../constants/consts');

var getStartFreqText = function getStartFreqText() {
  return this.freq.start.txt || consts.DEFAULT_FREQ_TXT;
};

module.exports = getStartFreqText;
