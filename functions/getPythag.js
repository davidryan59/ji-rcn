var Fraction = require('fraction.js')

var getComma = require('./getComma')

var getPythag = function(input, algType) {
  var inputFraction = new Fraction(input)
  var commaFraction = getComma(input, algType)
  var pythagFraction = inputFraction.div(commaFraction)
  return pythagFraction
}

module.exports = getPythag
