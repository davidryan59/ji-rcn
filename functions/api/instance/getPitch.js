var setNotation = require('../../setters/setNotation')

var getPitch = function() {
  setNotation(this)
  return this.txt.pitch
}

module.exports = getPitch
