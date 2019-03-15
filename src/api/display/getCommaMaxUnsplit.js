var getCommaMaxUnsplit = function getCommaMaxUnsplit() {
  var disp = this.set.ds;
  if (disp && disp.cmx) return disp.cmx;
  return false;
};

module.exports = getCommaMaxUnsplit;
