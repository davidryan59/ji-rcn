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

  runTest(1, 20, 1500, 'average < 1500us for new JInterval({startPitchNotation: \'C4\', endPitchNotation: \'G4\'}) using simple notations', function () {
    return new JInterval({startPitchNotation: 'C4', endPitchNotation: 'G4'});
  });

  // Do 2000 instead
  runTest(1, 20, 6500, 'average < 6500us for new JInterval({startPitchNotation: txt1, endPitchNotation: txt2}) using more complex notations', function () {
    return new JInterval({startPitchNotation: "E#''pd[7/11]6", endPitchNotation: 'Db.ty[101/257](o-4)'});
  });
});
