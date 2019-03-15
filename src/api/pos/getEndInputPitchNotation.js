var setupPosFromNotation = require('../../pos/setupPosFromNotation');

var getEndInputPitchNotation = function getEndInputPitchNotation(inputtedStartNotation) {
  setupPosFromNotation(this, inputtedStartNotation);
  return this.pos.e.ipn || this.pos.e.pn;
};

module.exports = getEndInputPitchNotation;
