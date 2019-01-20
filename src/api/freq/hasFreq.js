var hasFreq = function hasFreq() {
  if (this.freq && this.freq.start && this.freq.start.hz) return true;
  return false;
};

module.exports = hasFreq;
