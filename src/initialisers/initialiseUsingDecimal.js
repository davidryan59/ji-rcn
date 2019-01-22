var Peo = require('peo');

var setAlg = require('../commas/setAlg');

var initialiseUsingDecimal = function initialiseUsingDecimal(jint, width, alg) {
  setAlg(jint, alg);
  jint.peo = new Peo(width);
};

module.exports = initialiseUsingDecimal;
