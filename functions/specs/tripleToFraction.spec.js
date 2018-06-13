var assert = require('assert')
var Fraction = require('fraction.js')

var tripleToFraction = require('../tripleToFraction.js')

var fnName = 'tripleToFraction'
describe(fnName, function() {

  var runTest = function(inputArray, fractionArray) {
    var actualResult = tripleToFraction(inputArray[0], inputArray[1], inputArray[2])
    var expectedResult = new Fraction(fractionArray)
    var label = fnName + "(" + inputArray + ") returns " + expectedResult.toFraction()
    it(label, function() {
      assert.deepStrictEqual(actualResult, expectedResult)
    })
  }

  var testArray = [
    [[1, 0, 0], [1, 1]]
  , [[1, 1, -1], [2, 3]]
  , [[127, -7, 0], [127, 128]]
  , [[23, 0, -3], [23, 27]]
  , [[5, 4, -4], [80, 81]]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
