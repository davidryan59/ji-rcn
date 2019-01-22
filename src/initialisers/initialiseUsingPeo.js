var setAlg = require('../commas/setAlg');

var initialiseUsingPeo = function initialiseUsingPeo(jint, peo, alg) {
  setAlg(jint, alg);
  jint.peo = peo.copy();           // Store a copy, not the original
};

module.exports = initialiseUsingPeo;
