var assert = require('assert')
var Fraction = require('fraction.js')
var calcCents = require('../calcCents.js')

var tolerance = 1e-3

var fnName = 'calcCents'
describe(fnName, function() {

  var runTest = function(fractionArray, cents) {
    var fraction = Fraction(fractionArray)
    var actualResult = calcCents(fraction)
    var expectedResult = cents
    var label = fnName + "(" + fraction.toFraction() + ") returns " + expectedResult
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

  // Run all of these test cases
  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }



  // it("1/1", function() {
  //   assert.strictEqual(calcCents(Fraction(1,1)), 0)
  // })
  // it("-1/1", function() {
  //   assert.strictEqual(calcCents(Fraction(-1,1)), 0)
  // })
  // it("2/1", function() {
  //   assert.strictEqual(calcCents(Fraction(2, 1)), 1200)
  // })
  // it("1/16", function() {
  //   assert.strictEqual(calcCents(Fraction(1, 16)), -4800)
  // })
  // it("3/2", function() {
  //   var expected = calcCents(Fraction(3, 2))
  //   var actual = 701.955        // 701.9550008653874
  //   assert(Math.abs(expected-actual)<1e-6)
  // })



})
