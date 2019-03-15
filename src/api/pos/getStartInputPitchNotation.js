var setupPosFromNotation = require('../../pos/setupPosFromNotation');

var getStartInputPitchNotation = function getStartInputPitchNotation() {
  setupPosFromNotation(this);
  return this.pos.s.ipn || this.pos.s.pn;
};

module.exports = getStartInputPitchNotation;
