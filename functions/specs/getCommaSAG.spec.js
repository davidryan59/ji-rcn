var assert = require('assert')
var Fraction = require('fraction.js')
var getCommaSAG = require('../getCommaSAG.js')

var fnName = 'getCommaSAG'
describe(fnName, function() {

  var runTest = function(prime, fractionArray) {
    var actualResult = getCommaSAG(prime)
    var expectedResult = Fraction(fractionArray)
    var label = fnName + "(" + prime + ") returns " + expectedResult.toFraction()
    it(label, function() {
      assert.deepStrictEqual(actualResult, expectedResult)
    })
  }

  // Lots of tests (SAG algorithm)
  // Many of these inputs are listed in the online paper
  var testArray = [
    [5, [80, 81]]
  , [7, [63, 64]]
  , [11, [33, 32]]
  , [13, [26, 27]]
  , [17, [4131, 4096]]
  , [19, [513, 512]]
  , [23, [736, 729]]
  , [29, [261, 256]]
  , [31, [31, 32]]
  , [37, [37, 36]]
  , [41, [82, 81]]
  , [43, [129, 128]]
  , [47, [47, 48]]
  , [53, [53, 54]]
  , [59, [531, 512]]
  , [61, [244, 243]]
  , [67, [16281, 16384]]
  , [71, [71, 72]]
  , [73, [73, 72]]
  , [79, [79, 81]]
  , [83, [249, 256]]
  , [89, [64881, 65536]]
  , [97, [97, 96]]
  , [139, [139, 144]]
  , [257, [257, 256]]
  , [2203, [535329, 524288]]
  , [45077, [135231, 131072]]
  , [59051, [531459, 524288]]
  , [65537, [65537, 65536]]
  , [2499949, [67498623, 67108864]]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
