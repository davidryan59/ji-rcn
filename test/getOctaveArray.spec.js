var assert = require('assert')

var getOctaveArray = require('../src/notation/getOctaveArray')

var fnName = 'getOctaveArray'
describe(fnName, function() {

  var runTest = function(input, expected) {
    var actual = getOctaveArray(input)[0]
    var label = fnName + "(" + input + ") = " + expected
    it(label, function() {
      assert.strictEqual(actual, expected)
    })
  }

  var testArray = [
    ["aString", "(o.Err)"]
  , [null, "(o.Err)"]
  , [undefined, "(o.Err)"]
  , [["array"], "(o.Err)"]
  , [{an:"object"}, "(o.Err)"]
  , [-1e15-1, "(o.Err)"]
  , [-1e15, "(o-LOTS)"]
  , [1e15, "(o+LOTS)"]
  , [1e15+1, "(o.Err)"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
