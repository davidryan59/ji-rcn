/* eslint-disable func-names */

var assert = require('assert');
var Peo = require('peo');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;

var identityFn = function identityFn(p) {return new Peo(p);};

var fnName = 'setAlg and setAlgPrivate works';
describe(fnName, function () {
  it('removeAlg works', function () {
    var jint = new JInterval(1);
    assert(!jint.hasAlg());
    jint.setAlg();    // Case where there is nothing to remove
    assert(!jint.hasAlg());
    jint.setAlg('DR');
    assert(jint.hasAlg());
    jint.setAlg();    // Case where there is something to remove
    assert(!jint.hasAlg());
  });

  it('setAlg works with higher prime in ratio', function () {
    var jint = new JInterval({
      ratio: 139 / 128,
      alg: 'SAG'
    });
    assert(jint.hasAlg());
    assert(!jint.hasPos());
    assert.strictEqual(jint.getAlgText(), 'SAG');
    jint.setStartPitchNotation('G5');
    assert(jint.hasPos());
    assert.strictEqual(jint.getEndPitchNotation(), 'A[139]5');
    assert.strictEqual(jint.getStartFreqText(), '768.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '834.00 Hz');
    jint.setAlg('Kg2');
    assert(!jint.hasPos());
    jint.setStartPitchNotation('G5');
    assert(jint.hasPos());
    assert.strictEqual(jint.getEndPitchNotation(), 'Ab[139]5');
    assert.strictEqual(jint.getStartFreqText(), '768.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '834.00 Hz');
    jint.setAlg('');
    assert(!jint.hasAlg());
    assert(!jint.hasPos());
    jint.setStartPitchNotation('G5');
    assert(jint.hasPos());
    assert.strictEqual(jint.getEndPitchNotation(), 'G#[139]5');
    assert.strictEqual(jint.getStartFreqText(), '768.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '834.00 Hz');
    jint.setAlg('DR');
    assert(jint.hasAlg());
    assert(!jint.hasPos());
    jint.setStartPitchNotation('G5');
    assert(jint.hasPos());
    assert.strictEqual(jint.getEndPitchNotation(), 'G#[139]5');
    assert.strictEqual(jint.getStartFreqText(), '768.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '834.00 Hz');
  });

  it('setAlg works with higher prime in tuning', function () {
    var jint = new JInterval({
      ratio: 5 / 4,
      alg: 'SAG',
      tuning: {
        pitchNotation: 'C[139]4',
        freqHz: 278
      }
    });
    assert(jint.hasTuning());
    assert(jint.hasAlg());
    assert(!jint.hasPos());
    assert.strictEqual(jint.getAlgText(), 'SAG');
    assert.strictEqual(jint.getTuningFreqHz(), 278);
    assert.strictEqual(jint.getTuningMultHz().toFixed(2), '288.00');
    jint.setStartPitchNotation('G5');
    assert(jint.hasPos());
    assert.strictEqual(jint.getEndPitchNotation(), "B'5");
    assert.strictEqual(jint.getStartFreqText(), '864.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '1080.00 Hz');
    jint.setAlg('KG2');
    assert(!jint.hasPos());
    assert.strictEqual(jint.getTuningFreqHz(), 278);
    assert.strictEqual(jint.getTuningMultHz().toFixed(2), '269.70');
    jint.setStartPitchNotation('G5');
    assert(jint.hasPos());
    assert.strictEqual(jint.getStartFreqText(), '809.09 Hz');
    assert.strictEqual(jint.getEndFreqText(), '1011.36 Hz');
    jint.setAlg('');
    assert(!jint.hasAlg());
    assert(!jint.hasPos());
    assert.strictEqual(jint.getTuningFreqHz(), 278);
    assert.strictEqual(jint.getTuningMultHz().toFixed(2), '273.38');
    jint.setStartPitchNotation('G5');
    assert(jint.hasPos());
    assert.strictEqual(jint.getStartFreqText(), '820.13 Hz');
    assert.strictEqual(jint.getEndFreqText(), '1025.16 Hz');
    jint.setAlg('DR');
    assert(jint.hasAlg());
    assert(!jint.hasPos());
    assert.strictEqual(jint.getTuningFreqHz(), 278);
    assert.strictEqual(jint.getTuningMultHz().toFixed(2), '273.38');
    jint.setStartPitchNotation('G5');
    assert(jint.hasPos());
    assert.strictEqual(jint.getStartFreqText(), '820.13 Hz');
    assert.strictEqual(jint.getEndFreqText(), '1025.16 Hz');
  });

  it('sets alg correctly using a jint from another jint from empty arguments', function () {
    var jint = new JInterval();
    var jint2 = new JInterval(jint);
    assert.strictEqual(jint.getAlgText(), '');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
    assert.strictEqual(jint2.getAlgText(), '');
    assert.strictEqual(jint2.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint from another jint with alg set by name', function () {
    var jint = new JInterval(1, 'SAG');
    var jint2 = new JInterval(jint);
    assert.strictEqual(jint.getAlgText(), 'SAG');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaSAG');
    assert.strictEqual(jint2.getAlgText(), 'SAG');
    assert.strictEqual(jint2.getAlgFn().name, 'getCommaSAG');
  });

  it('sets alg correctly using a jint with alg set by named function', function () {
    var jint = new JInterval(1, identityFn);
    assert.strictEqual(jint.getAlgText(), 'CUSTOM');
    assert.strictEqual(jint.getAlgFn().name, 'identityFn');
  });

  it('sets alg correctly using a jint from another jint with alg set by object with fn, name', function () {
    var jint = new JInterval(1, {txt: 'ID', fn: identityFn});
    var jint2 = new JInterval(jint);
    assert.strictEqual(jint.getAlgText(), 'ID');
    assert.strictEqual(jint.getAlgFn().name, 'identityFn');
    assert.strictEqual(jint2.getAlgText(), 'ID');
    assert.strictEqual(jint2.getAlgFn().name, 'identityFn');
  });

  it('sets alg correctly using a jint with alg set by object with fn only', function () {
    var jint = new JInterval(1, {fn: identityFn});
    assert.strictEqual(jint.getAlgText(), 'CUSTOM');
    assert.strictEqual(jint.getAlgFn().name, 'identityFn');
  });

  it('sets alg correctly using a jint with alg set by object with name, wrong fn', function () {
    var jint = new JInterval(1, {txt: 'Kg', fn: identityFn});
    assert.strictEqual(jint.getAlgText(), 'KG2');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaKG2');
  });

  it('sets alg correctly using a jint with invalid alg true (boolean)', function () {
    var jint = new JInterval(1, true);
    assert.strictEqual(jint.getAlgText(), '');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint with invalid alg /a/g (regex)', function () {
    var jint = new JInterval(1, /a/g);
    assert.strictEqual(jint.getAlgText(), '');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint with alg acronym that produces invalid alg fn', function () {
    var jint = new JInterval(1, 'EMP');
    assert.strictEqual(jint.getAlgText(), 'EMP');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint with alg object with txt acronym that produces invalid alg fn', function () {
    var jint = new JInterval(1, {txt: 'EMP'});
    assert.strictEqual(jint.getAlgText(), 'EMP');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint copied from a jint with alg set by object with fn, name', function () {
    var jint = new JInterval(1, {txt: 'ID', fn: identityFn});
    var jint2 = jint.copy();
    assert.strictEqual(jint.getAlgText(), 'ID');
    assert.strictEqual(jint.getAlgFn().name, 'identityFn');
    assert.strictEqual(jint2.getAlgText(), 'ID');
    assert.strictEqual(jint2.getAlgFn().name, 'identityFn');
  });
});
