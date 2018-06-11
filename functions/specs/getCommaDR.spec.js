var assert = require('assert')
var Fraction = require('fraction.js')
var getCommaDR = require('../getCommaDR.js')

var fnName = 'getCommaDR'
describe(fnName, function() {

  var runTest = function(prime, fractionArray) {
    var actualResult = getCommaDR(prime)
    var expectedResult = Fraction(fractionArray)
    var label = fnName + "(" + prime + ") returns " + expectedResult.toFraction()
    it(label, function() {
      assert.deepStrictEqual(actualResult, expectedResult)
    })
  }

  // Lots of tests (DR algorithm)
  // Many of these inputs are listed in the online paper
  var testArray = [
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
  , [139, [2224, 2187]]
  , [149, [4023, 4096]]
  , [151, [4077, 4096]]
  , [179, [716, 729]]
  , [181, [724, 729]]
  , [257, [257, 256]]
  , [2203, [2203, 2187]]
  , [45077, [135231, 131072]]
  , [59051, [59051, 59049]]
  , [65537, [65537, 65536]]
  , [2499949, [2499949, 2519424]]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
