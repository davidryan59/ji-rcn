var setFrequency = require('../../freq/setFrequency');

var getEndFreqHz = function getEndFreqHz(inputtedStartFreqHz) {
  var endFreqObject = setFrequency(this, inputtedStartFreqHz);
  return endFreqObject.hz;
};

module.exports = getEndFreqHz;
