var getFreqText = require('./getFreqText');

var recalcStartAndEndFrequencies = function recalcStartAndEndFrequencies(jint, inputStartFreqHz) {
  // Given a start frequency for a JInterval:
  // - Return the end frequency, if answer is already cached
  // - Otherwise calculate the end frequency from the start frequency and interval width

  // Check if correct result has been cached. If so, return it.
  if (jint.freq && jint.freq.start && jint.freq.end && jint.freq.start.hz) {
    // There is a cached result
    if (inputStartFreqHz === jint.freq.start.hz) {
      // Asking for same cached result. Return it.
      return jint.freq.end;
    } else if (!inputStartFreqHz) {
      // No inputStartFreqHz specified. Repeat previous result
      return jint.freq.end;
    }
  }

  // Need to calculate and cache a new start and end frequency.
  // Get and clean the start frequency
  var startFreqCheckedHz = jint.getStartFreqHz();
  if (Number.isFinite(inputStartFreqHz) && inputStartFreqHz > 0) startFreqCheckedHz = inputStartFreqHz;

  // Calculate the interval and end frequency
  var intervalDecimal = jint.toDecimal();
  var endFreqHz = startFreqCheckedHz * intervalDecimal;

  // Cache the results for reuse
  jint.freq = {};
  jint.freq.start = {};
  jint.freq.end = {};
  // Start freqs
  jint.freq.start.hz = startFreqCheckedHz;
  jint.freq.start.txt = getFreqText(startFreqCheckedHz);
  // End freqs
  jint.freq.end.hz = endFreqHz;
  jint.freq.end.txt = getFreqText(endFreqHz);

  return jint.freq.end;
};

module.exports = recalcStartAndEndFrequencies;
