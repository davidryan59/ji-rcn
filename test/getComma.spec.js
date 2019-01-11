/* eslint-disable func-names */

var assert = require('assert');
var Peo = require('peo');

var testIndex = require('./_test_index');
var getComma = testIndex.getComma;

var fnName = 'getComma';
describe(fnName, function () {
  it('gives 80/81 for getComma(5)', function () {
    var result = getComma(5);
    assert.strictEqual(result.getAsFractionText(), '80/81');
  });

  it('gives default for getComma(5.01)', function () {
    var result = getComma(5.01);
    assert.strictEqual(result.getAsFractionText(), '1');
  });

  it('gives default for getComma("aString")', function () {
    var result = getComma('aString');
    assert.strictEqual(result.getAsFractionText(), '1');
  });

  it('gives default for getComma(2)', function () {
    var result = getComma(2);
    assert.strictEqual(result.getAsFractionText(), '1');
  });

  it("doesn't give default for getComma(5e15)", function () {
    var result = getComma(5e15);
    assert(result.getPrimeExp(2) !== 0);
  });

  it('gives default for getComma(5e15+1)', function () {
    var result = getComma(5e15 + 1);
    assert.strictEqual(result.getAsFractionText(), '1');
  });

  it('comma alg EMP (covers a branch)', function () {
    var result = getComma(5, 'EMP');
    assert.strictEqual(result.getAsFractionText(), '80/81');
  });

  it('comma alg NUL (covers a branch)', function () {
    var result = getComma(5, 'NUL');
    assert.strictEqual(result.getAsFractionText(), '80/81');
  });

  it('can supply a valid prime comma algorithm, outputting Peos', function () {
    var result = getComma(5, function (p) {return new Peo(p);});
    assert.strictEqual(result.getAsFractionText(), '5');
  });

  it('if invalid algorithm supplied (returning non-Peos), use default algorithm', function () {
    var result = getComma(5, function () {return 'Puppies';});
    assert.strictEqual(result.getAsFractionText(), '80/81');
  });
});
