var getSetupObject = function getSetupObject() {
  var result = {};

  var setupAlgObject = this.getSetupAlgObject();
  if (setupAlgObject) result.alg = setupAlgObject;

  var setupTuningObject = this.getSetupTuningObject();
  if (setupTuningObject) result.tuning = setupTuningObject;

  var setupDisplayObject = this.getSetupDisplayObject();
  if (setupDisplayObject) result.display = setupDisplayObject;

  return result;
};

module.exports = getSetupObject;
