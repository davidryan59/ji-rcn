var createJIntervalWithSetup = require('../../initialisers/createJIntervalWithSetup');

// Return JInterval with frequency ratio to a specified power
// Use .pow on Peo to achieve the power
var pow = function pow(power) {
  return createJIntervalWithSetup(this, {peo: this.ratioPeo().pow(power)});
};

module.exports = pow;
