var recalcStartAndEndNotations = require('../../notation/recalcStartAndEndNotations');

var getEndPitchNotation = function getEndPitchNotation(inputtedStartNotation) {
  var endNotationObject = recalcStartAndEndNotations(this, inputtedStartNotation);
  return endNotationObject.pitch;
};

module.exports = getEndPitchNotation;
