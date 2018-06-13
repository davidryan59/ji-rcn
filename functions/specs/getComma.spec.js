var assert = require('assert')
var Fraction = require('fraction.js')
var getComma = require('../getComma.js')

var defaultFractionArray = [1, 1]

var fnName = 'getComma'
describe(fnName, function() {

  var runTest = function(input, fractionArray, algType) {
    var actualResult = getComma(input, algType)
    var expectedResult = new Fraction(fractionArray)
    var typeText = ""
    if (algType) {
      typeText = ", " + algType
    }
    var label = fnName + "(" + input + typeText + ") returns " + expectedResult.toFraction()
    it(label, function() {
      assert.deepStrictEqual(actualResult, expectedResult)
    })
  }

  var testArray = [
    [1, defaultFractionArray]
  , [2, defaultFractionArray]
  , [3, defaultFractionArray]
  , [5, [80, 81]]
  , [7, [63, 64]]
  , [35, [35, 36]]
  , [143, [143, 144]]
  //, [169, [676, 729]]        // Require algorithm for composites
  //, [2197, [17576, 19683]]   // Require algorithm for composites
  , [139, [2224, 2187]]         // Default algorithm is DR
  , [139, [2224, 2187], "DR"]
  , [139, [139, 144], "SAG"]
  , [139, [139, 144], "DK"]
  , [139, [33777, 32768], "KG2"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2])
  }

})
