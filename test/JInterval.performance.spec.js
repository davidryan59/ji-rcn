/* eslint-disable func-names*/
/* eslint-disable no-unused-vars*/
/* eslint-disable no-console*/

var assert = require('assert');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;

var runTest = function (startAtNumber, totalLoops, maxTimeMicroseconds, testLabel, functionToCall) {
  it(testLabel, function () {
    var exampleOutput = null;
    var startTimeMS = Date.now();
    for (var i = startAtNumber; i < startAtNumber + totalLoops; i++) exampleOutput = functionToCall(i);
    var endTimeMS = Date.now();
    var timeInMicroseconds = Math.round((endTimeMS - startTimeMS) * 1000 / totalLoops);
    console.log(`Average time was ${timeInMicroseconds}us, tested on ${totalLoops} instances from ${startAtNumber} to ${startAtNumber + totalLoops - 1}, total time ${endTimeMS - startTimeMS}ms.`);
    assert(timeInMicroseconds < maxTimeMicroseconds);
  });
};

describe('Performance of JInterval', function () {
  runTest(1000000, 2000, 70, 'average < 70us (microseconds) for new JInterval(integer, 91)', function (i) {
    return new JInterval(i, 91);
  });

  runTest(150, 100, 1200, 'average < 1200us for new JInterval({startFreqHz: integer, endFreqHz: 210})', function (i) {
    return new JInterval({startFreqHz: i, endFreqHz: 210});
  });

  runTest(1, 50, 1500, 'average < 1500us for new JInterval({startPitchNotation: \'C4\', endPitchNotation: \'G4\'}) using simple notations', function () {
    return new JInterval({startPitchNotation: 'C4', endPitchNotation: 'G4'});
  });

  runTest(1, 20, 6500, 'average < 6500us for new JInterval({startPitchNotation: txt1, endPitchNotation: txt2}) using more complex notations', function () {
    return new JInterval({startPitchNotation: "E#''pd[7/11]6", endPitchNotation: 'Db.ty[101/257](o-4)'});
  });

  var jint1 = new JInterval(2);
  jint1.getEndPitchClassNotation('D4');
  runTest(1, 50000, 17, 'average < 17us for fetching precalculated end notation', function () {
    return jint1.getEndPitchClassNotation();
  });

  var jint2 = new JInterval(2);
  var arr2 = ['D4', 'E4'];
  jint1.getEndPitchClassNotation('F4');
  runTest(1, 200, 550, 'average < 550us for recalculating simple notations', function (i) {
    return jint2.getEndPitchClassNotation(arr2[i % 2]); // Swap between two simple end notations
  });

  var jint3 = new JInterval(2);
  var arr3 = ['D##b#bb(p2)4', 'E...\'\'\'(d2)4'];
  jint1.getEndPitchClassNotation('F[77/77]#b(p2)4');
  runTest(1, 200, 860, 'average < 860us for recalculating complex notations', function (i) {
    return jint3.getEndPitchClassNotation(arr3[i % 2]); // Swap between two simple end notations
  });
});
