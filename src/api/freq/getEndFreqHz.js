var recalcStartAndEndFrequencies = require('../../freq/recalcStartAndEndFrequencies')

var getEndFreqHz = function(inputtedStartFreqHz) {
  var endFreqObject = recalcStartAndEndFrequencies(this, inputtedStartFreqHz);
  return endFreqObject.hz;
}

module.exports = getEndFreqHz
