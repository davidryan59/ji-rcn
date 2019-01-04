var getFreqText = function() {
  var freqHz = this.getFreqHz()
  var roundedFreqHz = Math.round(freqHz * 100) * 0.01     // 2 dps
  return "" + roundedFreqHz + " Hz"
}

module.exports = getFreqText
