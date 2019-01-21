var toString = function toString() {
  var startText = 'Interval of ' + this.toFractionText();
  var endText = '';
  if (this.hasNotation()) {
    endText = ' from ' + this.getStartPitchNotation() + ' to ' + this.getEndPitchNotation();
  } else if (this.hasFreq()) {
    endText = ' from ' + this.getStartFreqHz() + ' to ' + this.getEndFreqHz();
  }
  return startText + endText;
};

module.exports = toString;
