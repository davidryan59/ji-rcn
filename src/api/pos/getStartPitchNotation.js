var setupPosFromNotation = require('../../pos/setupPosFromNotation');

var getStartPitchNotation = function getStartPitchNotation() {
  setupPosFromNotation(this);
  return this.pos.start.pitch;
};

module.exports = getStartPitchNotation;
