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

  // Can initialise correctly using notations and non-default tuning, also jint copying
  var testObj3b = {
    startPitchNotation: "E'4",
    endPitchNotation: 'G4',
    tuning: {
      pitchNotation: 'A4',
      freqHz: 440
    }
  };
  it(`new JInterval(new JInterval(${JSON.stringify(testObj3b)})) works`, function () {
    var jint = new JInterval(testObj3b);
    var jint2 = new JInterval(jint);
    assert.strictEqual(jint2.toFractionText(), '6/5');
    assert.strictEqual(jint2.getStartPitchNotation(), "E'4");
    assert.strictEqual(jint2.getEndPitchNotation(), 'G4');
    assert.strictEqual(jint2.getStartFreqText(), '325.93 Hz');
    assert.strictEqual(jint2.getEndFreqText(), '391.11 Hz');
    assert(jint2.hasTuning());
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


  var testObj5a = {
    startPitchNotation: 'A[13]3',
    endPitchNotation: 'E[83]6'
  };
  it(`new JInterval(${JSON.stringify(testObj5a)}) works`, function () {
    var jint = new JInterval(testObj5a);
    assert.strictEqual(jint.toFractionText(), '83/13');
    assert.strictEqual(jint.getStartPitchNotation(), 'A[13]3');
    assert.strictEqual(jint.getEndPitchNotation(), 'E[83]6');
    assert.strictEqual(jint.getStartFreqText(), '208.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '1328.00 Hz');
    assert(!jint.hasAlg());
    assert(!jint.hasTuning());
  });

  var testObj5b = {
    startPitchNotation: 'Ab[13]3',
    endPitchNotation: 'F[83]6',
    alg: 'kg'
  };
  it(`new JInterval(${JSON.stringify(testObj5b)}) works`, function () {
    var jint = new JInterval(testObj5b);
    assert.strictEqual(jint.toFractionText(), '83/13');
    assert.strictEqual(jint.getStartPitchNotation(), 'Ab[13]3');
    assert.strictEqual(jint.getEndPitchNotation(), 'F[83]6');
    assert.strictEqual(jint.getStartFreqText(), '208.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '1328.00 Hz');
    assert(jint.hasAlg());
    assert.strictEqual(jint.getAlgText(), 'KG2');
    assert(!jint.hasTuning());
  });

  var testObj5c = {
    startPitchNotation: 'Ab#b[26/2]3',
    endPitchNotation: "F'.[581/7]6",
    alg: 'kg',
    tuning: {
      pitchNotation: 'G##d4',    // A4
      freqHz: 440
    }
  };
  it(`new JInterval(${JSON.stringify(testObj5c)}) works`, function () {
    var jint = new JInterval(testObj5c);
    var jint2 = new JInterval(jint);
    assert.strictEqual(jint2.toFractionText(), '83/13');
    assert.strictEqual(jint2.getStartPitchNotation(), 'Ab[13]3');
    assert.strictEqual(jint2.getEndPitchNotation(), 'F[83]6');
    assert.strictEqual(jint2.getStartFreqText(), '211.85 Hz');
    assert.strictEqual(jint2.getEndFreqText(), '1352.59 Hz');
    assert(jint2.hasAlg());
    assert.strictEqual(jint2.getAlgText(), 'KG2');
    assert(jint2.hasTuning());
  });


  var testObj6a = {
    startFreqHz: 444,
    endFreqHz: 534
  };
  it(`new JInterval(${JSON.stringify(testObj6a)}) works`, function () {
    var jint = new JInterval(testObj6a);
    assert.strictEqual(jint.toFractionText(), '89/74');
    assert.strictEqual(jint.getStartPitchNotation(), 'A[37]4');
    assert.strictEqual(jint.getEndPitchNotation(), 'C#[89]5');
    assert.strictEqual(jint.getStartFreqText(), '444.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '534.00 Hz');
    assert(!jint.hasAlg());
    assert(!jint.hasTuning());
  });

  var testObj6b = {
    startFreqHz: 444,
    endFreqHz: 534,
    alg: 'sag'
  };
  it(`new JInterval(${JSON.stringify(testObj6b)}) works`, function () {
    var jint = new JInterval(testObj6b);
    assert.strictEqual(jint.toFractionText(), '89/74');
    assert.strictEqual(jint.getStartPitchNotation(), 'A[37]4');
    assert.strictEqual(jint.getEndPitchNotation(), 'Db[89]5');
    assert.strictEqual(jint.getStartFreqText(), '444.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '534.00 Hz');
    assert(jint.hasAlg());
    assert.strictEqual(jint.getAlgText(), 'SAG');
    assert(!jint.hasTuning());
  });

  var testObj6c = {
    startFreqHz: 444,
    endFreqHz: 534,
    alg: 'kg'
  };
  it(`new JInterval(${JSON.stringify(testObj6c)}) works`, function () {
    var jint = new JInterval(testObj6c);
    assert.strictEqual(jint.toFractionText(), '89/74');
    assert.strictEqual(jint.getStartPitchNotation(), 'Bb[37]4');
    assert.strictEqual(jint.getEndPitchNotation(), 'C#[89]5');
    assert.strictEqual(jint.getStartFreqText(), '444.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '534.00 Hz');
    assert(jint.hasAlg());
    assert.strictEqual(jint.getAlgText(), 'KG2');
    assert(!jint.hasTuning());
  });

  var testObj6d = {
    startFreqHz: 444,
    endFreqHz: 534,
    alg: 'dk',
    tuning: {
      pitchNotation: 'Bbbp4',    // A4
      freqHz: 440
    }
  };
  it(`new JInterval(${JSON.stringify(testObj6d)}) works`, function () {
    var jint = new JInterval(testObj6d);
    assert.strictEqual(jint.toFractionText(), '89/74');
    assert.strictEqual(jint.getStartPitchNotation(), 'A.[37/11]4');
    assert.strictEqual(jint.getEndPitchNotation(), 'Db.[89/11]5');
    assert.strictEqual(jint.getStartFreqText(), '444.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '534.00 Hz');
    assert(jint.hasAlg());
    assert.strictEqual(jint.getAlgText(), 'SAG');
    assert(jint.hasTuning());
  });
});
