var consts = require('../constants/consts');

var getErrorNotation = function getErrorNotation(includeText) {
  // Make error notation of form (.ERR) where . is the leftmost character of includeText
  var theText = '' + includeText;
  return consts.BRACKET_LEFT_STANDARD + theText[0] + consts.ERROR_TEXT + consts.BRACKET_RIGHT_STANDARD;
};

module.exports = getErrorNotation;
