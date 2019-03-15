var consts = require('../../constants/consts');

var getTuningInputPitchNotation = function getTuningInputPitchNotation() {
  // This is the actual tuning notation inputted on initialisation
  if (this.set && this.set.tn) return this.set.tn.ipn || this.set.tn.pn || consts.DEFAULT_PITCH_NOTATION;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getTuningInputPitchNotation;
