var assert = require('assert')

var jircn = require('../../index')

describe('API (index object) for ji-rcn', function() {

  it('jircn.jinote works', function() {
    assert.strictEqual(jircn.jinote.getComma(5).getText(), "80/81")
  })

  it('jircn.getComma works', function() {
    assert.strictEqual(jircn.getComma(7).getText(), "63/64")
  })

})
