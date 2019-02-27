var getSetupObject = function getSetupObject() {
  var result = {};

  var setupAlgObject = this.getSetupAlgObject();
  if (setupAlgObject) result.alg = setupAlgObject;

  var setupDisplayObject = this.getSetupDisplayObject();
  if (setupDisplayObject) result.display = setupDisplayObject;

  var setupTuningObject = this.getSetupTuningObject();
  if (setupTuningObject) result.tuning = setupTuningObject;

  return result;
};

module.exports = getSetupObject;
