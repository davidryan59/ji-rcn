var assert = require('assert')
var Fraction = require('fraction.js')
var getCommaSAG = require('../getCommaSAG.js')

describe('getCommaSAG', function() {

  // detailed test
  it("Gives 139/144 for prime 139 (SAG algorithm)", function() {
    var actualResult = getCommaSAG(139)
    var expectedResult = Fraction(139, 144)
    assert.deepStrictEqual(actualResult, expectedResult)
  })

})
