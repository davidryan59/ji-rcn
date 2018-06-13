var getCommaP = require('./getCommaP')

var getComma = function(input, algType) {
  // Currently will only work for input = prime
  // Intending to fix this...
  // Want input to be:
  // - a prime p, 7, 1979
  // - a composite, n, 6, 42
  // - a fraction, t, "5/7"
  // ...etc?
  return getCommaP(input, algType)
}

module.exports = getComma
