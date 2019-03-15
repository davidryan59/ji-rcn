var hasTuning = function hasTuning() {
  return !!(this.set && this.set.tn && this.set.tn.mhz);
};

module.exports = hasTuning;
