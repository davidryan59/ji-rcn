var removeDisplay = require('../../properties/set/disp/removeDisplay');
var setDisplayPrivate = require('../../properties/set/disp/setDisplayPrivate');

var setDisplay = function setDisplay(theDisplay) {
  // theDisplay is an object with several options, see private function for more info.
  // 1. Use private methods to update or remove display options
  theDisplay ? setDisplayPrivate(this, theDisplay) : removeDisplay(this);
  // 2. Position information may be invalid, .compress() removes it all
  this.compress();
};

module.exports = setDisplay;
