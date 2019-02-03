var Peo = require('peo');

var initialiseUsingDecimal = function initialiseUsingDecimal(jint, width) {
  jint.peo = new Peo(width);
};

module.exports = initialiseUsingDecimal;
