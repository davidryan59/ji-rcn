var assert = require('assert')
var Fraction = require('fraction.js')
var getComma = require('../getComma.js')

describe('getComma', function() {

  // Test some degenerate cases
  var defaultValue = Fraction(1,1)
  it("Gives default for string input", function() {
    assert.deepStrictEqual(getComma("Not a number"), defaultValue)
  })
  it("Gives default for null input", function() {
    assert.deepStrictEqual(getComma(null), defaultValue)
  })
  it("Gives default for boolean input", function() {
    assert.deepStrictEqual(getComma(true), defaultValue)
  })
  it("Gives default for Infinity input", function() {
    assert.deepStrictEqual(getComma(Infinity), defaultValue)
  })
  it("Gives default for very large integer, beyond range of precision", function() {
    assert.deepStrictEqual(getComma(1e16), defaultValue)
  })
  it("Gives default for number under 5 (e.g. 3)", function() {
    assert.deepStrictEqual(getComma(3), defaultValue)
  })

  it("Gives 2224/2187 for prime 139 (default algorithm, which is DR)", function() {
    assert.deepStrictEqual(getComma(139), Fraction(2224, 2187))
  })
  it("Gives 2224/2187 for prime 139 (DR algorithm selected)", function() {
    assert.deepStrictEqual(getComma(139, "DR"), Fraction(2224, 2187))
  })
  it("Gives 139/144 for prime 139 (SAG algorithm selected)", function() {
    assert.deepStrictEqual(getComma(139, "SAG"), Fraction(139, 144))
  })
  it("Gives 33777/32768 for prime 139 (KG2 algorithm selected)", function() {
    assert.deepStrictEqual(getComma(139, "KG2"), Fraction(33777, 32768))
  })

})
