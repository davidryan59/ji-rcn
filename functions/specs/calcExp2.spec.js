var assert = require('assert')
var calcExp2 = require('../calcExp2.js')

describe('calcExp2', function() {

  it("80/81", function() {
    assert.strictEqual(calcExp2(5, -4), 4)
  })
  it("63/64", function() {
    assert.strictEqual(calcExp2(7, 2), -6)
  })
  it("3/4", function() {
    assert.strictEqual(calcExp2(3, 0), -2)
  })
  it("5/6", function() {
    assert.strictEqual(calcExp2(5, -1), -1)
  })
  it("69/64", function() {
    assert.strictEqual(calcExp2(23, 1), -6)
  })

})
