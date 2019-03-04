/* eslint-disable func-names */

var assert = require('assert');

var testIndex = require('./_test_index');
var getHigherPythagCommaArray = testIndex.getHigherPythagCommaArray;
var consts = testIndex.consts;
var peos = testIndex.peos;
var JInterval = testIndex.JInterval;
var mockJint = new JInterval();

var pythagArr = [
  peos.PEO_PYTHAG,
  consts.CHAR_PYTHAG_ON,
  consts.CHAR_PYTHAG_OFF
];

var mercatorArr = [
  peos.PEO_MERCATOR,
  consts.CHAR_MERCATOR_ON,
  consts.CHAR_MERCATOR_OFF
];

var smallArr = [
  peos.PEO_SMALL,
  consts.CHAR_SMALL_ON,
  consts.CHAR_SMALL_OFF
];

var tinyArr = [
  peos.PEO_TINY,
  consts.CHAR_TINY_ON,
  consts.CHAR_TINY_OFF
];


var fnName = 'getHigherPythagCommaArray';
describe(fnName, function () {
  var runTest = function (input, arr, expected, startLevel) {
    // startLevel is optional
    var theStartLevel = startLevel || null;
    var arrReturn = getHigherPythagCommaArray(mockJint, input, theStartLevel, arr[0], arr[1], arr[2]);
    var actual = arrReturn[0];
    var label = fnName + ' with ' + arr[1] + ' comma and ' + input + ' gives \'' + expected + '\'';
    if (startLevel) label += ' (start at ' + startLevel + ')';
    it(label, function () {
      assert.strictEqual(actual, expected);
    });
  };

  var testArray = [
    [0, pythagArr, ''],
    [1, pythagArr, ''],
    [11, pythagArr, ''],
    [12, pythagArr, 'p'],
    [23, pythagArr, 'p'],
    [24, pythagArr, 'pp'],
    [59, pythagArr, 'pppp'],
    [60, pythagArr, '(p5)'],
    [15887, pythagArr, '(p1323)'],
    [15888, pythagArr, '(p1324)'],
    [1e15, pythagArr, '(p83333333333333)'],
    [1e15 + 1, pythagArr, '(pERR)'],

    [-1, pythagArr, ''],
    [-11, pythagArr, ''],
    [-12, pythagArr, 'd'],
    [-59, pythagArr, 'dddd'],
    [-60, pythagArr, '(d5)'],
    [-20954855, pythagArr, '(d1746237)'],
    [-20954856, pythagArr, '(d1746238)'],
    [-1e15, pythagArr, '(d83333333333333)'],
    [-1e15 - 1, pythagArr, '(pERR)'],

    [5, pythagArr, '', 6],
    [6, pythagArr, 'p', 6],
    [23, pythagArr, '', 24],
    [24, pythagArr, 'p', 24],
    [-64, pythagArr, 'dddd', 17],
    [-65, pythagArr, '(d5)', 17],

    [52, mercatorArr, ''],
    [53, mercatorArr, 'm'],
    [264, mercatorArr, 'mmmm'],
    [265, mercatorArr, '(m5)'],
    [-53, mercatorArr, 'w'],

    [664, smallArr, ''],
    [665, smallArr, 's'],
    [3324, smallArr, 'ssss'],
    [3325, smallArr, '(s5)'],
    [-665, smallArr, 'r'],
    [-3059, smallArr, 'rrrr', 400],
    [-3060, smallArr, '(r5)', 400],

    [190536, tinyArr, ''],
    [190537, tinyArr, 't'],
    [952684, tinyArr, 'tttt'],
    [952685, tinyArr, '(t5)'],
    [-190537, tinyArr, 'y'],
    [-1e15, tinyArr, '(y5248324472)'],

    ['aString', pythagArr, '(pERR)'],
    [false, mercatorArr, '(mERR)'],
    [['array'], smallArr, '(sERR)'],
    [{an: 'object'}, tinyArr, '(tERR)'],

    [null, pythagArr, '(pERR)']
  ];

  for (var i = 0; i < testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2], testArray[i][3]);
  }
});
