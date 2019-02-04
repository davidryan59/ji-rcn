var setNoteThenFreq = require('../../notation/setNoteThenFreq');

var getEndPitchClassNotation = function getEndPitchClassNotation(inputtedStartNotation) {
  setNoteThenFreq(this, inputtedStartNotation);
  return this.notation.end.pclass;
};

module.exports = getEndPitchClassNotation;
