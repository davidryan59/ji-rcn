var compress = function compress() {
  // Clear all cached information, reset object stores, make JInterval smaller in size.
  // May be needed when there are millions of JIntervals
  this.freq = {};
  this.freq.start = {};
  this.freq.end = {};
  this.notation = {};
  this.notation.start = {};
  this.notation.end = {};
};

module.exports = compress;
