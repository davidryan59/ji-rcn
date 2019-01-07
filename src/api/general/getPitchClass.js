var setNotation = require('../../notation/setNotation')

var getPitchClass = function() {
  setNotation(this)
  return this.txt.pclass
}

module.exports = getPitchClass
