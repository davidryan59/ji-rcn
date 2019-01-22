var removeFrequency = require('../../freq/removeFrequency');
var removeNotation = require('../../notation/removeNotation');

var compress = function compress() {
  // Clear all cached information, reset object stores, make JInterval smaller in size.
  // May be needed when there are millions of JIntervals
  removeFrequency(this);
  removeNotation(this);
};

module.exports = compress;
