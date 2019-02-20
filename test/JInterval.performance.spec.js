/* eslint-disable func-names */

var assert = require('assert');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;

var getTimeMS = function () {
  return new Date().getTime();
};

describe('Performance of JInterval', function () {
  // Typical time: 22ms
  it('Can create 2000 JIntervals on rationals of order 1e6 in less than 100ms', function () {
    var startTimeMS = getTimeMS();
    for (var i = 1000000; i < 1002000; i++) {
      var jint = new JInterval(i, 77);
    }
    var endTimeMS = getTimeMS();
    assert(endTimeMS - startTimeMS < 100);
    assert(jint);
  });

  // Typical time: 70ms
  it('Can create 100 JIntervals on frequency ranges in less than 200ms', function () {
    var startTimeMS = getTimeMS();
    for (var i = 150; i < 250; i++) {
      var jint = new JInterval({startFreqHz: i, endFreqHz: 210});
    }
    var endTimeMS = getTimeMS();
    assert(endTimeMS - startTimeMS < 200);
    assert(jint);
  });

  // Typical time: 70ms
  it('Can create 20 JIntervals on notation ranges in less than 200ms', function () {
    var startTimeMS = getTimeMS();
    for (var i = 0; i < 20; i++) {
      var jint = new JInterval({startPitchNotation: "E#''[7/11]6", endPitchNotation: 'Db.[101/257](o-4)'});
    }
    var endTimeMS = getTimeMS();
    assert(endTimeMS - startTimeMS < 200);
    assert(jint);
  });
});
