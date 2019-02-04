var setNoteThenFreq = require('../../notation/setNoteThenFreq');

var getEndPitchNotation = function getEndPitchNotation(inputtedStartNotation) {
  setNoteThenFreq(this, inputtedStartNotation);
  return this.notation.end.pitch;
};

module.exports = getEndPitchNotation;
