var hasTuning = function hasTuning() {
  return !!(this.set.tn && this.set.tn.mhz);
};

module.exports = hasTuning;
