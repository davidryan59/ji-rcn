var getPeo = function() {
  // Its a Peo object.
  // Need to copy it before releasing
  return this.peo.copy()
}

module.exports = getPeo