var getFreqHz = function() {
  return (this.peo.getVal()) * (this.getBaseFreqHz())
}

module.exports = getFreqHz
