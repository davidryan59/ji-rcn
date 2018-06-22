var setNotation = require('../setters/setNotation')

var getText = function() {
  setNotation(this)
  return this.txt.all
}

module.exports = getText
