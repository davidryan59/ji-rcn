var setupPosFromNotation = require('../../pos/setupPosFromNotation');

var getEndPitchClassNotation = function getEndPitchClassNotation(inputtedStartNotation) {
  setupPosFromNotation(this, inputtedStartNotation);
  return this.pos.end.pclass;
};

module.exports = getEndPitchClassNotation;
