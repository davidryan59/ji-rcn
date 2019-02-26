var setupPosFromNotation = require('../../pos/setupPosFromNotation');

var getEndInputPitchNotation = function getEndInputPitchNotation(inputtedStartNotation) {
  setupPosFromNotation(this, inputtedStartNotation);
  return this.pos.end.inputPitch || this.pos.end.pitch;
};

module.exports = getEndInputPitchNotation;
