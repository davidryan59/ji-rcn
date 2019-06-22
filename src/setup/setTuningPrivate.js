var consts = require('../constants/consts');
var parseNotation = require('../notation/parseNotation');
var calcNotationObject = require('../notation/calcNotationObject');

var setTuningPrivate = function setTuningPrivate(jint, theTuning) {
  // Return if a tuning hasn't been supplied
  if (!theTuning) return;

  var multHz = null;
  var pitchNotation = null;
  var inputPitchNotation = theTuning.pitchNotation;
  var freqHz = theTuning.freqHz;
  if (!freqHz) freqHz = consts.DEFAULT_FREQ_HZ;
  if (!inputPitchNotation) {
    pitchNotation = consts.DEFAULT_PITCH_NOTATION;
    multHz = freqHz;
  } else {
    var thePeo = parseNotation(jint, inputPitchNotation);
    pitchNotation = calcNotationObject(jint, thePeo).pn;
    multHz = thePeo.mult(freqHz, -1).pow(-1).getAsDecimal();   // freq/peo = (peo * freq^-1)^-1
  }
  jint.set.tn = {
    fhz: freqHz,
    pn: pitchNotation,
    mhz: multHz
  };
  if (inputPitchNotation && inputPitchNotation !== pitchNotation) jint.set.tn.ipn = inputPitchNotation;
};

module.exports = setTuningPrivate;
