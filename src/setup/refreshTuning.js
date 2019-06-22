var setTuningPrivate = require('./setTuningPrivate');

var refreshTuning = function refreshTuning(jint) {
  setTuningPrivate(jint, jint.getSetupTuningObject());
};

module.exports = refreshTuning;
