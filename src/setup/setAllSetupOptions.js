var setAlgPrivate = require('./setAlgPrivate');
var setTuningPrivate = require('./setTuningPrivate');
var setDisplayPrivate = require('./setDisplayPrivate');

var setAllSetupOptions = function setAllSetupOptions(jint, theOptions) {
  setAlgPrivate(jint, theOptions.alg);
  setDisplayPrivate(jint, theOptions.display);
  // MUST do setTuningPrivate after setAlgPrivate
  setTuningPrivate(jint, theOptions.tuning);
};

module.exports = setAllSetupOptions;
