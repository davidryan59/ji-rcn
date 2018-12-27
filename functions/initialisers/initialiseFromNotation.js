var parseNotation = require("../api/class/parseNotation")

var initialiseFromNotation = function(jn, notationText) {

  // Simple implementation. Doesn't take into account:
  // Base notation other than C4
  // Comma algorithm other than default

  jn.peo = parseNotation(notationText)
  console.log(jn.peo)        // DEBUG ONLY - REMOVE ME!
  jn.alg = null
}

module.exports = initialiseFromNotation
