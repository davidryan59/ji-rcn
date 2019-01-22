var setNotation = require('../../notation/setNotation');

var getEndPitchClassNotation = function getEndPitchClassNotation(inputtedStartNotation) {
  var endNotationObject = setNotation(this, inputtedStartNotation);
  return endNotationObject.pclass;
};

module.exports = getEndPitchClassNotation;
