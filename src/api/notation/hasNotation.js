var hasNotation = function hasNotation() {
  if (this.notation && this.notation.start && this.notation.start.pitch) return true;
  return false;
};

module.exports = hasNotation;
