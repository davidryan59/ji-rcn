var removeAlg = require('../../properties/set/alg/removeAlg');
var setAlgPrivate = require('../../properties/set/alg/setAlgPrivate');
var refreshTuning = require('../../properties/set/tn/refreshTuning');

var setAlg = function setAlg(theAlg) {
  // theAlg has 3 possible formats, see private function for more info.
  // 1. Use private methods to update or remove algorithm
  theAlg ? setAlgPrivate(this, theAlg) : removeAlg(this);
  // 2. Tuning depends on other setup options, and must be refreshed
  refreshTuning(this);
  // 3. Position information may be invalid, .compress() removes it all
  this.compress();
};

module.exports = setAlg;
