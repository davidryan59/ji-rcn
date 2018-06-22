var initialiseFromPeo = function(jn, peo, alg) {
  jn.peo = peo.copy()           // Store a copy, not the original
  jn.alg = alg || null
}

module.exports = initialiseFromPeo
