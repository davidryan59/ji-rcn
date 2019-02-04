var setNotation = require('./setNotation');
var setFrequency = require('../freq/setFrequency');

var setNoteThenFreq = function setNoteThenFreq(jint, inputStartN, inputEndN) {
  var startPeo = setNotation(jint, inputStartN, inputEndN);
  // This is only returned if start notation has changed
  if (startPeo) setFrequency(jint, jint.getTuningMultHz() * startPeo.getAsDecimal());
};

module.exports = setNoteThenFreq;
