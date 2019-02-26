var getOptionsSetupObject = function getOptionsSetupObject() {
  var tuningSetupObject = this.getTuningSetupObject();
  var algSetupObject = this.getAlgSetupObject();
  var result = {};
  if (algSetupObject) result.alg = algSetupObject;
  if (tuningSetupObject) result.tuning = tuningSetupObject;
  return result;
};

module.exports = getOptionsSetupObject;
