/* eslint-disable func-names */

var assert = require('assert');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;

var fnName = 'Tuning functions on JInterval';
describe(fnName, function () {
  // Can initialise correctly using frequencies and tuning equivalent to default
  var testObj1 = {
    startFreqHz: 320,
    endFreqHz: 384,
    tuning: {
      pitchNotation: 'A4',
      freqHz: 432
    }
  };
  it(`new JInterval(${JSON.stringify(testObj1)}) works`, function () {
    var jint = new JInterval(testObj1);
    assert.strictEqual(jint.toFractionText(), '6/5');
    assert.strictEqual(jint.getStartFreqText(), '320.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '384.00 Hz');
    assert.strictEqual(jint.getStartPitchNotation(), "E'4");
    assert.strictEqual(jint.getEndPitchNotation(), 'G4');
    assert(jint.hasTuning());
  });

  // Can initialise correctly using frequencies and non-default tuning
  var testObj1a = {
    startFreqHz: 320,
    endFreqHz: 384,
    tuning: {
      pitchNotation: 'A4',
      freqHz: 440
    }
  };
  it(`new JInterval(${JSON.stringify(testObj1a)}) works`, function () {
    var jint = new JInterval(testObj1a);
    assert.strictEqual(jint.toFractionText(), '6/5');
    assert.strictEqual(jint.getStartFreqText(), '320.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '384.00 Hz');
    assert.strictEqual(jint.getStartPitchNotation(), 'E[1/11]4');
    assert.strictEqual(jint.getEndPitchNotation(), 'G.[1/11]4');
    assert(jint.hasTuning());
  });

  // Can initialise correctly using frequencies only. Default tuning gives correct note names.
  var testObj2 = {
    startFreqHz: 320,
    endFreqHz: 384
  };
  it(`new JInterval(${JSON.stringify(testObj2)}) works`, function () {
    var jint = new JInterval(testObj2);
    assert.strictEqual(jint.toFractionText(), '6/5');
    assert.strictEqual(jint.getStartFreqText(), '320.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '384.00 Hz');
    assert.strictEqual(jint.getStartPitchNotation(), "E'4");
    assert.strictEqual(jint.getEndPitchNotation(), 'G4');
    assert(!jint.hasTuning());
  });


  // Can initialise correctly using notations and tuning equivalent to default
  var testObj3 = {
    startPitchNotation: "E'4",
    endPitchNotation: 'G4',
    tuning: {
      pitchNotation: 'A4',
      freqHz: 432
    }
  };
  it(`new JInterval(${JSON.stringify(testObj3)}) works`, function () {
    var jint = new JInterval(testObj3);
    assert.strictEqual(jint.toFractionText(), '6/5');
    assert.strictEqual(jint.getStartPitchNotation(), "E'4");
    assert.strictEqual(jint.getEndPitchNotation(), 'G4');
    assert.strictEqual(jint.getStartFreqText(), '320.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '384.00 Hz');
    assert(jint.hasTuning());
  });

  // Can initialise correctly using notations and non-default tuning
  var testObj3a = {
    startPitchNotation: "E'4",
    endPitchNotation: 'G4',
    tuning: {
      pitchNotation: 'A4',
      freqHz: 440
    }
  };
  it(`new JInterval(${JSON.stringify(testObj3a)}) works`, function () {
    var jint = new JInterval(testObj3a);
    assert.strictEqual(jint.toFractionText(), '6/5');
    assert.strictEqual(jint.getStartPitchNotation(), "E'4");
    assert.strictEqual(jint.getEndPitchNotation(), 'G4');
    assert.strictEqual(jint.getStartFreqText(), '325.93 Hz');
    assert.strictEqual(jint.getEndFreqText(), '391.11 Hz');
    assert(jint.hasTuning());
  });

  // Can initialise correctly using notations only. Default tuning gives correct frequencies.
  var testObj4 = {
    startPitchNotation: "E'4",
    endPitchNotation: 'G4'
  };
  it(`new JInterval(${JSON.stringify(testObj4)}) works`, function () {
    var jint = new JInterval(testObj4);
    assert.strictEqual(jint.toFractionText(), '6/5');
    assert.strictEqual(jint.getStartPitchNotation(), "E'4");
    assert.strictEqual(jint.getEndPitchNotation(), 'G4');
    assert.strictEqual(jint.getStartFreqText(), '320.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '384.00 Hz');
    assert(!jint.hasTuning());
  });
});
