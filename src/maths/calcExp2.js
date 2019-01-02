var calcExp2 = function(p, exp3) {
  // For a given prime and power of 3,
  // find the power of 2 which gets the whole fraction closest to 1/1

  var log3 = Math.log(3)
  var log2 = Math.log(2)
  var log23 = log3/log2

  var logp = Math.log(p)
  var log2p = logp/log2

  return Math.round(-log2p - exp3*log23)

}

module.exports = calcExp2
