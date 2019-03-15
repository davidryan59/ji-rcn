var consts = require('../../constants/consts');

var getTuningPitchNotation = function getTuningPitchNotation() {
  if (this.set.tn && this.set.tn.pn) return this.set.tn.pn;
  return consts.DEFAULT_PITCH_NOTATION;
};

module.exports = getTuningPitchNotation;
