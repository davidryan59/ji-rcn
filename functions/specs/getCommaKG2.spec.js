var assert = require('assert')
var Fraction = require('fraction.js')

var getCommaKG2 = require('../getCommaKG2.js')

var fnName = 'getCommaKG2'
describe(fnName, function() {

  var runTest = function(prime, fractionArray) {
    var actualResult = getCommaKG2(prime)
    var expectedResult = new Fraction(fractionArray)
    var label = fnName + "(" + prime + ") returns " + expectedResult.toFraction()
    it(label, function() {
      assert.deepStrictEqual(actualResult, expectedResult)
    })
  }

  // Lots of tests (KG2 algorithm)
  // Many of these inputs are listed in the online paper
  var testArray = [
    [1, [1, 1]]
  , [2, [1, 1]]
  , [3, [1, 1]]
  , [5, [80, 81]]
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
  , [139, [33777, 32768]]
  , [257, [257, 256]]
  , [2203, [535329, 524288]]
  , [45077, [45077, 46656]]
  , [59051, [531459, 524288]]
  , [65537, [65537, 65536]]
  , [2499949, [67498623, 67108864]]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
