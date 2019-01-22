var setNotation = require('../../notation/setNotation');

var getEndPitchNotation = function getEndPitchNotation(inputtedStartNotation) {
  var endNotationObject = setNotation(this, inputtedStartNotation);
  return endNotationObject.pitch;
};

module.exports = getEndPitchNotation;
