var toString = function toString() {
  var startText = 'Interval of ' + this.toFractionText();
  var endText = '';
  if (this.hasNotation()) {
    endText = ' from ' + this.getStartPitchNotation() + ' to ' + this.getEndPitchNotation();
  }
  return startText + endText;
};

module.exports = toString;
