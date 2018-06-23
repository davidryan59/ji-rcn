var setNotation = require('../setters/setNotation')

var getPitchClass = function() {
  setNotation(this)
  return this.txt.pclass
}

module.exports = getPitchClass
