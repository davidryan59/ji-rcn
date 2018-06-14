var assert = require('assert')

var getDiatonicScaleLabel = require('../getDiatonicScaleLabel.js')

var fnName = 'getDiatonicScaleLabel'
describe(fnName, function() {

  var runTest = function(input, expected) {
    var actual = getDiatonicScaleLabel(input)
    var label = fnName + "(" + input + ") = " + expected
    it(label, function() {
      assert.strictEqual(actual, expected)
    })
  }

  var testArray = [
    ["aString", "Na"]   // Not A (Number)
  , [null, "Na"]
  , [undefined, "Na"]
  , [["array"], "Na"]
  , [{an:"object"}, "Na"]
  , [-1e15-1, "Na"]
  , [-1e15, "Lo"]
  , [-100.232, "Lo"]
  , [-2, "Lo"]
  , [-1.500001, "Lo"]
  , [-1.5, "F"]
  , [-1, "F"]
  , [0, "C"]
  , [1, "G"]
  , [2, "D"]
  , [3, "A"]
  , [3.4999, "A"]
  , [3.5, "E"]
  , [4, "E"]
  , [5, "B"]
  , [5.49, "B"]
  , [5.5, "Hi"]
  , [6, "Hi"]
  , [100, "Hi"]
  , [1e15, "Hi"]
  , [1e15+1, "Na"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
