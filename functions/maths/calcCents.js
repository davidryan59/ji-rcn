var calcCents = function(fraction) {
  // Turn a fraction (from fraction.js package) into a number of cents

  var val = Math.abs(fraction.valueOf())
  return 1200 * Math.log(val) / Math.log(2)

}

module.exports = calcCents
