var removeTuning = require('../../setup/removeTuning');
var setTuningPrivate = require('../../setup/setTuningPrivate');

var setTuning = function setTuning(theTuning) {
  // theTuning is an object of format {pitchNotation:'C4', freqHz:256}
  // 1. Use private methods to update or remove tuning
  theTuning ? setTuningPrivate(this, theTuning) : removeTuning(this);
  // 2. Position information may be invalid, .compress() removes it all
  this.compress();
};

module.exports = setTuning;
