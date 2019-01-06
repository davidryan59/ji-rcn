var initialiseFromPeo = function(jint, peo, alg) {
  jint.peo = peo.copy()           // Store a copy, not the original
  jint.alg = alg || null
}

module.exports = initialiseFromPeo
