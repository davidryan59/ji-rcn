var calcCents = function calcCents(decimalNumber) {
  // Turn a decimalNumber into a number of cents
  var val = Math.abs(decimalNumber);
  return 1200 * Math.log(val) / Math.log(2);
};

module.exports = calcCents;
