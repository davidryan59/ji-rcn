var removePos = require('../../pos/removePos');

var compress = function compress() {
  // Clear all cached information, reset object stores, make JInterval smaller in size.
  // May be needed when there are millions of JIntervals
  removePos(this);
  this.peo.compress();
};

module.exports = compress;
