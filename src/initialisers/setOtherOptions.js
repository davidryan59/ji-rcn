var setTuning = require('../tuning/setTuning');

var setOtherOptions = function setOtherOptions(jint, theOptions) {
  // Do specific things to object initialisation
  if (theOptions.tuning) {
    setTuning(jint, theOptions.tuning);
  }
};

module.exports = setOtherOptions;
