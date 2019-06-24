var createJIntervalWithSetup = require('../../initialisers/createJIntervalWithSetup');

// Return JInterval with frequency ratio equal to product of
// frequency ratio of this interval and
// frequency ratio of another interval (optionally to a specified power)
// Use .mult on Peo to achieve the multiplication
var mult = function mult(otherJInterval, power) {
  return createJIntervalWithSetup(this, {peo: this.ratioPeo().mult(otherJInterval.ratioPeo(), power)});
};

module.exports = mult;
