var initialiseUsingPeo = function initialiseUsingPeo(jint, peo) {
  jint.peo = peo.copy();           // Store a copy, not the original
};

module.exports = initialiseUsingPeo;
