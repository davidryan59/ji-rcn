var hasTuning = function hasTuning() {
  return !!(this.setup.tune && this.setup.tune.multHz);
};

module.exports = hasTuning;
