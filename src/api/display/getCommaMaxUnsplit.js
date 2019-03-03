var getCommaMaxUnsplit = function getCommaMaxUnsplit() {
  var disp = this.setup.disp;
  if (disp && disp.comMax) return disp.comMax;
  return false;
};

module.exports = getCommaMaxUnsplit;
