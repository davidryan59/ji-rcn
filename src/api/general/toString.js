var toString = function toString() {
  var width = this.widthFractionText()
  if (width==='NA') width = this.width()
  var startText = 'Interval of ' + width;
  var endText = '';
  if (this.hasPos()) {
    endText = ' from ' + this.getStartPitchNotation() + ' to ' + this.getEndPitchNotation();
  }
  return startText + endText;
};

module.exports = toString;
