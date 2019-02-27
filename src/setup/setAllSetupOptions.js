var setAlg = require('./setAlg');
var setTuning = require('./setTuning');
var setDisplay = require('./setDisplay');

var setAllSetupOptions = function setAllSetupOptions(jint, theOptions) {
  // Extract from theOptions each setup item of relevance
  // and pass them to another function to handle

  // Alg first
  var theAlg = theOptions.alg;
  if (theAlg) setAlg(jint, theAlg);

  // Display second
  var theDisplay = theOptions.display;
  if (theDisplay) setDisplay(jint, theDisplay);

  // Tuning third
  // (MUST be done AFTER alg)
  var theTuning = theOptions.tuning;
  if (theTuning) setTuning(jint, theTuning);
};

module.exports = setAllSetupOptions;
