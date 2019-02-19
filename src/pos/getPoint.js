var getFreqText = require('./getFreqText');
var calcNotationObject = require('../notation/calcNotationObject');

var getPoint = function getPoint(jint, thePeo) {
  var result = {};
  result.peo = thePeo;

  var peoAsDecimal = thePeo.getAsDecimal();
  var tuningMultHz = jint.getTuningMultHz();
  var frequencyHz = peoAsDecimal * tuningMultHz;
  if (frequencyHz > 1e15) frequencyHz = 0;
  result.freqHz = frequencyHz;
  result.freqTxt = getFreqText(frequencyHz);

  var notationObject = calcNotationObject(thePeo, jint.getAlgFn());
  result.pitch = notationObject.pitch;
  result.pclass = notationObject.pclass;

  return result;
};

module.exports = getPoint;
