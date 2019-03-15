var getMaxRepeatChars = function getMaxRepeatChars() {
  return (this.set && this.set.ds && this.set.ds.rps) ? this.set.ds.rps : false;
};

module.exports = getMaxRepeatChars;
