var texts = require('../constants/text')

var getErrorNotation = function(includeText) {
  var theText = ("" + includeText).substr(0, texts.ERROR_MAX_CHARS)
  return texts.BRACKET_LEFT_STANDARD + theText + texts.ERROR_TEXT + texts.BRACKET_RIGHT_STANDARD
}

module.exports = getErrorNotation
