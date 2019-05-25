var initialiseUsingPeo = function initialiseUsingPeo(jint, peo) {
  jint.peo = peo.copy();   // Don't store the original peo; store a copy
};

module.exports = initialiseUsingPeo;
