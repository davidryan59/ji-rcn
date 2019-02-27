var setAlg = require('./setAlg');
var setTuning = require('./setTuning');
var setDisplay = require('./setDisplay');

var setAllSetupOptions = function setAllSetupOptions(jint, theOptions) {
  // Alg first
  var setupAlgObject = theOptions.alg;
  if (setupAlgObject) setAlg(jint, setupAlgObject);

  // Tuning second - affected by choice of algorithm
  var setupTuningObject = theOptions.tuning;
  if (setupTuningObject) setAlg(jint, setupTuningObject);

  // Display options third
  // These will affect pos which is calculated when initialising from notations
  // so has to be done before setting width.
  var setupDisplayObject = theOptions.display;
  if (setupDisplayObject) setAlg(jint, setupDisplayObject);
};

module.exports = setAllSetupOptions;
