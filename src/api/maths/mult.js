var mathsFnJIntervalCreator = require('../../maths/mathsFnJIntervalCreator');

// Return JInterval with frequency ratio (width) equal to product of
// frequency ratio of this interval and
// frequency ratio of another interval (optionally to a specified power)
// Use .mult on Peo to achieve the multiplication
var mult = function mult(otherJInterval, power) {
  return mathsFnJIntervalCreator(this, {peo: this.peo.mult(otherJInterval.peo, power)});
};

module.exports = mult;
