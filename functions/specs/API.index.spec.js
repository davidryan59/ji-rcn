var assert = require('assert')

var ji = require('../../index')

describe('API (index object) for ji-rcn (via variable `ji`)', function() {

  it('ji.jinote makes Jinote class available', function() {
    assert.strictEqual(ji.jinote.getComma(5).getText(), "80/81")
  })

  it('ji.Jinote makes Jinote class available', function() {
    assert.strictEqual(ji.Jinote.getComma(5).getText(), "80/81")
  })

  it('ji.getComma function available', function() {
    assert.strictEqual(ji.getComma(7).getText(), "63/64")
  })

  it('ji.parseNotation function available', function() {
    assert.strictEqual(ji.parseNotation("E'5").getText(), "5/2")
  })

})
