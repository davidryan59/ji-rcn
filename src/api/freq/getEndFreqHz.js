var getEndFreqHz = function(inputtedStartFreqHz) {
  // Given a start frequency for a JInterval:
  // - Return the end frequency, if answer is already cached
  // - Otherwise calculate the end frequency from the start frequency and interval width

  // Check if correct result has been cached. If so, return it.
  if (this.freqHz.start) {
    // There is a cached result
    if (inputtedStartFreqHz === this.freqHz.start) {
      // Asking for same cached result. Return it.
      return this.freqHz.end;
    } else if (!inputtedStartFreqHz) {
      // No inputtedStartFreqHz specified. Repeat previous result
      return this.freqHz.end;
    }
  }

  // Need to calculate and cache a new start and end frequency.
  // Get and clean the start frequency
  var startFreqCheckedHz = this.getStartFreqHz();
  if (Number.isFinite(inputtedStartFreqHz) && inputtedStartFreqHz > 0) startFreqCheckedHz = inputtedStartFreqHz;

  // Calculate the interval and end frequency
  var intervalDecimal = this.toDecimal();
  var endFreqHz = startFreqCheckedHz * intervalDecimal;

  // Cache the results for reuse
  this.freqHz.start = startFreqCheckedHz;
  this.freqHz.end = endFreqHz;

  return endFreqHz
}

module.exports = getEndFreqHz
