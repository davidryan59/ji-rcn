var consts = require('../../constants/consts');

var getStartPitchInputNotation = function getStartPitchInputNotation() {
  // This is what is actually inputted when:
  // i) initialising interval as difference of 2 notations
  // ii) requesting an end pitch notation from a start pitch notation
  // Could be non-standard notation, e.g. "C#b4"
  if (this.notation && this.notation.start) return this.notation.start.inputPitch || this.notation.start.pitch || consts.DEFAULT_PITCH_NOTATION;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getStartPitchInputNotation;
