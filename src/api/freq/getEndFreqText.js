var setFreqThenNotation = require('../../freq/setFreqThenNotation');

var getEndFreqText = function getEndFreqText(inputtedStartFreqHz) {
  setFreqThenNotation(this, inputtedStartFreqHz);
  return this.freq.end.txt;
};

module.exports = getEndFreqText;
