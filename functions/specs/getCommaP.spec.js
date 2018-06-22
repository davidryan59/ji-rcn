var assert = require('assert')

var getCommaP = require('../commas/getCommaP')

var fnName = 'getCommaP'
describe(fnName, function() {

  it("can calculate getCommaP(5)", function() {
    var result = getCommaP(5)
    assert.deepStrictEqual(result.getPrimeExps(), {5:1, 2:4, 3:-4})
  })

  it('gives default for getCommaP("aString")', function() {
    var result = getCommaP("aString")
    assert.deepStrictEqual(result.getPrimeExps(), {})
  })

  it("gives default for getCommaP(2)", function() {
    var result = getCommaP(2)
    assert.deepStrictEqual(result.getPrimeExps(), {})
  })

  it("doesn't give default for getCommaP(5e15)", function() {
    var result = getCommaP(5e15)
    assert(result.getPrimeExp(2)!==0)
  })

  it("gives default for getCommaP(5e15+1)", function() {
    var result = getCommaP(5e15+1)
    assert.deepStrictEqual(result.getPrimeExps(), {})
  })

})
