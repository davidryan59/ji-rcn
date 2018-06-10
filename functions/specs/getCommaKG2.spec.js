var assert = require('assert')
var Fraction = require('fraction.js')
var getCommaKG2 = require('../getCommaKG2.js')

describe('getCommaKG2', function() {

  // detailed test
  it("Gives 33777/32768 for prime 139 (KG2 algorithm)", function() {
    var actualResult = getCommaKG2(139)
    var expectedResult = Fraction(33777, 32768)
    assert.deepStrictEqual(actualResult, expectedResult)
  })

  // lots of tests (KG2 algorithm)
  it("Testing many inputs (KG2 algorithm)", function() {
    // These inputs are listed in the online paper
    var arr = [
      [5, [80, 81]]
    , [7, [63, 64]]
    , [11, [704, 729]]
    , [13, [1053, 1024]]
    , [17, [4131, 4096]]
    , [19, [513, 512]]
    , [23, [16767, 16384]]
    , [29, [261, 256]]
    , [31, [248, 243]]
    , [37, [999, 1024]]
    , [41, [82, 81]]
    , [43, [129, 128]]
    , [47, [47, 48]]
    , [53, [53, 54]]
    , [59, [236, 243]]
    , [61, [244, 243]]
    , [67, [16281, 16384]]
    , [71, [71, 72]]
    , [73, [73, 72]]
    , [79, [79, 81]]
    , [83, [249, 256]]
    , [89, [712, 729]]
    , [97, [97, 96]]
    ]
    for (var i=0; i<arr.length; i++) {
      var p = arr[i][0]
      var actualValue = getCommaKG2(p)
      var expectedValue = Fraction(arr[i][1])
      var msg = "For " + p + " got " + actualValue + " but expected " + expectedValue
      assert.deepStrictEqual(actualValue, expectedValue, msg)
    }
  })

})
