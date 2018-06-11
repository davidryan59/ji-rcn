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

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2])
  }

})
