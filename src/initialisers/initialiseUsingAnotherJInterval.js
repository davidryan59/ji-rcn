var setAlg = require('./setAlg');

var initialiseUsingAnotherJInterval = function initialiseUsingAnotherJInterval(jint, jint2, alg) {
  setAlg(jint, alg, jint2);
  jint.peo = jint2.getPeo();  // Creates a copy
};

module.exports = initialiseUsingAnotherJInterval;
