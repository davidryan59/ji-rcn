var setAlgPrivate = require('./alg/setAlgPrivate');
var setTuningPrivate = require('./tn/setTuningPrivate');
var setDisplayPrivate = require('./disp/setDisplayPrivate');

var setAllSetupOptions = function setAllSetupOptions(jint, theOptions) {
  setAlgPrivate(jint, theOptions.alg);
  setDisplayPrivate(jint, theOptions.display);
  // Algorithm affects parsing, which affects tuning,
  // so algorithm MUST be set before tuning.
  // Display affects only output format, so can be done independently
  setTuningPrivate(jint, theOptions.tuning);
};

module.exports = setAllSetupOptions;
