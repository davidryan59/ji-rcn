var assert = require('assert')
var Fraction = require('fraction.js')
var getCommaDR = require('../getCommaDR.js')

describe('getCommaDR', function() {

  // detailed test
  it("Gives 2224/2187 for prime 139 (DR algorithm)", function() {
    var actualResult = getCommaDR(139)
    var expectedResult = Fraction(2224, 2187)
    assert.deepStrictEqual(actualResult, expectedResult)
  })

  // lots of tests (DR algorithm)
  it("Testing many inputs (DR algorithm)", function() {
    // These inputs are listed in the online paper
    var arr = [
      [5, [80, 81]]
    , [7, [63, 64]]
    , [11, [33, 32]]
    , [13, [26, 27]]
    , [17, [2176, 2187]]
    , [19, [513, 512]]
    , [23, [736, 729]]
    , [29, [261, 256]]
    , [31, [31, 32]]
    , [37, [37, 36]]
    , [41, [82, 81]]
    , [43, [129, 128]]
    , [47, [47, 48]]
    , [53, [53, 54]]
    , [59, [236, 243]]
    , [61, [244, 243]]
    , [67, [2144, 2187]]
    , [71, [71, 72]]
    , [73, [73, 72]]
    , [79, [79, 81]]
    , [83, [83, 81]]
    , [89, [712, 729]]
    , [97, [97, 96]]
    ]
    for (var i=0; i<arr.length; i++) {
      var p = arr[i][0]
      var actualValue = getCommaDR(p)
      var expectedValue = Fraction(arr[i][1])
      var msg = "For " + p + " got " + actualValue + " but expected " + expectedValue
      assert.deepStrictEqual(actualValue, expectedValue, msg)
    }
  })

})
