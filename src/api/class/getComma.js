var Peo = require('peo');

var algorithmIndex = require('../../commas/algIndex');
var parseCommaAlgText = require('../../commas/parseCommaAlgText');

var getPeo1 = function getPeo1() {return new Peo(1);};
var defaultAlg = algorithmIndex.DEFAULT_ALG;


var getComma = function getComma(inputPrime, inputAlg) {
  // Calculate comma of the prime number inputPrime,
  // according to the specified algorithm inputAlg.
  // Comma algorithm should be defined on the '5-rough' numbers,
  // e.g. those positive integers with no factors of 2 or 3.

  // inputAlg can be text that parses via parseCommaAlgText to match a key in algIndex
  // inputAlg can be a custom function that takes in a prime number, and returns a Peo.
  // (This peo must have highest prime inputPrime, with exponent 1, otherwise default comma is used.)

  // getComma will allow composite numbers such as 253 = 11 * 23 to pass, since primality checking
  // would slow the algorithm down, however it will not guarantee correct results on composites,
  // e.g. getComma(253) is not guaranteed to equal getComma(11) * getComma(23)

  // Check if inputPrime is OK
  if (!Number.isInteger(inputPrime) || inputPrime < 5 || inputPrime > 5e15) {
    // inputPrime is either: not numeric, too small, or too big.
    // Return zero comma (interval of unison, 1)
    return getPeo1();
    // Note that 2, 3 should have zero comma in RCN system.
  }

  // Has user supplied a custom algorithm function?
  if (inputAlg instanceof Function) {
    // Case: user has supplied a custom comma algorithm
    var userAlgResult = inputAlg(inputPrime);
    if (userAlgResult instanceof Peo && userAlgResult.getPrimeExp(inputPrime) === 1 && userAlgResult.getHighestPrime() === inputPrime) {
      // user alg result is: Peo, contains inputPrime to power 1, and inputPrime is the highest prime
      // Result is valid
      return userAlgResult;
    }
    // Result is invalid. Use default algorithm instead.
    return defaultAlg(inputPrime);
  }

  // Has user supplied text description of an algorithm?
  var theAlgText = parseCommaAlgText(inputAlg);
  var theAlgFn = (theAlgText) ? algorithmIndex[theAlgText] : defaultAlg;
  var theResult = (theAlgFn) ? theAlgFn(inputPrime) : defaultAlg(inputPrime);
  theResult = (theResult) ? theResult : defaultAlg(inputPrime);
  return theResult;
};

module.exports = getComma;
