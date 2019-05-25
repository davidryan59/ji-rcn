var mathsFnJIntervalCreator = require('../../maths/mathsFnJIntervalCreator');

// Return JInterval with frequency ratio to a specified power
// Use .pow on Peo to achieve the power
var pow = function pow(power) {
  return mathsFnJIntervalCreator(this, {peo: this.ratioPeo().pow(power)});
};

module.exports = pow;
