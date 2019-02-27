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
    assert.strictEqual(jint.widthFractionText(), '6/5');
    assert(jint.getStartFreqHz() > 319.99);
    assert(jint.getStartFreqHz() < 320.01);
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
    assert.strictEqual(jint.widthFractionText(), '6/5');
    assert.strictEqual(jint.getStartFreqText(), '320.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '384.00 Hz');
    assert.strictEqual(jint.getStartPitchNotation(), 'E[1/11]4');
    assert.strictEqual(jint.getEndPitchNotation(), 'G.[1/11]4');
    assert.strictEqual(jint.getTuningPitchNotation(), 'A4');
    assert.strictEqual(jint.getTuningFreqHz(), 440);
    assert.strictEqual(jint.getTuningInputPitchNotation(), 'A4');
    assert(jint.hasTuning());
    // Cover 1 more case
    delete jint.setup.tune.pitchNotation;  // Can't see another way to cover 3rd case...
    assert.strictEqual(jint.getTuningInputPitchNotation(), 'C4');
  });

  // Can initialise correctly using frequencies only. Default tuning gives correct note names.
  var testObj2 = {
    startFreqHz: 320,
    endFreqHz: 384
  };
  it(`new JInterval(${JSON.stringify(testObj2)}) works`, function () {
    var jint = new JInterval(testObj2);
    assert.strictEqual(jint.widthFractionText(), '6/5');
    assert.strictEqual(jint.getStartFreqText(), '320.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '384.00 Hz');
    assert.strictEqual(jint.getStartPitchNotation(), "E'4");
    assert.strictEqual(jint.getEndPitchNotation(), 'G4');
    assert.strictEqual(jint.getTuningPitchNotation(), 'C4');  // Default notation
    assert.strictEqual(jint.getTuningFreqHz(), 256);
    assert.strictEqual(jint.getTuningInputPitchNotation(), 'C4');
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
    assert.strictEqual(jint.widthFractionText(), '6/5');
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
    assert.strictEqual(jint.widthFractionText(), '6/5');
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
    assert.strictEqual(jint2.widthFractionText(), '6/5');
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
    assert.strictEqual(jint.widthFractionText(), '6/5');
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
    assert.strictEqual(jint.widthFractionText(), '83/13');
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
    assert.strictEqual(jint.widthFractionText(), '83/13');
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
    assert.strictEqual(jint2.widthFractionText(), '83/13');
    assert.strictEqual(jint2.getStartPitchNotation(), 'Ab[13]3');
    assert.strictEqual(jint2.getEndPitchNotation(), 'F[83]6');
    assert.strictEqual(jint2.getStartFreqText(), '211.85 Hz');
    assert.strictEqual(jint2.getEndFreqText(), '1352.59 Hz');
    assert.strictEqual(jint.getTuningPitchNotation(), 'A4');
    assert.strictEqual(jint.getTuningFreqHz(), 440);
    assert.strictEqual(jint.getTuningInputPitchNotation(), 'G##d4');
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
    assert.strictEqual(jint.widthFractionText(), '89/74');
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
    assert.strictEqual(jint.widthFractionText(), '89/74');
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
    assert.strictEqual(jint.widthFractionText(), '89/74');
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
    assert.strictEqual(jint.widthFractionText(), '89/74');
    assert.strictEqual(jint.getStartPitchNotation(), 'A.[37/11]4');
    assert.strictEqual(jint.getEndPitchNotation(), 'Db.[89/11]5');
    assert.strictEqual(jint.getStartFreqText(), '444.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '534.00 Hz');
    assert(jint.hasAlg());
    assert.strictEqual(jint.getAlgText(), 'SAG');
    assert(jint.hasTuning());
  });

  var testObj7a = {
    width: 1.3,
    tuning: {
      // pitchNotation: 'C4'
      freqHz: 260
    }
  };
  it(`new JInterval(${JSON.stringify(testObj7a)}) works`, function () {
    var jint = new JInterval(testObj7a);
    assert.strictEqual(jint.widthFractionText(), '13/10');
    assert.strictEqual(jint.getTuningMultHz(), 260);
  });

  var testObj7b = {
    width: 1.5,
    tuning: {
      pitchNotation: 'Bb3'
      // freqHz: 256
    }
  };
  it(`new JInterval(${JSON.stringify(testObj7b)}) works`, function () {
    var jint = new JInterval(testObj7b);
    assert.strictEqual(jint.widthFractionText(), '3/2');
    assert.strictEqual(jint.getTuningMultHz(), 288);
  });

  // Tests that frequencies and notations interact correctly
  // via tuning (which sits in the background)
  it('new JInterval("E\'5") should be from C4 to E\'5', function () {
    var jint = new JInterval("E'5");     // Should be same as C4 to E'5
    assert.strictEqual(jint.widthFractionText(), '5/2');
    assert.strictEqual(jint.getStartPitchNotation(), 'C4');
    assert.strictEqual(jint.getEndPitchNotation(), "E'5");
    assert.strictEqual(jint.getStartFreqText(), '256.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '640.00 Hz');
  });

  it('Check getEndPitchNotation resets notations and frequencies', function () {
    var jint = new JInterval("E'5");
    jint.getEndPitchNotation('Bb[7](o+3)');   // Change start to Bb[7]3
    assert.strictEqual(jint.widthFractionText(), '5/2');
    assert.strictEqual(jint.getStartPitchNotation(), 'Bb[7]3');
    assert.strictEqual(jint.getEndPitchNotation(), "D'[7]5");
    assert.strictEqual(jint.getStartFreqText(), '224.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '560.00 Hz');
  });

  it('Check getEndInputPitchNotation resets notations and frequencies', function () {
    var jint = new JInterval("E'5");
    jint.getEndInputPitchNotation('Bb[7](o+5)');   // Change start to Bb[7]5
    assert.strictEqual(jint.widthFractionText(), '5/2');
    assert.strictEqual(jint.getStartPitchNotation(), 'Bb[7]5');
    assert.strictEqual(jint.getEndPitchNotation(), "D'[7]7");
    assert.strictEqual(jint.getStartFreqText(), '896.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '2240.00 Hz');
  });

  it('Check getEndPitchClassNotation resets notations and frequencies', function () {
    var jint = new JInterval("E'5");
    jint.getEndPitchClassNotation('Bb[7](o+6)');   // Change start to Bb[7]6
    assert.strictEqual(jint.widthFractionText(), '5/2');
    assert.strictEqual(jint.getStartPitchNotation(), 'Bb[7]6');
    assert.strictEqual(jint.getEndPitchNotation(), "D'[7]8");
    assert.strictEqual(jint.getStartFreqText(), '1792.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '4480.00 Hz');
  });

  it('Check getEndFreqHz resets frequencies and notations', function () {
    var jint = new JInterval("E'5");
    jint.getEndFreqHz(200);                    // Change start to 200 Hz
    assert.strictEqual(jint.widthFractionText(), '5/2');
    assert.strictEqual(jint.getStartFreqText(), '200.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '500.00 Hz');
    assert.strictEqual(jint.getStartPitchNotation(), "G#''3");
    assert.strictEqual(jint.getEndPitchNotation(), "B#'''4");
  });

  it('Check getEndFreqText resets frequencies and notations', function () {
    var jint = new JInterval("E'5");
    jint.getEndFreqText(400);                    // Change start to 200 Hz
    assert.strictEqual(jint.widthFractionText(), '5/2');
    assert.strictEqual(jint.getStartFreqText(), '400.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '1000.00 Hz');
    assert.strictEqual(jint.getStartPitchNotation(), "G#''4");
    assert.strictEqual(jint.getEndPitchNotation(), "B#'''5");
  });
});
