var toString = function toString() {
  var intervalDescription = this.ratioFractionText();
  if (intervalDescription === 'NA') intervalDescription = this.ratio();
  var startText = 'Interval of ' + intervalDescription;
  var endText = '';
  if (this.hasPos()) {
    endText = ' from ' + this.getStartPitchNotation() + ' to ' + this.getEndPitchNotation();
  }
  return startText + endText;
};

module.exports = toString;
