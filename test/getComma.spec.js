var assert = require('assert');

var test_index = require('./_test_index');
var getComma = test_index.getComma;

var fnName = 'getComma';
describe(fnName, function() {

  it("gives 80/81 for getComma(5)", function() {
    var result = getComma(5)
    assert.deepStrictEqual(result.getPrimeExps(), {2:4,3:-4,5:1})
  })

  it("gives default for getComma(5.01)", function() {
    var result = getComma(5.01)
    assert.deepStrictEqual(result.getPrimeExps(), {})
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
