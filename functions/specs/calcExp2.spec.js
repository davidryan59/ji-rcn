var assert = require('assert')
var calcExp2 = require('../calcExp2.js')
var tripleToFraction = require('../tripleToFraction.js')

var fnName = 'calcExp2'
describe(fnName, function() {

  var runTest = function(p, b, a) {
    var a_calc = calcExp2(p, b)
    var inputFractionText = tripleToFraction(p, 0, b).toFraction()
    var outputFractionText = tripleToFraction(p, a_calc, b).toFraction()
    var label = fnName + "(" + inputFractionText + ") maps to " + outputFractionText
    it(label, function() {
      assert.strictEqual(a_calc, a)
    })
  }

  var testArray = [
    [5, -4, 4]
  , [7, 2, -6]
  , [3, 0, -2]
  , [5, -1, -1]
  , [23, 1, -6]
  ]

  // Run all of these test cases
  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2])
  }


  // it("80/81", function() {
  //   assert.strictEqual(calcExp2(5, -4), 4)
  // })
  // it("63/64", function() {
  //   assert.strictEqual(calcExp2(7, 2), -6)
  // })
  // it("3/4", function() {
  //   assert.strictEqual(calcExp2(3, 0), -2)
  // })
  // it("5/6", function() {
  //   assert.strictEqual(calcExp2(5, -1), -1)
  // })
  // it("69/64", function() {
  //   assert.strictEqual(calcExp2(23, 1), -6)
  // })

})
