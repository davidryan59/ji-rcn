var setupPosFromNotation = require('../../pos/setupPosFromNotation');

var getStartPitchClassNotation = function getStartPitchClassNotation() {
  setupPosFromNotation(this);
  return this.pos.start.pclass;
};

module.exports = getStartPitchClassNotation;
