var assert = require('assert')
var Fraction = require('fraction.js')

var getComma = require('../getComma.js')

var fnName = 'getComma'
describe(fnName, function() {

  var runTest = function(input, fractionArray, algType, comment) {
    var inputFraction = new Fraction(input)
    var actualResult = getComma(input, algType)
    var expectedResult = new Fraction(fractionArray)
    var typeText = (algType) ? ", " + algType : ""
    var commentText = (comment) ? "   (" + comment + ")" : ""
    var label = fnName + "(" + input + typeText + ") = " + expectedResult.toFraction() + commentText
    it(label, function() {
      assert.deepStrictEqual(actualResult, expectedResult)
    })
  }

  var testArray = [
    [1, [1, 1]]
  , [2, [1, 1]]
  , [3, [1, 1]]
  , [5, [80, 81]]
  , [new Fraction(5), [80, 81]]
  , [7, [63, 64]]
  , [35, [35, 36],,"from 5*7"]
  , [125, [80*80*80, 81*81*81],,"from 5^3"]
  , [143, [143, 144],,"from 11*13"]
  , [169, [676, 729],,"from 13*13"]
  , [139, [2224, 2187],,"default algorithm is DR"]
  , [139, [2224, 2187], "DR"]
  , [139, [139, 144], "SAG"]
  , [139, [139, 144], "DK"]
  , [139, [33777, 32768], "KG2"]
  , [2197, [17576, 19683],,"from 13*13*13"]
  , [2310, [80*63*33, 81*64*32],,"from 2*3*5*7*11"]
  , ["1/1", [1, 1]]
  , ["1/2", [1, 1]]
  , ["2/1", [1, 1]]
  , ["5/1", [80, 81]]
  , ["1/7", [64, 63]]
  , ["7/5", [5103, 5120]]
  , [new Fraction("7/5"), [5103, 5120],,"uses Fraction('7/5')"]
  , [new Fraction(7, 5), [5103, 5120],,"uses Fraction(7, 5)"]
  , [new Fraction([7, 5]), [5103, 5120],,"uses Fraction([7, 5]])"]
  , ["1925/247", [61600, 60021],,"from 5*5*7*11 / (13*19)"]
  , [[5*13,7*11], [80*26*64*32, 81*27*63*33],,"from 5*13/(7*11)"]
  , [[5*11,7*13], [80*27*64*33, 81*26*63*32],,"from 5*11/(7*13)"]
  , [45077, [135231, 131072]]
  , [59051, [59051, 59049]]
  , [65537, [65537, 65536]]
  , [2499949, [2499949, 2519424]]
  , ["2499949/65537", [2499949*65536, 2519424*65537]]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2], testArray[i][3])
  }

})
