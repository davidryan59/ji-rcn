var assert = require('assert');

var index = require('./index');
var ji = index.ji;

describe('API (index object) for ji-rcn (via variable `ji`)', function() {

  it('ji.jinterval makes JInterval class available', function() {
    assert.strictEqual(ji.jinterval.getComma(5).getText(), "80/81")
  })

  it('ji.JInterval makes JInterval class available', function() {
    assert.strictEqual(ji.JInterval.getComma(5).getText(), "80/81")
  })

  it('ji.getComma function available', function() {
    assert.strictEqual(ji.getComma(7).getText(), "63/64")
  })

  it('ji.parseNotation function available', function() {
    assert.strictEqual(ji.parseNotation("E'5").getText(), "5/2")
  })

})
