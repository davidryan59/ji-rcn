var getMaxRepeatChars = function getMaxRepeatChars() {
  var disp = this.set.disp;
  if (disp && disp.reps) return disp.reps;
  return false;
};

module.exports = getMaxRepeatChars;
