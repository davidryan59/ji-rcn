var copy = function copy() {
  // The constructor initialised from a JInterval copies the JInterval
  var copyJInterval = new this.constructor(this);
  return copyJInterval;
};

module.exports = copy;
