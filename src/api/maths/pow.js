// Put a JInterval to an integer power, which means repeat it that many times.
var pow = function pow(power) {
  // Use Peo to provide a power
  var thisPeo = this.peo;
  var newPeo = thisPeo.pow(power);
  // Use the constructor to make a new JInterval based on newPeo
  var JIntervalConstructor = this.constructor;
  var newJInterval = new JIntervalConstructor(newPeo);
  return newJInterval;
};

module.exports = pow;
