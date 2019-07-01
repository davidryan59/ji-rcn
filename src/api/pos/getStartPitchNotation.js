var setupPosFromNotation = require('../../properties/pos/setupPosFromNotation');

var getStartPitchNotation = function getStartPitchNotation() {
  setupPosFromNotation(this);
  return this.pos.s.pn;
};

module.exports = getStartPitchNotation;
