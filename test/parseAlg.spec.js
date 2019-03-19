/* eslint-disable func-names */

var assert = require('assert');

var testIndex = require('./_test_index');
var parseCommaAlgText = testIndex.parseCommaAlgText;

var fnName = 'parseCommaAlgText';
describe(fnName, function () {
  var runTest = function (input, expectedString, comment) {
    var actual = parseCommaAlgText(input);
    var commentText = (comment) ? ' (' + comment + ')' : '';
    var label = fnName + '(' + input + ') = ' + JSON.stringify(expectedString) + commentText;
    it(label, function () {
      assert.strictEqual(actual, expectedString);
    });
  };

  var testArray = [
    [null, '', 'Empty string is returned by default'],
    ['', ''],
    ['DR', 'DR'],
    ['dR', 'DR', 'Not case sensitive'],
    ['DrX', 'DR', 'Allows some extra characters'],
    ['dRxy', '', 'More than 3 characters will not parse'],
    ['sag', 'SAG'],
    ['DK', 'SAG'],
    ['2dK', 'SAG'],
    ['Dkp', 'SAG'],
    ['d0p', '', 'Matched characters have to be consecutive'],
    ['kg', 'KG2'],
    ['KG2', 'KG2'],
    ['xKg', 'KG2'],
    ['EMP', 'EMP', 'Test value only'],
    ['NUL', 'NUL', 'Test value only'],
    ['bad', 'BAD', 'Test a bad comma algorithm']
  ];

  for (var i = 0; i < testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2]);
  }
});
