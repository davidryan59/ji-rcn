var setupPosFromNotation = require('../../pos/setupPosFromNotation');

var getStartInputPitchNotation = function getStartInputPitchNotation() {
  setupPosFromNotation(this);
  return this.pos.start.inputPitch || this.pos.start.pitch;
};

module.exports = getStartInputPitchNotation;
