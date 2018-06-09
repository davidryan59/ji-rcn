var assert = require('assert')
var commaToText = require('../../index.js').commaToText

describe('commaToText', function() {
  it("3/4", function() {
    assert.strictEqual(commaToText([3, 4]),"3/4")
  })
  it("6/8", function() {
    assert.strictEqual(commaToText([6, 8]),"6/8")
  })
  it("1/1", function() {
    assert.strictEqual(commaToText([1, 1]),"1/1")
  })
  it("2/1", function() {
    assert.strictEqual(commaToText([2, 1]),"2/1")
  })
  it("135798642/243546", function() {
    assert.strictEqual(commaToText([135798642, 243546]),"135798642/243546")
  })
})
