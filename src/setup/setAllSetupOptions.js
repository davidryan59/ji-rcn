var setAlg = require('./setAlg');
var setTuning = require('./setTuning');
var setDisplay = require('./setDisplay');

var setAllSetupOptions = function setAllSetupOptions(jint, theOptions) {
  setAlg(jint, theOptions.alg);
  setDisplay(jint, theOptions.display);
  setTuning(jint, theOptions.tuning);    // Must be done AFTER alg
};

module.exports = setAllSetupOptions;
