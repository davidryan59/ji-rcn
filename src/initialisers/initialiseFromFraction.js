var Peo = require('peo');

var initialiseFromFraction = function initialiseFromFraction(jint, num, denom, alg) {
  jint.peo = new Peo(num, denom);
  if (alg) jint.alg = alg;
};

module.exports = initialiseFromFraction;
