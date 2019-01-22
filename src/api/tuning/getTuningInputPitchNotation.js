var consts = require('../../constants/consts');

var getTuningInputPitchNotation = function getTuningInputPitchNotation() {
  // This is the actual tuning notation inputted on initialisation
  if (this.tuning) return this.tuning.inputPitchNotation || this.tuning.pitchNotation || consts.DEFAULT_PITCH_NOTATION;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getTuningInputPitchNotation;
