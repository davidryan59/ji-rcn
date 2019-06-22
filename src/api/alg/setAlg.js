var removeAlg = require('../../setup/removeAlg');
var setAlgPrivate = require('../../setup/setAlgPrivate');
var refreshTuning = require('../../setup/refreshTuning');

var setAlg = function setAlg(theAlg) {
  // theAlg has 3 possible formats, see private function for more info.
  // 1. Use private method to update algorithm for this JInterval
  if (!theAlg) {
    removeAlg(this);
  } else {
    setAlgPrivate(this, theAlg);
  }
  // 2. Tuning depends on other setup options, and must be refreshed
  refreshTuning(this);
  // 3. Position depends on all setup options, so force recalculation by compressing
  this.compress();
};

module.exports = setAlg;
