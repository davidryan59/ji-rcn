var consts = require('../../constants/consts');

var getStartPitchInputNotation = function getStartPitchInputNotation() {
  // This is what is actually inputted when requesting an end pitch notation
  // Could be non-standard notation, e.g. "C#b4"
  return this.notation.start.inputPitch || consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getStartPitchInputNotation;
