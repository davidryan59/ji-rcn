var consts = require('../../constants/consts');

var getStartPitchClassNotation = function getStartPitchClassNotation() {
  // Cached when requesting an end pitch notation
  return this.notation.start.pclass || consts.DEFAULT_PITCH_CLASS_NOTATION;
};

module.exports = getStartPitchClassNotation;
