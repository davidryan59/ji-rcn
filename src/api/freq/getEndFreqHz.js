var recalcStartAndEndFrequencies = require('../../freq/recalcStartAndEndFrequencies');

var getEndFreqHz = function getEndFreqHz(inputtedStartFreqHz) {
  var endFreqObject = recalcStartAndEndFrequencies(this, inputtedStartFreqHz);
  return endFreqObject.hz;
};

module.exports = getEndFreqHz;
