var getSetupAlgObject = function getSetupAlgObject() {
  if (!this.hasAlg()) return null;
  return {
    txt: this.getAlgText(),
    fn: this.getAlgFn()
  };
};

module.exports = getSetupAlgObject;
