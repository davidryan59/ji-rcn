var copy = function copy() {
  // Return a copy of this JInterval, with same options via initialising on the original
  var JIntervalConstructor = this.constructor;
  var copyJint = new JIntervalConstructor(this);
  return copyJint;
};

module.exports = copy;
