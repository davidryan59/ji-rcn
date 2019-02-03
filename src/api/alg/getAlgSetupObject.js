var getAlgSetupObject = function getAlgSetupObject() {
  if (!this.hasAlg()) return null;
  return {
    txt: this.getAlgText(),
    fn: this.getAlgFn()
  };
};

module.exports = getAlgSetupObject;
