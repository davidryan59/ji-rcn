var assert = require('assert')
var primeToComma = require('../../index.js').primeToComma

describe('primeToComma', function() {

  // Test some degenerate cases
  it("Gives default for string input", function() {
    assert.deepStrictEqual(primeToComma("Not a number"), [1, 1])
  })
  it("Gives default for null input", function() {
    assert.deepStrictEqual(primeToComma(null), [1, 1])
  })
  it("Gives default for boolean input", function() {
    assert.deepStrictEqual(primeToComma(true), [1, 1])
  })
  it("Gives default for Infinity input", function() {
    assert.deepStrictEqual(primeToComma(Infinity), [1, 1])
  })
  it("Gives default for very large integer, beyond range of precision", function() {
    assert.deepStrictEqual(primeToComma(1e16), [1, 1])
  })

  // detailed test
  it("Gives [2224, 2187] for prime 139 (DR algorithm)", function() {
    var result = primeToComma(139)
    assert(Array.isArray(result))
    assert.equal(result.length, 2)
    assert.deepStrictEqual(result, [2224, 2187])
  })

  // lots of tests (DR algorithm)
  it("Testing many inputs (DR algorithm)", function() {
    var prm_arr = [ 5,  7, 11, 13,   17,  19,  23,  29, 31, 6.99, 5.1, 3, 2, 1, 0, -1, -2, -2003, 257, 65537,  149,  151, 179, 181,  45077, 59051, 2499949]
    var num_arr = [80, 63, 33, 26, 2176, 513, 736, 261, 31,   63,  80, 1, 1, 1, 1,  1,  1,     1, 257, 65537, 4023, 4077, 716, 724, 135231, 59051, 2499949]
    var den_arr = [81, 64, 32, 27, 2187, 512, 729, 256, 32,   64,  81, 1, 1, 1, 1,  1,  1,     1, 256, 65536, 4096, 4096, 729, 729, 131072, 59049, 2519424]
    for (var i=0; i<prm_arr.length; i++) {
      var p = prm_arr[i]
      var num = num_arr[i]
      var denom = den_arr[i]
      var result = primeToComma(p)    // DR algorithm is default
      var msg = "For " + p + " expected " + [num, denom] + " but got " + result
      assert.deepStrictEqual(primeToComma(p), [num, denom], msg)
    }
  })

  // lots of tests (SAG algorithm)
  it("Testing many inputs (SAG algorithm)", function() {
    var prm_arr = [ 5,  7, 11, 13]
    var num_arr = [80, 63, 33, 26]
    var den_arr = [81, 64, 32, 27]
    for (var i=0; i<prm_arr.length; i++) {
      var p = prm_arr[i]
      var num = num_arr[i]
      var denom = den_arr[i]
      var result = primeToComma(p, "SAG")
      var msg = "For " + p + " expected " + [num, denom] + " but got " + result
      assert.deepStrictEqual(primeToComma(p), [num, denom], msg)
    }
  })

  // lots of tests (KG2 algorithm)
  it("Testing many inputs (KG2 algorithm)", function() {
    var prm_arr = [ 5,  7]
    var num_arr = [80, 63]
    var den_arr = [81, 64]
    for (var i=0; i<prm_arr.length; i++) {
      var p = prm_arr[i]
      var num = num_arr[i]
      var denom = den_arr[i]
      var result = primeToComma(p, "KG2")
      var msg = "For " + p + " expected " + [num, denom] + " but got " + result
      assert.deepStrictEqual(primeToComma(p), [num, denom], msg)
    }
  })

})
