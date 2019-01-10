var initialiseFromAnotherJInterval = function initialiseFromAnotherJInterval(jint, jint2, alg) {
  jint.peo = jint2.getPeo();  // Creates a copy
  var theAlg = jint2.getAlg() || alg;
  if (theAlg) jint.alg = theAlg;
};

module.exports = initialiseFromAnotherJInterval;
