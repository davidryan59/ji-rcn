var setAlg = require('./setAlg');
var setTuning = require('./setTuning');
var setDisplay = require('./setDisplay');

var setAllSetupOptions = function setAllSetupOptions(jint, theOptions) {
  setAlg(jint, theOptions.alg);
  setDisplay(jint, theOptions.display);
  // MUST do setTuning after setAlg
  setTuning(jint, theOptions.tuning);
};

module.exports = setAllSetupOptions;
