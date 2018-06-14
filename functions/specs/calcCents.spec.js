var assert = require('assert')
var Fraction = require('fraction.js')

var calcCents = require('../calcCents.js')

var fnName = 'calcCents'
describe(fnName, function() {
  var tolerance = 1e-3

  var runTest = function(fractionArray, cents) {
    var fraction = new Fraction(fractionArray)
    var actualResult = calcCents(fraction)
    var expectedResult = cents
    var label = fnName + "(" + fraction.toFraction() + ") = " + expectedResult
    it(label, function() {
      assert(Math.abs(expectedResult-actualResult)<tolerance)
    })
  }

  var testArray = [
    [[1, 1], 0]
  , [[-1, 1], 0]
  , [[2, 1], 1200]
  , [[1, 16], -4800]
  , [[3, 2], 701.955]       // 701.9550008653874
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
