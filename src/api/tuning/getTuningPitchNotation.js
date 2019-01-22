var consts = require('../../constants/consts');

var getTuningPitchNotation = function getTuningPitchNotation() {
  if (this.tuning && this.tuning.pitchNotation) return this.tuning.pitchNotation;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getTuningPitchNotation;
