/* eslint-disable func-names */

var assert = require('assert');

var testIndex = require('./_test_index');
var get5Label = testIndex.get5Label;
var JInterval = testIndex.JInterval;
var mockJint = new JInterval();


var fnName = 'get5Label';
describe(fnName, function () {
  var runTest = function (input, expected) {
    var actual = get5Label(mockJint, input);
    var label = fnName + '(' + input + ') = ' + expected;
    it(label, function () {
      assert.strictEqual(actual, expected);
    });
  };

  var testArray = [
    ['aString', '(5ERR)'],
    [null, '(5ERR)'],
    [['array'], '(5ERR)'],
    [{an: 'object'}, '(5ERR)'],
    [-1e15 - 1, '(5ERR)'],
    [-1e15, '(.1000000000000000)'],
    [1e15, "('1000000000000000)"],
    [1e15 + 1, '(5ERR)']
  ];

  for (var i = 0; i < testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1]);
  }
});
