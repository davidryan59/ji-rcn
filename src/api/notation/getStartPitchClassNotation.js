var consts = require('../../constants/consts');

var getStartPitchClassNotation = function getStartPitchClassNotation() {
  // Cached when requesting an end pitch notation
  if (this.notation && this.notation.start && this.notation.start.pclass) {
    return this.notation.start.pclass;
  }
  return consts.DEFAULT_PITCH_CLASS_NOTATION;
};

module.exports = getStartPitchClassNotation;
