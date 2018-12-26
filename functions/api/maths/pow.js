var pow = function(power) {

  // Use Peo to provide a power
  var peo = this.peo
  var peoPower = peo.pow(power)
  var JinoteConstructor = this.constructor
  var newJinote = new JinoteConstructor(peoPower)
  return newJinote

}

module.exports = pow
