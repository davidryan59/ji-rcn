var setDisplay = function setDisplay(jint, theDisplay) {
  // if (!theTuning) return;
  // var tuningMultHz = null;
  // var pitchNotation = null;
  // var inputPitchNotation = theTuning.pitchNotation;
  // var freqHz = theTuning.freqHz;
  // if (!freqHz) freqHz = consts.DEFAULT_FREQ_HZ;
  // if (!inputPitchNotation) {
  //   pitchNotation = consts.DEFAULT_PITCH_NOTATION;
  //   tuningMultHz = freqHz;
  // } else {
  //   var thePeo = parseNotation(jint, inputPitchNotation);
  //   pitchNotation = calcNotationObject(jint, thePeo).pitch;
  //   tuningMultHz = thePeo.mult(freqHz, -1).pow(-1).getAsDecimal();   // freq/peo = (peo * freq^-1)^-1
  // }
  // jint.setup.tuning = {
  //   freqHz: freqHz,
  //   pitchNotation: pitchNotation,
  //   multHz: tuningMultHz
  // };
  // if (inputPitchNotation && inputPitchNotation !== pitchNotation) jint.setup.tuning.inputPitchNotation = inputPitchNotation;
};

module.exports = setDisplay;
