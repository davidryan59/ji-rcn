var setupPosFromNotation = require('../../pos/setupPosFromNotation');

var getStartPitchInputNotation = function getStartPitchInputNotation() {
  setupPosFromNotation(this);
  return this.pos.start.inputPitch || this.pos.start.pitch;
};

module.exports = getStartPitchInputNotation;
