var consts = require('../constants/consts');
var parseNotation = require('../notation/parseNotation');
var calcNotationObject = require('../notation/calcNotationObject');

var setTuning = function setTuning(jint, theTuning) {
  if (!theTuning) return;

  var theAlg = jint.getAlgFn();

  var tuningMultHz = null;
  var pitchNotation = null;
  var inputPitchNotation = theTuning.pitchNotation;
  var freqHz = theTuning.freqHz;
  if (!freqHz) freqHz = consts.DEFAULT_FREQ_HZ;
  if (!inputPitchNotation) {
    pitchNotation = consts.DEFAULT_PITCH_NOTATION;
    tuningMultHz = freqHz;
  } else {
    var thePeo = parseNotation(inputPitchNotation, theAlg);
    pitchNotation = calcNotationObject(thePeo, theAlg).pitch;
    tuningMultHz = thePeo.mult(freqHz, -1).pow(-1).getAsDecimal();   // freq/peo = (peo * freq^-1)^-1
  }
  jint.tuning = {
    freqHz: freqHz,
    pitchNotation: pitchNotation,
    multHz: tuningMultHz
  };
  if (inputPitchNotation && inputPitchNotation !== pitchNotation) jint.tuning.inputPitchNotation = inputPitchNotation;
};

module.exports = setTuning;
