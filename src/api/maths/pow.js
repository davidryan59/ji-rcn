var pow = function(power) {

  // Use Peo to provide a power
  var peo = this.peo
  var peoPower = peo.pow(power)
  var JIntervalConstructor = this.constructor
  var newJInterval = new JIntervalConstructor(peoPower)
  return newJInterval

}

module.exports = pow
