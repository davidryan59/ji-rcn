var mult = function(otherJinote, power) {

  // Use Peo to do a multiplication
  var peo1 = this.peo
  var peo2 = otherJinote.peo
  var peoMult = peo1.mult(peo2, power)
  var JinoteConstructor = this.constructor
  var newJinote = new JinoteConstructor(peoMult)
  return newJinote

}

module.exports = mult
