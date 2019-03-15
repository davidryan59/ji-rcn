var getCommaMaxUnsplit = function getCommaMaxUnsplit() {
  return (this.set && this.set.ds && this.set.ds.cmx) ? this.set.ds.cmx : false;
};

module.exports = getCommaMaxUnsplit;
