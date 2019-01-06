var assert = require('assert');

var index = require('./_test_index');
var getComma = index.getComma;

var fnName = 'getComma';
describe(fnName, function() {

  it("can calculate getComma(5)", function() {
    var result = getComma(5)
    assert.deepStrictEqual(result.getPrimeExps(), {5:1, 2:4, 3:-4})
  })

  it('gives default for getComma("aString")', function() {
    var result = getComma("aString")
    assert.deepStrictEqual(result.getPrimeExps(), {})
  })

  it("gives default for getComma(2)", function() {
    var result = getComma(2)
    assert.deepStrictEqual(result.getPrimeExps(), {})
  })

  it("doesn't give default for getComma(5e15)", function() {
    var result = getComma(5e15)
    assert(result.getPrimeExp(2)!==0)
  })

  it("gives default for getComma(5e15+1)", function() {
    var result = getComma(5e15+1)
    assert.deepStrictEqual(result.getPrimeExps(), {})
  })

})
