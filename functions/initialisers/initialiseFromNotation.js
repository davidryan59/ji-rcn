var Peo = require('peo')

var initialiseFromPeo = require('./initialiseFromPeo')

var initialiseFromNotation = function(jn, notationText) {
  // Dummy output
  initialiseFromPeo(jn, new Peo(), "")
}

module.exports = initialiseFromNotation
