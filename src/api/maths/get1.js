// Return an identity JInterval, representing a JInterval on 1/1
var get1 = function() {
  var JIntervalConstructor = this.constructor
  return new JIntervalConstructor()
}

module.exports = get1
