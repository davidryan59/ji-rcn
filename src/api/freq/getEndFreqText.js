var getFreqText = require('../../maths/getFreqText');

var getEndFreqText = function(startFreqHz) {
  var theFreqHz = this.getEndFreqHz(startFreqHz)
  return getFreqText(theFreqHz);
}

module.exports = getEndFreqText
