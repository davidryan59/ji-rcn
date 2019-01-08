var recalcStartAndEndFrequencies = require('../../freq/recalcStartAndEndFrequencies');

var getEndFreqText = function getEndFreqText(inputtedStartFreqHz) {
  var endFreqObject = recalcStartAndEndFrequencies(this, inputtedStartFreqHz);
  return endFreqObject.txt;
};

module.exports = getEndFreqText;
