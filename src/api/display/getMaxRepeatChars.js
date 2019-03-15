var getMaxRepeatChars = function getMaxRepeatChars() {
  var disp = this.set.ds;
  if (disp && disp.rps) return disp.rps;
  return false;
};

module.exports = getMaxRepeatChars;
