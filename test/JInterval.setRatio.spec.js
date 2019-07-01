/* eslint-disable func-names */

var assert = require('assert');
var Peo = require('peo');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;

describe('jint.setRatio works', function () {
  it('setRatio works with another jint (1.5 -> 1.6)', function () {
    var jint1 = new JInterval(1.5);
    var jint2 = new JInterval(1.6);
    jint1.getEndPitchNotation();
    assert.strictEqual(jint1.ratioFractionText(), '3/2');
    assert.strictEqual(jint2.ratioFractionText(), '8/5');
    assert(jint1.ratioPeo().notEquals(jint2.ratioPeo()));
    assert(jint1.hasPos());
    // Do the set
    jint1.setRatio(jint2);
    // Test the outcome
    assert(!jint1.hasPos());
    assert(jint1 !== jint2);
    // Interval ratios (peo objects) should be different object but same value
    assert(jint1.peo !== jint2.peo);
    assert(jint1.ratioPeo().equals(jint2.ratioPeo()));
  });

  it('setRatio works with a peo (1.7 -> 1.8)', function () {
    var jint1 = new JInterval(1.7);
    var peo2 = new Peo(1.8);
    jint1.getEndPitchNotation();
    assert.strictEqual(jint1.ratioFractionText(), '17/10');
    assert.strictEqual(peo2.getAsFractionText(), '9/5');
    assert(jint1.ratioPeo().notEquals(peo2));
    assert(jint1.hasPos());
    // Do the set
    jint1.setRatio(peo2);
    // Test the outcome
    assert(!jint1.hasPos());
    assert(jint1.peo !== peo2);
    assert(jint1.ratioPeo().equals(peo2));
  });

  it('setRatio works with integer (3/7 -> 19)', function () {
    var jint = new JInterval(3 / 7);
    jint.getEndPitchNotation();
    assert.strictEqual(jint.ratioFractionText(), '3/7');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio(19);
    // Test the outcome
    assert(!jint.hasPos());
    assert.strictEqual(jint.ratioFractionText(), '19');
  });

  it('setRatio works with fraction in 2 arguments with no common factor (9/7 -> 23/37)', function () {
    var jint = new JInterval(9 / 7);
    jint.getEndPitchNotation();
    assert.strictEqual(jint.ratioFractionText(), '9/7');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio(23, 37);
    // Test the outcome
    assert(!jint.hasPos());
    assert.strictEqual(jint.ratioFractionText(), '23/37');
  });

  it('setRatio works with fraction in 2 arguments with common factor (10/7 -> 24/36 = 2/3)', function () {
    var jint = new JInterval(10 / 7);
    jint.getEndPitchNotation();
    assert.strictEqual(jint.ratioFractionText(), '10/7');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio(24, 36);
    // Test the outcome
    assert(!jint.hasPos());
    assert.strictEqual(jint.ratioFractionText(), '2/3');
  });

  it('setRatio works with positive decimal (1.2 -> 1.3)', function () {
    var jint = new JInterval(1.2);
    jint.getEndPitchNotation();
    assert.strictEqual(jint.ratioFractionText(), '6/5');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio(1.3);
    // Test the outcome
    assert(!jint.hasPos());
    assert.strictEqual(jint.ratioFractionText(), '13/10');
  });

  it("setRatio works with pair of notations (99/78 -> 2/3 via C'5, F.'.''4)", function () {
    var jint = new JInterval(99 / 78);
    jint.getEndPitchNotation();
    assert.strictEqual(jint.ratioFractionText(), '33/26');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio("C'5", "F.'.''4");   // Position will be recalculated here
    // Test the outcome
    assert(jint.hasPos());      // Previous position info retained
    assert.strictEqual(jint.ratioFractionText(), '2/3');
  });

  it('setRatio works with decimal number in string format (200/3 -> 1.23)', function () {
    var jint = new JInterval(200 / 3);
    jint.getEndPitchNotation();
    assert.strictEqual(jint.ratioFractionText(), '200/3');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio('1.23');
    // Test the outcome
    assert(!jint.hasPos());
    assert.strictEqual(jint.ratioFractionText(), '123/100');
  });

  it('setRatio works with fraction in string format (100/3 -> 5/4)', function () {
    var jint = new JInterval(100 / 3);
    jint.getEndPitchNotation();
    var prevPeo = jint.ratioPeo();
    assert.strictEqual(jint.ratioFractionText(), '100/3');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio('5/4');
    // Test the outcome
    assert(!jint.hasPos());
    assert(prevPeo !== jint.ratioPeo());
    assert.strictEqual(jint.ratio(), 1.25);
  });

  it('setRatio works with {p1:n1, p2:n2...} (100/7 -> 8*7/23)', function () {
    var jint = new JInterval(100 / 7);
    jint.getEndPitchNotation();
    assert.strictEqual(jint.ratioFractionText(), '100/7');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio({2: 3, 7: 1, 23: -1});
    // Test the outcome
    assert(!jint.hasPos());
    assert.strictEqual(jint.ratioFractionText(), '56/23');
  });

  it('cover case non-recognised input (e.g. a function) (3/2 -> ()=>null )', function () {
    var jint = new JInterval(3 / 2);
    jint.getEndPitchNotation();
    var prevPeo = jint.ratioPeo();
    assert.strictEqual(jint.ratioFractionText(), '3/2');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio(() => null);    // Previous peo should be retained, position shouldn't be wiped
    // Test the outcome
    assert(jint.hasPos());   // Position should be retained here
    assert(prevPeo === jint.ratioPeo());
    assert.strictEqual(jint.ratioFractionText(), '3/2');
  });

  it('cover case non-recognised object (5/7 -> {ratio:42} which is invalid format)', function () {
    var jint = new JInterval(5 / 7);
    jint.getEndPitchNotation();
    var prevPeo = jint.ratioPeo();
    assert.strictEqual(jint.ratioFractionText(), '5/7');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio({ratio: 42});    // This format not allowed for setRatio. Does nothing
    // Test the outcome
    assert(jint.hasPos());   // Position retained
    assert(prevPeo === jint.ratioPeo());  // Peo retained
    assert.strictEqual(jint.ratioFractionText(), '5/7');
  });

  it('cover case of no arguments (5/8 -> undefined)', function () {
    var jint = new JInterval(5 / 8);
    jint.getEndPitchNotation();
    var prevPeo = jint.ratioPeo();
    assert.strictEqual(jint.ratioFractionText(), '5/8');
    assert(jint.hasPos());
    // Do the set
    jint.setRatio();      // Should do nothing
    // Test the outcome
    assert(jint.hasPos());      // Position, peo retained
    assert(prevPeo === jint.ratioPeo());
    assert.strictEqual(jint.ratioFractionText(), '5/8');
  });
});
