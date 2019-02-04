var setNoteThenFreq = require('../../notation/setNoteThenFreq');

var getEndPitchInputNotation = function getEndPitchInputNotation(inputtedStartNotation) {
  // This is what is actually inputted when:
  // initialising interval as difference of 2 notations
  // Could be non-standard notation, e.g. "F'.4"

  setNoteThenFreq(this, inputtedStartNotation);
  return this.notation.end.inputPitch || this.notation.end.pitch;
};

module.exports = getEndPitchInputNotation;
