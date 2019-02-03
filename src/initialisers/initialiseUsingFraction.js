var Peo = require('peo');

var initialiseUsingFraction = function initialiseUsingFraction(jint, num, denom) {
  jint.peo = new Peo(num, denom);
};

module.exports = initialiseUsingFraction;
