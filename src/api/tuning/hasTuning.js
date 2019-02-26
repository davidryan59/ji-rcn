var hasTuning = function hasTuning() {
  return !!(this.tuning && this.tuning.multHz)
};

module.exports = hasTuning;
