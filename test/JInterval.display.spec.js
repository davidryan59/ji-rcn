/* eslint-disable func-names */

var assert = require('assert');
var Peo = require('peo');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;


describe('Display functions on JInterval', function () {
  it('Test options when all switched on', function () {
    var jint1a = new JInterval({
      display: {hide5: true, lev12: true, lev53: true, lev665: true, lev190537: true},
      ratio: 1
    });
    var options1a = jint1a.getSetupObject();
    assert.strictEqual(options1a.display.hide5, true);
    assert.strictEqual(options1a.display.lev12, 12);
    assert.strictEqual(options1a.display.lev53, 53);
    assert.strictEqual(options1a.display.lev665, 665);
    assert.strictEqual(options1a.display.lev190537, 190537);
  });

  it('Test options when all switched off', function () {
    var jint1b = new JInterval({
      display: {hide5: false, lev12: false, lev53: false, lev665: false, lev190537: false},
      ratio: 1
    });
    var options1b = jint1b.getSetupObject();
    assert.deepStrictEqual(options1b, {});
  });

  it('Test only hide5 display option on, others off', function () {
    var jint1b = new JInterval({
      display: {hide5: true},
      ratio: 1
    });
    var options1b = jint1b.getSetupObject();
    assert.deepStrictEqual(options1b.display, {hide5: true});
  });

  it('Test only lev53 display option set to 49, others off', function () {
    var jint1b = new JInterval({
      display: {lev53: 49},
      ratio: 1
    });
    var options1b = jint1b.getSetupObject();
    assert.deepStrictEqual(options1b.display, {lev53: 49});
  });

  it('Test only lev665 display option set too low (332), others off', function () {
    // Level must be between 0.5x and 2x default level
    // For 665, that means between 333 and 1330.
    // Otherwise, use default level.
    var jint1b = new JInterval({
      display: {lev665: 332},
      ratio: 1
    });
    var options1b = jint1b.getSetupObject();
    assert.deepStrictEqual(options1b.display, {lev665: 665});
  });

  it("Test that E'4 when displayed with syntonic commas shortcut off is E[5]4", function () {
    var jint1b = new JInterval({
      display: {hide5: true},
      startPitchNotation: 'C4',
      endPitchNotation: "E'4"
    });
    assert.deepStrictEqual(jint1b.getEndPitchNotation(), 'E[5]4');
  });

  it('Test that mercator comma Cm4, when displayed using (only) Pythagorean commas on, displays as Bpppp3', function () {
    var jint1b = new JInterval({
      display: {lev12: true},
      startPitchNotation: 'C4',
      endPitchNotation: 'Cm4'
    });
    assert.deepStrictEqual(jint1b.getEndPitchNotation(), 'Bpppp3');
  });

  it("Test that the small interval 3^1000000/2^1584962 uses all the higher Pythag commas (it's E#pppm(s71)(t5)4)", function () {
    var jint1b = new JInterval({
      display: {lev12: true, lev53: true, lev665: true, lev190537: true},
      peo: new Peo({3: 1000000, 2: -1584962})
    });
    jint1b.getEndPitchNotation();
    assert.deepStrictEqual(jint1b.getEndPitchNotation(), 'E#pppm(s71)(t5)4');
  });

  it('Same as previous test, but copying the original JInterval, and some tweaks on the display options', function () {
    var jint1b = new JInterval({
      display: {hide5: true, lev12: 13, lev53: 52, lev665: 667, lev190537: 190538},
      peo: new Peo({3: 1000000, 2: -1584962})
    });
    jint1b.getEndPitchNotation();
    var jint2 = new JInterval(jint1b);
    // As it happens, these slightly different options give the same notation
    // lev12:11 would give a different notation!
    assert.deepStrictEqual(jint2.getEndPitchNotation(), 'E#pppm(s71)(t5)4');
  });
});
