var Fraction = require('fraction.js')
var paf = require('primes-and-factors')

var getCommaP = require('./getCommaP')

var getComma = function(input, algType) {
  // Calculate a comma for any rational number (any fraction), and any fraction
  // Part of the public API

  var fraction = (input instanceof Fraction) ? input : new Fraction(input)
  // Throws an error for non-numeric string input,
  // but parses very nicely in other circumstances.

  var numFactors = paf.getFrequency(fraction.n)
  var denomFactors = paf.getFrequency(fraction.d)
  // e.g. paf.getFrequency(12) returns [{factor:2,times:2},{factor:3,times:1}]

  var gatherPrimeCommas = function(arrayOfObjs, algType) {
    // arrayOfObjs is outputted from paf.getFrequency(N)
    // Each array item is of form {factor:A, times:B}
    var result = new Fraction(1, 1)
    for (var i=0; i<arrayOfObjs.length; i++) {
      var factObj = arrayOfObjs[i]
      var prime = factObj.factor    // 1 or prime 2, 3, ...
      var exponent = factObj.times
      if (prime>1) {
        var primeComma = getCommaP(prime, algType)
        var primeCommaPower = primeComma.pow(exponent)
        result = result.mul(primeCommaPower)
      }
    }
    return result
  }

  var result = new Fraction(1, 1)
  result = result.mul(gatherPrimeCommas(numFactors, algType))
  result = result.div(gatherPrimeCommas(denomFactors, algType))

  return result
}

module.exports = getComma
