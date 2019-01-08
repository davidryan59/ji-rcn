/* eslint-disable func-names */

var assert = require('assert');

var testIndex = require('./_test_index');
var getOctaveArray = testIndex.getOctaveArray;

var fnName = 'getOctaveArray';
describe(fnName, function () {
  var runTest = function (input, expected) {
    var actual = getOctaveArray(input)[0];
    var label = fnName + '(' + input + ') = ' + expected;
    it(label, function () {
      assert.strictEqual(actual, expected);
    });
  };

  var testArray = [
    ['aString', '(oERR)'],
    [null, '(oERR)'],
    [['array'], '(oERR)'],
    [{an: 'object'}, '(oERR)'],
    [-1e15 - 1, '(oERR)'],
    [-1e15, '(o-999999999999996)'],
    [1e15, '(o+1000000000000004)'],
    [1e15 + 1, '(oERR)']
  ];

  for (var i = 0; i < testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1]);
  }
});
