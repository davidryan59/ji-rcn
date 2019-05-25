var ratioPeo = function ratioPeo() {
  // Return the actual Peo object describing this JInterval ratio.
  // Original, not copy, so that cached values on Peo can be accessed
  // e.g. jint.ratioPeo().getSomeProperty() accesses the cached value on Peo
  return this.peo;
};

module.exports = ratioPeo;
