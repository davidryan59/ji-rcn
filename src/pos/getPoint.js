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
  result.fhz = frequencyHz;
  result.ftx = getFreqText(frequencyHz);

  var notationObject = calcNotationObject(jint, thePeo);
  result.pn = notationObject.pn;
  result.pc = notationObject.pc;

  return result;
};

module.exports = getPoint;
