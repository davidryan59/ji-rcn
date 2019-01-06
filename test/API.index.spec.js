var assert = require('assert');

var test_index = require('./_test_index');
var module_index = test_index.ji;

describe('API (index object) for ji-rcn (via variable `ji`)', function() {

  it('module_index.jinterval makes JInterval class available', function() {
    assert.strictEqual(module_index.jinterval.getComma(5).getText(), "80/81")
  })

  it('module_index.JInterval makes JInterval class available', function() {
    assert.strictEqual(module_index.JInterval.getComma(5).getText(), "80/81")
  })

  it('module_index.getComma function available', function() {
    assert.strictEqual(module_index.getComma(7).getText(), "63/64")
  })

})
