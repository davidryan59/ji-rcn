var getFreqText = require('../../maths/getFreqText');

var getStartFreqText = function() {
  var theFreqHz = this.getStartFreqHz()
  return getFreqText(theFreqHz);
}

module.exports = getStartFreqText
