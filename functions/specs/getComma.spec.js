var assert = require('assert')
var Fraction = require('fraction.js')
var getComma = require('../getComma.js')

var defaultFractionArray = [1, 1]
// var errorFractionArray = [1001, 1000]

var fnName = 'getComma'
describe(fnName, function() {

  var runTest = function(prime, fractionArray, type) {
    var actualResult = getComma(prime, type)
    var expectedResult = Fraction(fractionArray)
    var typeText = ""
    if (type) {
      typeText = ", " + type
    }
    var label = fnName + "(" + prime + typeText + ") returns " + expectedResult.toFraction()
    it(label, function() {
      assert.deepStrictEqual(actualResult, expectedResult)
    })
  }

  var testArray = [
    ["string", defaultFractionArray]
  , [null, defaultFractionArray]
  , [true, defaultFractionArray]
  , [Infinity, defaultFractionArray]
  , [1e16, defaultFractionArray]
  , [3, defaultFractionArray]
  , [-1, defaultFractionArray]
  , [-2003, defaultFractionArray]
  , [139, [2224, 2187]]
  , [139, [2224, 2187], "DR"]
  , [139, [139, 144], "SAG"]
  , [139, [33777, 32768], "KG2"]
  ]

  // Run all of these test cases
  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2])
  }

  // it("Gives 2224/2187 for prime 139 (default algorithm, which is DR)", function() {
  //   assert.deepStrictEqual(getComma(139), Fraction(2224, 2187))
  // })
  // it("Gives 2224/2187 for prime 139 (DR algorithm selected)", function() {
  //   assert.deepStrictEqual(getComma(139, "DR"), Fraction(2224, 2187))
  // })
  // it("Gives 139/144 for prime 139 (SAG algorithm selected)", function() {
  //   assert.deepStrictEqual(getComma(139, "SAG"), Fraction(139, 144))
  // })
  // it("Gives 33777/32768 for prime 139 (KG2 algorithm selected)", function() {
  //   assert.deepStrictEqual(getComma(139, "KG2"), Fraction(33777, 32768))
  // })

  // // Test some degenerate cases
  // it("Gives default for string input", function() {
  //   assert.deepStrictEqual(getComma("Not a number"), defaultValue)
  // })
  // it("Gives default for null input", function() {
  //   assert.deepStrictEqual(getComma(null), defaultValue)
  // })
  // it("Gives default for boolean input", function() {
  //   assert.deepStrictEqual(getComma(true), defaultValue)
  // })
  // it("Gives default for Infinity input", function() {
  //   assert.deepStrictEqual(getComma(Infinity), defaultValue)
  // })
  // it("Gives default for very large integer, beyond range of precision", function() {
  //   assert.deepStrictEqual(getComma(1e16), defaultValue)
  // })
  // it("Gives default for number under 5 (e.g. 3)", function() {
  //   assert.deepStrictEqual(getComma(3), defaultValue)
  // })
  // it("Gives default for negative number -1", function() {
  //   assert.deepStrictEqual(getComma(-1), defaultValue)
  // })
  // it("Gives default for large negative number -2003", function() {
  //   assert.deepStrictEqual(getComma(-2003), defaultValue)
  // })
  //

})
