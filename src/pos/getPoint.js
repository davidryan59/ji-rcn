var getFreqText = require('./getFreqText');
var calcNotationObject = require('../notation/calcNotationObject');

var largeLimit = 1e15;

var getPoint = function getPoint(jint, thePeo) {
  var result = {};
  result.peo = thePeo;

  var peoAsDecimal = thePeo.getAsDecimal();
  var tuningMultHz = jint.getTuningMultHz();
  var frequencyHz = peoAsDecimal * tuningMultHz;
  if (frequencyHz > largeLimit) frequencyHz = 0;
  result.freqHz = frequencyHz;
  result.freqTxt = getFreqText(frequencyHz);

  var notationObject = calcNotationObject(jint, thePeo);
  result.pitch = notationObject.pitch;
  result.pclass = notationObject.pclass;

  return result;
};

module.exports = getPoint;
