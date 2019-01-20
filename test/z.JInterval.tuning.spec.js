/* eslint-disable func-names */

var assert = require('assert');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;

var fnName = 'Tuning functions on JInterval';
describe(fnName, function () {
  it('new JInterval({startPitchNotation:"D\'.4", endPitchNotation:"F[77/7]4", tuning:{pitchNotation:"A#bb#4", freqHz:435}} works', function () {
    var jint = new JInterval({startPitchNotation: 'D\'.4', endPitchNotation: 'F[77/7]4', tuning: {pitchNotation: 'A#bb#4', freqHz: 435}});
    assert(jint.getTuningMultHz() > 257.7777, 'Tuning mult Hz is > 257.7777');
    assert(jint.getTuningMultHz() < 257.7778, 'Tuning mult Hz is < 257.7778');
    assert(jint.getStartFreqHz() > 289.9999, 'getStartFreqHz is > 289.9999');
    assert(jint.getStartFreqHz() < 290.0001, 'getStartFreqHz is < 290.0001');
    assert(jint.getEndFreqHz() > 354.4444, 'getEndFreqHz is > 354.4444');
    assert(jint.getEndFreqHz() < 354.4445, 'getEndFreqHz is < 354.4445');
  });

  it('new JInterval({startPitchNotation:"D\'.4", endPitchNotation:"F[77/7]4", tuning:{}} works', function () {
    var jint = new JInterval({startPitchNotation: 'D\'.4', endPitchNotation: 'F[77/7]4', tuning: {}});
    assert(jint.getTuningMultHz() > 255.9999, 'Tuning mult Hz is > 255.9999');
    assert(jint.getTuningMultHz() < 256.0001, 'Tuning mult Hz is < 256.0001');
    assert(jint.getStartFreqHz() > 287.9999, 'getStartFreqHz is > 287.9999');
    assert(jint.getStartFreqHz() < 288.0001, 'getStartFreqHz is < 288.0001');
    assert(jint.getEndFreqHz() > 351.9999, 'getEndFreqHz is 352 (>)');
    assert(jint.getEndFreqHz() < 352.0001, 'getEndFreqHz is 352 (<)');
  });

  it('new JInterval({startFreqHz:300, endFreqHz:350, tuning:{pitchNotation:"C\'.4", freqHz:260}} works', function () {
    var jint = new JInterval({startFreqHz: 300, endFreqHz: 350, tuning: {pitchNotation: "C'.4", freqHz: 260}});
    assert(jint.getTuningMultHz() > 259.9999, 'Tuning mult Hz is > 259.9999');
    assert(jint.getTuningMultHz() < 260.0001, 'Tuning mult Hz is < 260.0001');
    assert.strictEqual(jint.getStartPitchNotation(), "D'[1/13]4");
    assert.strictEqual(jint.getEndPitchNotation(), "F'[7/13]4");
  });

  it('new JInterval({startFreqHz:300, endFreqHz:350, tuning:{}} works', function () {
    var jint = new JInterval({startFreqHz: 300, endFreqHz: 350, tuning: {}});
    assert(jint.getTuningMultHz() > 255.9999, 'Tuning mult Hz is > 255.9999');
    assert(jint.getTuningMultHz() < 256.0001, 'Tuning mult Hz is < 256.0001');
    assert.strictEqual(jint.getStartPitchNotation(), "D#''4");
    assert.strictEqual(jint.getEndPitchNotation(), "F#''[7]4");
  });
});
