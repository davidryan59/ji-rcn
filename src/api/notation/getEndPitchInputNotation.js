var consts = require('../../constants/consts');
var setNoteThenFreq = require('../../notation/setNoteThenFreq');

var getEndPitchInputNotation = function getEndPitchInputNotation(inputtedStartNotation) {
  // This is what is actually inputted when:
  // initialising interval as difference of 2 notations
  // Could be non-standard notation, e.g. "F'.4"

  // First ensure start value is correct
  setNoteThenFreq(this, inputtedStartNotation);

  // Then return correct component
  if (this.notation && this.notation.end) return this.notation.end.inputPitch || this.notation.end.pitch || consts.DEFAULT_PITCH_NOTATION;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getEndPitchInputNotation;
