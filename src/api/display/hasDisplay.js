var hasDisplay = function hasDisplay() {
  return !!(this.set && this.set.ds);
};

module.exports = hasDisplay;
