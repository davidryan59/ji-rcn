var assert = require('assert')

var getOctaveLabel = require('../getOctaveLabel.js')

var fnName = 'getOctaveLabel'
describe(fnName, function() {

  var runTest = function(input, expected) {
    var actual = getOctaveLabel(input)
    var label = fnName + "(" + input + ") = " + expected
    it(label, function() {
      assert.strictEqual(actual, expected)
    })
  }

  var testArray = [
    [-1e15-1, "(o.Err)"]
  , [-1e15, "(o-LOTS)"]
  , [-1000004, "(o-LOTS)"]
  , [-1000003, "(o-999999)"]
  , [-100004, "(o-100000)"]
  , [-3004, "(o-3000)"]
  , [-74, "(o-70)"]
  , [-5, "(o-1)"]
  , [-4, "0"]
  , [-3, "1"]
  , [-2, "2"]
  , [-1, "3"]
  , [0, "4"]
  , [1, "5"]
  , [2, "6"]
  , [2.4999, "6"]
  , [2.5, "7"]
  , [3, "7"]
  , [4, "8"]
  , [5, "9"]
  , [6, "(o+10)"]
  , [4623, "(o+4627)"]
  , [82391, "(o+82395)"]
  , [999995, "(o+999999)"]
  , [999996, "(o+LOTS)"]
  , [1e15, "(o+LOTS)"]
  , [1e15+1, "(o.Err)"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
