/* eslint-disable func-names */

var assert = require('assert');
var Peo = require('peo');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;

describe('jint.setRatio works', function () {
  it('setRatio works with another jint', function () {
    var jint1 = new JInterval(1.5);
    var jint2 = new JInterval(1.6);
    assert.strictEqual(jint1.ratioFractionText(), '3/2');
    assert.strictEqual(jint2.ratioFractionText(), '8/5');
    assert(jint1.ratioPeo().notEquals(jint2.ratioPeo()));
    jint1.setRatio(jint2);
    assert(jint1 !== jint2);
    // Interval ratios (peo objects) should be different object but same value
    assert(jint1.peo !== jint2.peo);
    assert(jint1.ratioPeo().equals(jint2.ratioPeo()));
  });

  it('setRatio works with a peo', function () {
    var jint1 = new JInterval(1.7);
    var peo2 = new Peo(1.8);
    assert.strictEqual(jint1.ratioFractionText(), '17/10');
    assert.strictEqual(peo2.getAsFractionText(), '9/5');
    assert(jint1.ratioPeo().notEquals(peo2));
    jint1.setRatio(peo2);
    assert(jint1.peo !== peo2);
    assert(jint1.ratioPeo().equals(peo2));
  });

  it('setRatio works with integer', function () {
    var jint = new JInterval(3 / 7);
    assert.strictEqual(jint.ratioFractionText(), '3/7');
    jint.setRatio(19);
    assert.strictEqual(jint.ratioFractionText(), '19');
  });

  it('setRatio works with fraction in 2 arguments with no common factor', function () {
    var jint = new JInterval(9 / 7);
    assert.strictEqual(jint.ratioFractionText(), '9/7');
    jint.setRatio(23, 37);
    assert.strictEqual(jint.ratioFractionText(), '23/37');
  });

  it('setRatio works with fraction in 2 arguments with common factor', function () {
    var jint = new JInterval(10 / 7);
    assert.strictEqual(jint.ratioFractionText(), '10/7');
    jint.setRatio(24, 36);
    assert.strictEqual(jint.ratioFractionText(), '2/3');
  });

  it('setRatio works with positive decimal', function () {
    var jint = new JInterval(1.2);
    assert.strictEqual(jint.ratioFractionText(), '6/5');
    jint.setRatio(1.3);
    assert.strictEqual(jint.ratioFractionText(), '13/10');
  });

  it('setRatio works with pair of notations', function () {
    var jint = new JInterval(99 / 78);
    assert.strictEqual(jint.ratioFractionText(), '33/26');
    jint.setRatio("C'5", "F.'.''4");
    assert.strictEqual(jint.ratioFractionText(), '2/3');
  });

  it('setRatio works with decimal number in string format', function () {
    var jint = new JInterval(200 / 3);
    assert.strictEqual(jint.ratioFractionText(), '200/3');
    jint.setRatio('1.23');
    assert.strictEqual(jint.ratioFractionText(), '123/100');
  });

  it('setRatio works with fraction in string format', function () {
    var jint = new JInterval(100 / 3);
    assert.strictEqual(jint.ratioFractionText(), '100/3');
    var prevPeo = jint.ratioPeo();
    jint.setRatio('5/4');
    assert(prevPeo !== jint.ratioPeo());
    assert.strictEqual(jint.ratio(), 1.25);
  });

  it('setRatio works with {p1:n1, p2:n2...}', function () {
    var jint = new JInterval(100 / 7);
    assert.strictEqual(jint.ratioFractionText(), '100/7');
    jint.setRatio({2: 3, 7: 1, 23: -1});
    assert.strictEqual(jint.ratioFractionText(), '56/23');
  });

  it('cover case non-recognised input (e.g. a function)', function () {
    var jint = new JInterval(3 / 2);
    assert.strictEqual(jint.ratioFractionText(), '3/2');
    var prevPeo = jint.ratioPeo();
    jint.setRatio(() => null);
    assert(prevPeo === jint.ratioPeo());
    assert.strictEqual(jint.ratioFractionText(), '3/2');
  });

  it('cover case non-recognised object', function () {
    var jint = new JInterval(5 / 7);
    assert.strictEqual(jint.ratioFractionText(), '5/7');
    var prevPeo = jint.ratioPeo();
    jint.setRatio({ratio: 42});    // This format not allowed for setRatio
    assert(prevPeo === jint.ratioPeo());
    assert.strictEqual(jint.ratioFractionText(), '5/7');
  });

  it('cover case of no arguments', function () {
    var jint = new JInterval(5 / 8);
    assert.strictEqual(jint.ratioFractionText(), '5/8');
    var prevPeo = jint.ratioPeo();
    jint.setRatio();
    assert(prevPeo === jint.ratioPeo());
    assert.strictEqual(jint.ratioFractionText(), '5/8');
  });
});
