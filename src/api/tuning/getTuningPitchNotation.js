var consts = require('../../constants/consts');

var getTuningPitchNotation = function getTuningPitchNotation() {
  if (this.setup.tune && this.setup.tune.pitchNotation) return this.setup.tune.pitchNotation;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getTuningPitchNotation;
