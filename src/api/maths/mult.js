var Peo = require('peo');

var createJIntervalWithSetup = require('../../initialisers/createJIntervalWithSetup');

// Return JInterval with frequency ratio equal to product of
// frequency ratio of this interval and
// frequency ratio of another interval (optionally to a specified power)
// Use .mult on Peo to achieve the multiplication
var mult = function mult(arg, power) {
  var thePeo = null;
  if (arg && arg.constructor.name === 'Peo') thePeo = arg;
  if (arg && arg.constructor.name === 'JInterval') thePeo = arg.ratioPeo();
  if (!thePeo) thePeo = new Peo(1);
  return createJIntervalWithSetup(this, {peo: this.ratioPeo().mult(thePeo, power)});
};

module.exports = mult;
