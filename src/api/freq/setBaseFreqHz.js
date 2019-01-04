var setBaseFreqHz = function(baseFreqHz) {
  if (Number.isFinite(baseFreqHz) && baseFreqHz > 0) this.baseFreqHz = baseFreqHz
}

module.exports = setBaseFreqHz
