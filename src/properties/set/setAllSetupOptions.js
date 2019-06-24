var setAlgPrivate = require('./alg/setAlgPrivate');
var setTuningPrivate = require('./tn/setTuningPrivate');
var setDisplayPrivate = require('./disp/setDisplayPrivate');

var setAllSetupOptions = function setAllSetupOptions(jint, theOptions) {
  setAlgPrivate(jint, theOptions.alg);
  setDisplayPrivate(jint, theOptions.display);
  // MUST do setTuningPrivate after setAlgPrivate
  setTuningPrivate(jint, theOptions.tuning);
};

module.exports = setAllSetupOptions;
