// Return an identity JInterval, representing an interval of unison, 1/1
var get1 = function() {
  var JIntervalConstructor = this.constructor
  return new JIntervalConstructor()
}

module.exports = get1
