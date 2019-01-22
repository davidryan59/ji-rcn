var setFrequency = require('../../freq/setFrequency');

var getEndFreqText = function getEndFreqText(inputtedStartFreqHz) {
  var endFreqObject = setFrequency(this, inputtedStartFreqHz);
  return endFreqObject.txt;
};

module.exports = getEndFreqText;
