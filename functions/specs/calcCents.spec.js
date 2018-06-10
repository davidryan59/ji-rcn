var assert = require('assert')
var Fraction = require('fraction.js')
var calcCents = require('../calcCents.js')

describe('calcCents', function() {

  it("1/1", function() {
    assert.strictEqual(calcCents(Fraction(1,1)), 0)
  })
  it("-1/1", function() {
    assert.strictEqual(calcCents(Fraction(-1,1)), 0)
  })
  it("2/1", function() {
    assert.strictEqual(calcCents(Fraction(2, 1)), 1200)
  })
  it("1/16", function() {
    assert.strictEqual(calcCents(Fraction(1, 16)), -4800)
  })
  it("3/2", function() {
    var expected = calcCents(Fraction(3, 2))
    var actual = 701.955        // 701.9550008653874
    assert(Math.abs(expected-actual)<1e-6)
  })

})
