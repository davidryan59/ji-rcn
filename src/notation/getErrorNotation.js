var consts = require('../constants/consts');

var getErrorNotation = function getErrorNotation(includeText) {
  var theText = ('' + includeText).substr(0, consts.ERROR_MAX_CHARS);
  return consts.BRACKET_LEFT_STANDARD + theText + consts.ERROR_TEXT + consts.BRACKET_RIGHT_STANDARD;
};

module.exports = getErrorNotation;
