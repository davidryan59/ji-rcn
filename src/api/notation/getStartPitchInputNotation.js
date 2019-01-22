var consts = require('../../constants/consts');

var getStartPitchInputNotation = function getStartPitchInputNotation() {
  // This is what is actually inputted when requesting an end pitch notation
  // Could be non-standard notation, e.g. "C#b4"
  if (this.notation && this.notation.start) return this.notation.start.inputPitch || this.notation.start.pitch || consts.DEFAULT_PITCH_NOTATION;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getStartPitchInputNotation;
