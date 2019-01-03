var assert = require('assert');

var index = require('./index');
var getDiatonicArray = index.getDiatonicArray;

var fnName = 'getDiatonicArray';
describe(fnName, function() {

  var runTest = function(input, expected) {
    var actual = getDiatonicArray(input)[0]
    var label = fnName + "(" + input + ") = " + expected
    it(label, function() {
      assert.strictEqual(actual, expected)
    })
  }

  var testArray = [
    ["aString", "(3ERR)"]   // Not A (Number)
  , [null, "(3ERR)"]
  , [undefined, "(3ERR)"]
  , [["array"], "(3ERR)"]
  , [{an:"object"}, "(3ERR)"]
  , [-1e15-1, "(3ERR)"]
  , [-1e15, "(3ERR)"]
  , [-100.232, "(3ERR)"]
  , [-2, "(3ERR)"]
  , [-1.500001, "(3ERR)"]
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
  , [5.5, "(3ERR)"]
  , [6, "(3ERR)"]
  , [100, "(3ERR)"]
  , [1e15, "(3ERR)"]
  , [1e15+1, "(3ERR)"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
