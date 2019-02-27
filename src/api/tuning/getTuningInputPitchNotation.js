var consts = require('../../constants/consts');

var getTuningInputPitchNotation = function getTuningInputPitchNotation() {
  // This is the actual tuning notation inputted on initialisation
  if (this.setup.tune) return this.setup.tune.inputPitchNotation || this.setup.tune.pitchNotation || consts.DEFAULT_PITCH_NOTATION;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getTuningInputPitchNotation;
