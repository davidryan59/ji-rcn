var consts = require('../../constants/consts');

var getStartPitchNotation = function getStartPitchNotation() {
  return this.notation.start.pitch || consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getStartPitchNotation;
