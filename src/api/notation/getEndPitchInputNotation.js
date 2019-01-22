var consts = require('../../constants/consts');

var getEndPitchInputNotation = function getEndPitchInputNotation() {
  // This is what is actually inputted when:
  // initialising interval as difference of 2 notations
  // Could be non-standard notation, e.g. "F'.4"
  if (this.notation && this.notation.end) return this.notation.end.inputPitch || this.notation.end.pitch || consts.DEFAULT_PITCH_NOTATION;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getEndPitchInputNotation;
