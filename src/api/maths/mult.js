// Multiply one JInterval by another, optionally to a power (repeated that many times)
var mult = function mult(otherJInterval, power) {
  // Use Peo to do a multiplication
  var thisPeo = this.peo;
  var thatPeo = otherJInterval.peo;
  var peoMult = thisPeo.mult(thatPeo, power);
  // Use the constructor to make a new JInterval based on peoMult
  var JIntervalConstructor = this.constructor;
  var newJInterval = new JIntervalConstructor(peoMult);
  return newJInterval;
};

module.exports = mult;
