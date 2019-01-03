var assert = require('assert');

var index = require('./index');
var getSharpFlatArray = index.getSharpFlatArray;

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
    ["aString", "(#bERR)"]
  , [null, "(#bERR)"]
  , [undefined, "(#bERR)"]
  , [["array"], "(#bERR)"]
  , [{an:"object"}, "(#bERR)"]
  , [-1e15-1, "(#bERR)"]
  , [-1e15, "(bERR)"]
  , [1e15, "(#ERR)"]
  , [1e15+1, "(#bERR)"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
