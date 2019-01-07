var toString = function() {
  var endNotation = this.getEndPitchNotation();
  var startNotation = this.getStartPitchNotation();
  var fractionText = this.toFractionText();
  return "Interval of " + fractionText + " from " + startNotation + " to " + endNotation;
}

module.exports = toString
