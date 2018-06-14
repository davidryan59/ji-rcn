var assert = require('assert')
var Fraction = require('fraction.js')

var getPythag = require('../getPythag.js')

var fnName = 'getPythag'
describe(fnName, function() {

  var runTest = function(input, fractionArray, algType, comment) {
    var inputFraction = new Fraction(input)
    var actualResult = getPythag(input, algType)
    var expectedResult = new Fraction(fractionArray)
    var typeText = (algType) ? ", " + algType : ""
    var commentText = (comment) ? "   (" + comment + ")" : ""
    var label = fnName + "(" + input + typeText + ") = " + expectedResult.toFraction() + commentText
    it(label, function() {
      assert.deepStrictEqual(actualResult, expectedResult)
    })
  }

  var testArray = [
    [1, 1]
  , [2, 2]
  , [3, 3]
  , [5, "81/16"]
  , [7, [64, 9]]
  , [35, 36]
  , [125, 531441/4096]
  , [143, 144]
  , [169, [729, 4]]
  , [139, "2187/16",,"default algorithm is DR"]
  , [139, [2187, 16], "DR"]
  , [139, 144, "SAG"]
  , [139, "144/1", "DK"]
  , [139, [32768, 243], "KG2"]
  , [2197, "19683/8"]
  , [2310, 2304]
  , ["1925/247", [243, 32]]
  , [[65, 77], [59049, 65536]]
  , [[55, 91], "9/16"]
  , [59051, 59049]
  , [65537, 65536]
  , [2499949, 2519424]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2], testArray[i][3])
  }

})
