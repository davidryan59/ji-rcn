var consts = require('../../constants/consts');

var getTuningInputPitchNotation = function getTuningInputPitchNotation() {
  // This is the actual tuning notation inputted on initialisation
  if (this.setup.tuning) return this.setup.tuning.inputPitchNotation || this.setup.tuning.pitchNotation || consts.DEFAULT_PITCH_NOTATION;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getTuningInputPitchNotation;
