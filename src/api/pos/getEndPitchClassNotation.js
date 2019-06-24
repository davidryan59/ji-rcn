var setupPosFromNotation = require('../../properties/pos/setupPosFromNotation');

var getEndPitchClassNotation = function getEndPitchClassNotation(inputtedStartNotation) {
  setupPosFromNotation(this, inputtedStartNotation);
  return this.pos.e.pc;
};

module.exports = getEndPitchClassNotation;
