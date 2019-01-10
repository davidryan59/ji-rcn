var initialiseFromPeo = function initialiseFromPeo(jint, peo, alg) {
  jint.peo = peo.copy();           // Store a copy, not the original
  if (alg) jint.alg = alg;
};

module.exports = initialiseFromPeo;
