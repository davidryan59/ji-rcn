var consts = require('../../constants/consts');

var getStartPitchNotation = function getStartPitchNotation() {
  // This is the parsed start pitch,
  // stored when requesting an end pitch notation
  // Always going to be standard notation
  if (this.notation && this.notation.start && this.notation.start.pitch) return this.notation.start.pitch;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getStartPitchNotation;
