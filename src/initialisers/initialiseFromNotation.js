var parseNotation = require("../api/class/parseNotation")

var initialiseFromNotation = function(jint, notationText) {

  // Simple implementation. Doesn't take into account:
  // Base notation other than C4
  // Comma algorithm other than default

  jint.peo = parseNotation(notationText)
  jint.alg = null
}

module.exports = initialiseFromNotation
