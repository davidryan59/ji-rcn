var getEndFreqHz = function(startFreqHz) {
  // Given a start frequency for a JInterval:
  // - Return the end frequency, if answer is already cached
  // - Otherwise calculate the end frequency from the start frequency and interval width

  // Check if correct result has been cached. If so, return it.
  if (this.freqHz.start) {
    // There is a cached result
    if (startFreqHz === this.freqHz.start) {
      // Asking for same cached result. Return it.
      return this.freqHz.end;
    } else if (!startFreqHz) {
      // No startFreqHz specified. Repeat previous result
      return this.freqHz.end;
    }
  }

  // Need to calculate and cache a new start and end frequency.
  // Get and clean the start frequency
  var startFreqCheckedHz = this.getStartFreqHz();
  if (Number.isFinite(startFreqHz) && startFreqHz > 0) startFreqCheckedHz = startFreqHz;

  // Calculate the interval and end frequency
  var intervalDecimal = this.getAsDecimal();
  var endFreqHz = startFreqCheckedHz * intervalDecimal;

  // Cache the results for reuse
  this.freqHz.start = startFreqCheckedHz;
  this.freqHz.end = endFreqHz;

  return endFreqHz
}

module.exports = getEndFreqHz
