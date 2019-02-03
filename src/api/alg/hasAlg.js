// Does this JInterval have a non-default algorithm?
var hasAlg = function hasAlg() {
  if (this.alg) return true;   // Case: non-default
  return false;                // Case: Default
};

module.exports = hasAlg;
