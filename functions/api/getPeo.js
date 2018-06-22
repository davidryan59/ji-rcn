var getPeo = function() {
  // Public API - jn immutable
  // - have to return a copy of Peo object!
  return this.peo.copy()
}

module.exports = getPeo
