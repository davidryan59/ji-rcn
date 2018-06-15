var Fraction = require('fraction.js')
var paf = require('primes-and-factors')

var getDiatonicScaleLabel = require('./getDiatonicScaleLabel')
var getSharpsAndFlats = require('./getSharpsAndFlats')
var getOctaveLabel = require('./getOctaveLabel')

var getNotation = function(input, algType) {
  var inputFraction = new Fraction(input)
  var numFactors = paf.getFrequency(inputFraction.n)
  var denomFactors = paf.getFrequency(inputFraction.d)

  var exp2 = 0
  var exp3 = 0

  var get2And3 = function(arrayFactors, mult) {
    for (var i=0; i<arrayFactors.length; i++) {
      var factorObj = arrayFactors[i]
      var fact = factorObj.factor
      var exp = factorObj.times
      if (fact === 2) {
        exp2 += exp * mult
      } else if (fact === 3) {
        exp3 += exp * mult
      }
    }
  }

  get2And3(numFactors, 1)
  get2And3(denomFactors, -1)

  console.log(inputFraction.toFraction(), numFactors, denomFactors, exp2, exp3)

  return getDiatonicScaleLabel(exp3)
       + getSharpsAndFlats(exp3)
       + getOctaveLabel(exp2)

  // INCOMPLETE, some other stuff here
  // INCORRECT, after each item, need to divide out its influence on original input
}

module.exports = getNotation
