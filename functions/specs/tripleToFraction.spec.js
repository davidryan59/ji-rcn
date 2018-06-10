var assert = require('assert')
var Fraction = require('fraction.js')
var tripleToFraction = require('../tripleToFraction.js')

describe('tripleToFraction', function() {

  it("1/1", function() {
    assert.deepStrictEqual(tripleToFraction(1, 0, 0), Fraction(1, 1))
  })
  it("2/3", function() {
    assert.deepStrictEqual(tripleToFraction(1, 1, -1), Fraction(2, 3))
  })
  it("127/128", function() {
    assert.deepStrictEqual(tripleToFraction(127, -7, 0), Fraction(127, 128))
  })
  it("23/27", function() {
    assert.deepStrictEqual(tripleToFraction(23, 0, -3), Fraction(23, 27))
  })
  it("80/81", function() {
    assert.deepStrictEqual(tripleToFraction(5, 4, -4), Fraction(80, 81))
  })

})
