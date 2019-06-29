var setRatioPrivate = require('../../initialisers/setRatioPrivate');

var setRatio = function setRatio() {
  // 1. If no arguments supplied, do nothing
  if (arguments.length < 1) return;
  // 2. Keep track of previous ratio
  var prevPeo = this.peo;
  // 3. Attempt to change ratio
  setRatioPrivate(this, arguments);
  // 4. Compare numeric values of previous and new peos
  var newPeo = this.peo;
  if (prevPeo.equals(newPeo)) {
    // 4a. Ratio hasn't changed. Keep previous peo which might have useful cached info
    this.peo = prevPeo;
  } else {
    // 4b. Ratio has changed. Remove any information that might be out of date
    this.compress();
  }
};

module.exports = setRatio;
