var setupPosFromNotation = require('../../pos/setupPosFromNotation');

var getEndPitchInputNotation = function getEndPitchInputNotation(inputtedStartNotation) {
  setupPosFromNotation(this, inputtedStartNotation);
  return this.pos.end.inputPitch || this.pos.end.pitch;
};

module.exports = getEndPitchInputNotation;
