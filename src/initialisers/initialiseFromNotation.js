var privateParseNotation = require("../private/privateParseNotation")

var initialiseFromNotation = function(jint, notationText) {

  // Simple implementation. Doesn't take into account:
  // Base notation other than C4
  // Comma algorithm other than default

  jint.peo = privateParseNotation(notationText)
}

module.exports = initialiseFromNotation
