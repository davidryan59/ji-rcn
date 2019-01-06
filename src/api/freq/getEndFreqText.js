var getEndFreqText = function(startFreqHz) {
  var endFreqHz = this.getEndFreqHz(startFreqHz)
  var roundedEndFreqHz = Math.round(endFreqHz * 100) * 0.01     // 2 dps
  return "" + roundedEndFreqHz + " Hz"
}

module.exports = getEndFreqText
