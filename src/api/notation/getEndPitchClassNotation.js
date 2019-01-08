var recalcStartAndEndNotations = require('../../notation/recalcStartAndEndNotations');

var getEndPitchClassNotation = function getEndPitchClassNotation(inputtedStartNotation) {
  var endNotationObject = recalcStartAndEndNotations(this, inputtedStartNotation);
  return endNotationObject.pclass;
};

module.exports = getEndPitchClassNotation;
