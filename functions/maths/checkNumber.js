var checkNumber = function(input, limit) {

  // Check an input is numeric and bounded
  return Number.isFinite(input) && Math.abs(input)<=(limit||1e15)

}

module.exports = checkNumber
