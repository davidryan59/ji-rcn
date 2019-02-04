var setFreqThenNotation = require('../../freq/setFreqThenNotation');

var getEndFreqHz = function getEndFreqHz(inputtedStartFreqHz) {
  setFreqThenNotation(this, inputtedStartFreqHz);
  return this.freq.end.hz;
};

module.exports = getEndFreqHz;
