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
});
