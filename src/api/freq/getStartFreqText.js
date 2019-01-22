var consts = require('../../constants/consts');

var getStartFreqText = function getStartFreqText() {
  if (this.freq && this.freq.start && this.freq.start.txt) return this.freq.start.txt;
  return consts.DEFAULT_FREQ_TXT;
};

module.exports = getStartFreqText;
