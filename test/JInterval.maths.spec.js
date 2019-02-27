/* eslint-disable func-names */

var assert = require('assert');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;


describe('Maths functions on JInterval', function () {
  // Setup two objects to create JIntervals from and multiply together
  var testObj1 = {
    alg: 'KG',
    tuning: {
      pitchNotation: 'F##b[11]4',
      freqHz: 363
    },
    startPitchNotation: "B'.[31]5",
    endPitchNotation: 'Epbd[37]6'
  };

  var testObj2 = {
    alg: 'SAG',
    tuning: {
      pitchNotation: 'B##bbb[59]3',
      freqHz: 177
    },
    startPitchNotation: 'Gb[89 11^2 / 11 11]5',
    endPitchNotation: "Db'.'.'.[17]3"
  };

  // Series of tests on maths functions on JIntervals from these objects
  it('Check the setup options', function () {
    var jint1a = new JInterval(testObj1);
    var options1 = jint1a.getSetupObject();
    assert.strictEqual(options1.alg.txt, 'KG2');
    assert.strictEqual(options1.tuning.pitchNotation, 'F##b[11]4');
    assert.strictEqual(options1.tuning.freqHz, 363);
  });

  it('Copying JInterval brings over all relevant info', function () {
    var jint1b = new JInterval(testObj1);
    var jint1Copy = jint1b.copy();

    assert(jint1Copy.hasAlg());
    assert.strictEqual(jint1Copy.getAlgText(), 'KG2');
    assert.strictEqual(jint1Copy.getAlgFn().name, 'getCommaKG2');

    assert(jint1Copy.hasTuning());
    assert.strictEqual(jint1Copy.getTuningInputPitchNotation(), 'F##b[11]4');
    assert.strictEqual(jint1Copy.getTuningPitchNotation(), 'F#[11]4');
    assert.strictEqual(jint1Copy.getTuningFreqHz(), 363);
    assert.strictEqual(jint1Copy.getTuningMultHz(), 264);

    assert.strictEqual(jint1Copy.ratioFractionText(), '37/31');

    assert(jint1Copy.hasPos());
    assert.strictEqual(jint1Copy.getStartInputPitchNotation(), "B'.[31]5");
    assert.strictEqual(jint1Copy.getStartPitchNotation(), 'B[31]5');
    assert.strictEqual(jint1Copy.getStartFreqText(), '1023.00 Hz');
    assert.strictEqual(jint1Copy.getEndInputPitchNotation(), 'Epbd[37]6');
    assert.strictEqual(jint1Copy.getEndPitchNotation(), 'Eb[37]6');
    assert.strictEqual(jint1Copy.getEndFreqText(), '1221.00 Hz');
  });

  it('Calling get1 on a JInterval brings over all relevant info but with frequency ratio 1', function () {
    var jint1c = new JInterval(testObj1);
    var jint1get1 = jint1c.get1();

    assert(jint1get1.hasAlg());
    assert.strictEqual(jint1get1.getAlgText(), 'KG2');
    assert.strictEqual(jint1get1.getAlgFn().name, 'getCommaKG2');

    assert(jint1get1.hasTuning());
    assert.strictEqual(jint1get1.getTuningInputPitchNotation(), 'F##b[11]4');
    assert.strictEqual(jint1get1.getTuningPitchNotation(), 'F#[11]4');
    assert.strictEqual(jint1get1.getTuningFreqHz(), 363);
    assert.strictEqual(jint1get1.getTuningMultHz(), 264);

    assert.strictEqual(jint1get1.ratioFractionText(), '1');

    assert(jint1get1.hasPos());
  });

  it('Calling pow on a JInterval brings over all relevant info', function () {
    var jint1d = new JInterval(testObj1);
    var jint1Pow = jint1d.pow(-3);

    assert(jint1Pow.hasAlg());
    assert.strictEqual(jint1Pow.getAlgText(), 'KG2');
    assert.strictEqual(jint1Pow.getAlgFn().name, 'getCommaKG2');

    assert(jint1Pow.hasTuning());
    assert.strictEqual(jint1Pow.getTuningInputPitchNotation(), 'F##b[11]4');
    assert.strictEqual(jint1Pow.getTuningPitchNotation(), 'F#[11]4');
    assert.strictEqual(jint1Pow.getTuningFreqHz(), 363);
    assert.strictEqual(jint1Pow.getTuningMultHz(), 264);

    assert.strictEqual(jint1Pow.ratioFractionText(), '29791/50653');

    assert(jint1Pow.hasPos());
    assert.strictEqual(jint1Pow.getStartInputPitchNotation(), "B'.[31]5");
  });

  it('Calling j1.mult(j2) brings over relevant info from j1', function () {
    var jint1e = new JInterval(testObj1);
    var jint2e = new JInterval(testObj2);
    var jint12e = jint1e.mult(jint2e);

    assert(jint12e.hasAlg());
    assert.strictEqual(jint12e.getAlgText(), 'KG2');
    assert.strictEqual(jint12e.getAlgFn().name, 'getCommaKG2');

    assert(jint12e.hasTuning());
    assert.strictEqual(jint12e.getTuningInputPitchNotation(), 'F##b[11]4');
    assert.strictEqual(jint12e.getTuningPitchNotation(), 'F#[11]4');
    assert.strictEqual(jint12e.getTuningFreqHz(), 363);
    assert.strictEqual(jint12e.getTuningMultHz(), 264);

    assert.strictEqual(jint12e.ratioFractionText(), '629/2759');

    assert(jint12e.hasPos());
    assert.strictEqual(jint12e.getStartInputPitchNotation(), "B'.[31]5");
  });

  it('Calling j1.mult(j2, -2) brings over relevant info from j1', function () {
    var jint1f = new JInterval(testObj1);
    var jint2f = new JInterval(testObj2);
    var jint12f = jint1f.mult(jint2f, -2);

    assert(jint12f.hasAlg());
    assert.strictEqual(jint12f.getAlgText(), 'KG2');
    assert.strictEqual(jint12f.getAlgFn().name, 'getCommaKG2');

    assert(jint12f.hasTuning());
    assert.strictEqual(jint12f.getTuningInputPitchNotation(), 'F##b[11]4');
    assert.strictEqual(jint12f.getTuningPitchNotation(), 'F#[11]4');
    assert.strictEqual(jint12f.getTuningFreqHz(), 363);
    assert.strictEqual(jint12f.getTuningMultHz(), 264);

    // 37/31 * (17/89)^-2
    // 37 89 89 / 31 17 17
    // 293077 / 8959
    assert.strictEqual(jint12f.ratioFractionText(), '293077/8959');

    assert(jint12f.hasPos());
    assert.strictEqual(jint12f.getStartInputPitchNotation(), "B'.[31]5");
  });
});
