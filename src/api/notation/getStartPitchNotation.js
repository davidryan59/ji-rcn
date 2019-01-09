var consts = require('../../constants/consts');

var getStartPitchNotation = function getStartPitchNotation() {
  // This is the parsed start pitch,
  // stored when requesting an end pitch notation
  // Always going to be standard notation
  return this.notation.start.pitch || consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getStartPitchNotation;
