var consts = require('../../constants/consts')

var getEndFreqHz = function(startFreqHz) {
  // Given a start frequency, return the end frequency for this JInterval

  // Check if result has been cached. If so, return it.
  if (!!this.freqHz.start && startFreqHz === this.freqHz.start) return this.freqHz.end;

  // Clean the input (if supplied)
  var startFreqCheckedHz = this.freqHz.start || consts.DEFAULT_BASE_FREQ_HZ;
  if (Number.isFinite(startFreqHz) && startFreqHz > 0) startFreqCheckedHz = startFreqHz;

  // Calculate the interval
  var interval = this.getVal();
  var endFreqHz = startFreqCheckedHz * interval;

  // Cache the results for reuse
  this.freqHz.start = startFreqCheckedHz;
  this.freqHz.end = endFreqHz;

  return endFreqHz
}

module.exports = getEndFreqHz
