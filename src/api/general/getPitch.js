var setNotation = require('../../notation/setNotation')

var getPitch = function() {
  setNotation(this)
  return this.txt.pitch
}

module.exports = getPitch
