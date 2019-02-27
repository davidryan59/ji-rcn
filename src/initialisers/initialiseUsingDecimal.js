var Peo = require('peo');

var initialiseUsingDecimal = function initialiseUsingDecimal(jint, freqRatio) {
  jint.peo = new Peo(freqRatio);
};

module.exports = initialiseUsingDecimal;
