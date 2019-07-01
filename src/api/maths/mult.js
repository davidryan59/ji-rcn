var Peo = require('peo');

var createJIntervalWithSetup = require('../../initialisers/createJIntervalWithSetup');

// Return a new JInterval with frequency ratio that is
// frequency ratio of this JInterval
// multiplied by another frequency ratio, to an optional power
var mult = function mult() {
  // Handle these cases:
  // 1. mult(JInterval[, power])
  // 2. mult(num[, denom[, power]])
  // 3. mult(otherInput[, power])
  // where power is any integer, also optional in every case,
  // num, denom are positive integers for case 2,
  // otherInput has various formats in case 3, from new Peo(item, power)
  var arg0 = arguments[0];
  var arg1 = arguments[1];
  var arg2 = arguments[2];
  var multPeo = null;
  if (arg0 && arg0.constructor.name === 'JInterval') {
    // Case 1a: arg0 is JInterval. Use its peo for the mult.
    multPeo = arg0.ratioPeo().pow(arg1);
  } else if (Number.isInteger(arg0) && arg0 > 0) {
    // Case 2: arg0 is positive integer
    if (Number.isInteger(arg1) && arg1 > 0) {
      // Case 2a: power of fraction
      multPeo = new Peo(arg0, arg1, arg2);   // (arg0 / arg1) ^ arg2
    } else {
      // Case 2b: power of integer
      multPeo = new Peo(arg0, 1, arg2);      // arg0 ^ arg2
    }
  } else if (!!arg0) {
    // Case 3: Anything else. Use Peo constructor to handle it.
    multPeo = new Peo(arg0, arg1);
  } else {
    // Case 4: no args supplied
    return this;
  }
  return createJIntervalWithSetup(this, {peo: this.ratioPeo().mult(multPeo)});
};

module.exports = mult;
