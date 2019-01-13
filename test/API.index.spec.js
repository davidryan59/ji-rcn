/* eslint-disable func-names */

var assert = require('assert');

var testIndex = require('./_test_index');
var moduleIndex = testIndex.ji;

describe('API (index object) for ji-rcn (via variable `ji`)', function () {
  it('module_index.jinterval makes JInterval class available', function () {
    assert.strictEqual(moduleIndex.jinterval.getComma(5).getAsFractionText(), '80/81');
  });

  it('module_index.JInterval makes JInterval class available', function () {
    assert.strictEqual(moduleIndex.JInterval.getComma(5).getAsFractionText(), '80/81');
  });

  it('module_index.getComma function available', function () {
    assert.strictEqual(moduleIndex.getComma(7).getAsFractionText(), '63/64');
  });

  it('module_index.JInterval.getCommaAlgs object available', function () {
    var drKey = 'DR';
    assert.strictEqual(moduleIndex.JInterval.getCommaAlgs[drKey](139).getAsFractionText(), '2224/2187');
  });

  it('module_index.getCommaAlgs object available', function () {
    var sagKey = 'SAG';
    assert.strictEqual(moduleIndex.getCommaAlgs[sagKey](139).getAsFractionText(), '139/144');
    var defaultKey = 'DEFAULT_ALG';
    assert.strictEqual(moduleIndex.getCommaAlgs[defaultKey](139).getAsFractionText(), '2224/2187');
    assert(!moduleIndex.getCommaAlgs.NUL);
  });
});
