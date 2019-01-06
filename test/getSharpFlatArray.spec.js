var assert = require('assert');

var test_index = require('./_test_index');
var getSharpFlatArray = test_index.getSharpFlatArray;

var fnName = 'getSharpFlatArray';
describe(fnName, function() {

  var runTest = function(input, expected) {
    var actual = getSharpFlatArray(input)[0]
    var label = fnName + "(" + input + ") = " + expected
    it(label, function() {
      assert.strictEqual(actual, expected)
    })
  }

  var testArray = [
    ["aString", "(#ERR)"]
  , [null, "(#ERR)"]
  , [undefined, "(#ERR)"]
  , [["array"], "(#ERR)"]
  , [{an:"object"}, "(#ERR)"]
  , [-1e15-1, "(#ERR)"]
  , [-1e15, "(b142857142857143)"]
  , [1e15, "(#142857142857143)"]
  , [1e15+1, "(#ERR)"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
