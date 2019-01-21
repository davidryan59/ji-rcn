var resetFreq = require('../../freq/resetFreq');
var resetNotation = require('../../notation/resetNotation');

var compress = function compress() {
  // Clear all cached information, reset object stores, make JInterval smaller in size.
  // May be needed when there are millions of JIntervals
  resetFreq(this);
  resetNotation(this);
};

module.exports = compress;
