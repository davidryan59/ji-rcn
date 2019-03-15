var hasAlg = function hasAlg() {
  return !!(this.set && this.set.alg);
};

module.exports = hasAlg;
