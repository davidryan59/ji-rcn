var hasTuning = function hasTuning() {
  return !!(this.setup.tuning && this.setup.tuning.multHz);
};

module.exports = hasTuning;
