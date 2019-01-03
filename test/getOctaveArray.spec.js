var assert = require('assert');

var index = require('./index');
var getOctaveArray = index.getOctaveArray;

var fnName = 'getOctaveArray';
describe(fnName, function() {

  var runTest = function(input, expected) {
    var actual = getOctaveArray(input)[0]
    var label = fnName + "(" + input + ") = " + expected
    it(label, function() {
      assert.strictEqual(actual, expected)
    })
  }

  var testArray = [
    ["aString", "(oERR)"]
  , [null, "(oERR)"]
  , [undefined, "(oERR)"]
  , [["array"], "(oERR)"]
  , [{an:"object"}, "(oERR)"]
  , [-1e15-1, "(oERR)"]
  , [-1e15, "(o-ERR)"]
  , [1e15, "(o+ERR)"]
  , [1e15+1, "(oERR)"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
