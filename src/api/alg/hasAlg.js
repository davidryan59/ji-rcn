// Does this JInterval have a custom algorithm?
var hasAlg = function hasAlg() {
  if (this.alg) return true;   // Case: Custom
  return false;                // Case: Default
};

module.exports = hasAlg;
