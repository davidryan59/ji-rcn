// fraction is a Fraction (from fraction.js package)

var calcCents = function(fraction) {

  var val = Math.abs(fraction.valueOf())
  return 1200 * Math.log(val) / Math.log(2)

}

module.exports = calcCents
