var mult = function(otherJInterval, power) {

  // Use Peo to do a multiplication
  var peo1 = this.peo
  var peo2 = otherJInterval.peo
  var peoMult = peo1.mult(peo2, power)
  var JIntervalConstructor = this.constructor
  var newJInterval = new JIntervalConstructor(peoMult)
  return newJInterval

}

module.exports = mult
