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

  it('getComma(77) is 1 (since 77 is composite)', function () {
    var result = getComma(77);
    assert.strictEqual(result.getAsFractionText(), '1');
  });

  it('comma alg EMP (covers a branch)', function () {
    var result = getComma(5, 'EMP');
    assert.strictEqual(result.getAsFractionText(), '80/81');
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

  // Test an algorithm that produces commas with primes other than 2, 3, p
  it('test ADJ algorithm on p=43 (follows DR alg)', function () {
    var result = getComma(43, 'ADJ');
    assert.deepStrictEqual(result.getPrimeExps(), {2: -7, 3: 1, 43: 1});
  });

  it('test ADJ algorithm on p=47 (diverges from DR alg)', function () {
    var result = getComma(47, 'ADJ');
    assert.deepStrictEqual(result.getPrimeExps(), {2: -4, 3: -1, 47: 1});
  });

  it('test ADJ algorithm on p=59 (uses 2, 3, 5, 59)', function () {
    var result = getComma(59, 'ADJ');
    assert.deepStrictEqual(result.getPrimeExps(),  {2: -2, 3: -1, 5: -1, 59: 1});
  });

  it('test ADJ algorithm on p=77 (not prime))', function () {
    var result = getComma(77, 'ADJ');
    assert.deepStrictEqual(result.getPrimeExps(), {});
  });

  it('test ADJ algorithm on p=463 (uses 2, 3, 7, 11, 463)', function () {
    var result = getComma(463, 'ADJ');
    assert.deepStrictEqual(result.getPrimeExps(), {2: -1, 3: -1, 7: -1, 11: -1, 463: 1});
  });
});
