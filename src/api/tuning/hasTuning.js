var hasTuning = function hasTuning() {
  if (this.tuning && this.tuning.multHz) return true;
  return false;
};

module.exports = hasTuning;
