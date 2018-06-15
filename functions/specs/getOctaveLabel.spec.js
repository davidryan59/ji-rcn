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
  , [-1000000, "(o-LOTS)"]
  , [-999999, "(o-999999)"]
  , [-100000, "(o-100000)"]
  , [-3000, "(o-3000)"]
  , [-70, "(o-70)"]
  , [-1, "(o-1)"]
  , [0, "0"]
  , [1, "1"]
  , [2, "2"]
  , [3, "3"]
  , [4, "4"]
  , [5, "5"]
  , [6, "6"]
  , [6.4999, "6"]
  , [6.5, "7"]
  , [7, "7"]
  , [8, "8"]
  , [9, "9"]
  , [10, "(o+10)"]
  , [4623, "(o+4623)"]
  , [82391, "(o+82391)"]
  , [999999, "(o+999999)"]
  , [1000000, "(o+LOTS)"]
  , [1e15, "(o+LOTS)"]
  , [1e15+1, "(o.Err)"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
