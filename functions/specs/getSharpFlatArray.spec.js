var assert = require('assert')

var getSharpFlatArray = require('../notation/getSharpFlatArray')

var fnName = 'getSharpFlatArray'
describe(fnName, function() {

  var runTest = function(input, expected) {
    var actual = getSharpFlatArray(input)[0]
    var label = fnName + "(" + input + ") = " + expected
    it(label, function() {
      assert.strictEqual(actual, expected)
    })
  }

  var testArray = [
    ["aString", "N"]   // Not (a number)
  , [null, "N"]
  , [undefined, "N"]
  , [["array"], "N"]
  , [{an:"object"}, "N"]
  , [-1e15-1, "N"]
  , [-1e15, "(bLOTS)"]
  , [1e15, "(#LOTS)"]
  , [1e15+1, "N"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
