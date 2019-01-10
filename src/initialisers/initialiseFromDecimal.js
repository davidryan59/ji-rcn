var Peo = require('peo');

var initialiseFromDecimal = function initialiseFromDecimal(jint, width, alg) {
  jint.peo = new Peo(width);
  if (alg) jint.alg = alg;
};

module.exports = initialiseFromDecimal;
