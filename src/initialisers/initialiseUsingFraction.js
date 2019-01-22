var Peo = require('peo');
var setAlg = require('../commas/setAlg');

var initialiseUsingFraction = function initialiseUsingFraction(jint, num, denom, alg) {
  setAlg(jint, alg);
  jint.peo = new Peo(num, denom);
};

module.exports = initialiseUsingFraction;
