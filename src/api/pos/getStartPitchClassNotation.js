var setupPosFromNotation = require('../../properties/pos/setupPosFromNotation');

var getStartPitchClassNotation = function getStartPitchClassNotation() {
  setupPosFromNotation(this);
  return this.pos.s.pc;
};

module.exports = getStartPitchClassNotation;
