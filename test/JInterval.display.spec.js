/* eslint-disable func-names */

var assert = require('assert');
var Peo = require('peo');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;


describe('Display functions on JInterval', function () {
  it('removeDisplay works', function () {
    var jint = new JInterval(1);
    assert(!jint.hasDisplay());
    jint.setDisplay();    // Case where there is nothing to remove
    assert(!jint.hasDisplay());
    jint.setDisplay({comMax: 100});
    assert(jint.hasDisplay());
    jint.setDisplay();    // Case where there is something to remove
    assert(!jint.hasDisplay());
  });

  it('setDisplay works', function () {
    var jint = new JInterval({ratio: 35 / 32});
    assert(!jint.hasDisplay());
    assert(!jint.hasPos());
    jint.setStartPitchNotation("E'3");
    assert(jint.hasPos());
    assert.strictEqual(jint.getStartPitchNotation(), "E'3");
    assert.strictEqual(jint.getEndPitchNotation(), "F#''[7]3");
    assert.strictEqual(jint.getStartFreqText(), '160.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '175.00 Hz');
    jint.setDisplay({hide5: true});
    assert(jint.hasDisplay());
    assert(!jint.hasPos());
    jint.setStartPitchNotation("E'3");
    assert(jint.hasPos());
    assert.strictEqual(jint.getStartPitchNotation(), 'E[5]3');
    assert.strictEqual(jint.getEndPitchNotation(), 'F#[175]3');
    assert.strictEqual(jint.getStartFreqText(), '160.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '175.00 Hz');
    jint.setDisplay('');
    assert(!jint.hasDisplay());
    assert(!jint.hasPos());
    jint.setStartPitchNotation("E'3");
    assert(jint.hasPos());
    assert.strictEqual(jint.getStartPitchNotation(), "E'3");
    assert.strictEqual(jint.getEndPitchNotation(), "F#''[7]3");
    assert.strictEqual(jint.getStartFreqText(), '160.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '175.00 Hz');
    jint.setDisplay({hide5: true, comMax: 1});
    assert(jint.hasDisplay());
    assert(!jint.hasPos());
    jint.setStartPitchNotation("E'3");
    assert(jint.hasPos());
    assert.strictEqual(jint.getStartPitchNotation(), 'E[5]3');
    assert.strictEqual(jint.getEndPitchNotation(), 'F#3 [25 7]');
    assert.strictEqual(jint.getStartFreqText(), '160.00 Hz');
    assert.strictEqual(jint.getEndFreqText(), '175.00 Hz');
  });

  it('Test several options switched on', function () {
    var jint = new JInterval({
      display: {hide5: true, lev12: true, lev53: true, lev665: true, lev190537: true},
      ratio: 1
    });
    var opts = jint.getSetupObject();
    assert.strictEqual(opts.display.hide5, true);
    assert.strictEqual(opts.display.lev12, 12);
    assert.strictEqual(opts.display.lev53, 53);
    assert.strictEqual(opts.display.lev665, 665);
    assert.strictEqual(opts.display.lev190537, 190537);
  });

  it('Test several options switched off', function () {
    var jint = new JInterval({
      display: {hide5: false, lev12: false, lev53: false, lev665: false, lev190537: false},
      ratio: 1
    });
    var opts = jint.getSetupObject();
    assert.deepStrictEqual(opts, {});
  });

  it('Test one option on', function () {
    var jint = new JInterval({
      display: {hide5: true},
      ratio: 1
    });
    var opts = jint.getSetupObject();
    assert.deepStrictEqual(opts.display, {hide5: true});
  });

  it('Test only lev53 display option set to 49, others off', function () {
    var jint = new JInterval({
      display: {lev53: 49},
      ratio: 1
    });
    var opts = jint.getSetupObject();
    assert.deepStrictEqual(opts.display, {lev53: 49});
  });

  it('Test only lev665 display option set too low (332), others off', function () {
    // Level must be between 0.5x and 2x default level
    // For 665, that means between 333 and 1330.
    // Otherwise, use default level.
    var jint = new JInterval({
      display: {lev665: 332},
      ratio: 1
    });
    var opts = jint.getSetupObject();
    assert.deepStrictEqual(opts.display, {lev665: 665});
  });

  it("Test that E'4 when displayed with syntonic commas shortcut off is E[5]4", function () {
    var jint = new JInterval({
      display: {hide5: true},
      startPitchNotation: 'C4',
      endPitchNotation: "E'4"
    });
    assert.deepStrictEqual(jint.getEndPitchNotation(), 'E[5]4');
  });

  it('Test that mercator comma Cm4, when displayed using (only) Pythagorean commas on, displays as Bpppp3', function () {
    var jint = new JInterval({
      display: {lev12: true},
      startPitchNotation: 'C4',
      endPitchNotation: 'Cm4'
    });
    assert.deepStrictEqual(jint.getEndPitchNotation(), 'Bpppp3');
  });

  it("Test that the small interval 3^1000000/2^1584962 uses all the higher Pythag commas (it's E#pppm(s71)(t5)4)", function () {
    var jint = new JInterval({
      display: {lev12: true, lev53: true, lev665: true, lev190537: true},
      peo: new Peo({3: 1000000, 2: -1584962})
    });
    assert.deepStrictEqual(jint.getEndPitchNotation(), 'E#pppm(s71)(t5)4');
  });

  it('Same as previous test, but copying the original JInterval, and some tweaks on the display options', function () {
    var jint1 = new JInterval({
      display: {hide5: true, lev12: 13, lev53: 52, lev665: 667, lev190537: 190538},
      peo: new Peo({3: 1000000, 2: -1584962})
    });
    var jint2 = new JInterval(jint1);
    // As it happens, these slightly different options give the same notation
    // lev12:11 would give a different notation!
    assert.deepStrictEqual(jint2.getEndPitchNotation(), 'E#pppm(s71)(t5)4');
  });

  it("Test comMax=300 ([299] doesn't split into [13][23])", function () {
    var jint = new JInterval({
      display: {comMax: 300},
      ratio: 299 / 256
    });
    assert.deepStrictEqual(jint.getEndPitchNotation(), 'D#[299]4');
  });

  it('Test comMax=300 ([301] does split into [7][41])', function () {
    var jint = new JInterval({
      display: {comMax: 300},
      ratio: 301 / 256
    });
    assert.deepStrictEqual(jint.getEndPitchNotation(), 'Eb4 [7 43]');
  });

  it('Test comMax=300 with copy JInterval to cover a branch ([301] again)', function () {
    var jint1 = new JInterval({
      display: {comMax: 300},
      ratio: 301 / 256
    });
    var jint2 = new JInterval(jint1);
    // This covers the setup object fully
    // When doing new JInterval on an existing JInterval, a copy should be obtained.
    assert.deepStrictEqual(jint2.getEndPitchNotation(), 'Eb4 [7 43]');
  });

  it('Test display:{reps:7} on 7 flats get bbbbbbb', function () {
    var jint1 = new JInterval({
      display: {reps: 7},
      startPitchNotation: 'C4',
      endPitchNotation: 'Cbbbbbbb#b4'
    });
    var jint2 = new JInterval(jint1);
    assert.deepStrictEqual(jint2.getEndPitchNotation(), 'Cbbbbbbb4');
  });

  it('Test display:{reps:7} on 8 flats get (b8)', function () {
    var jint1 = new JInterval({
      display: {reps: 7},
      startPitchNotation: 'C4',
      endPitchNotation: 'Cbbbbbbbb#b4'
    });
    var jint2 = new JInterval(jint1);
    assert.deepStrictEqual(jint2.getEndPitchNotation(), 'C(b8)4');
  });
});
