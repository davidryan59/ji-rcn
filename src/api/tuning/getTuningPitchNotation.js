var consts = require('../../constants/consts');

var getTuningPitchNotation = function getTuningPitchNotation() {
  if (this.setup.tuning && this.setup.tuning.pitchNotation) return this.setup.tuning.pitchNotation;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getTuningPitchNotation;
