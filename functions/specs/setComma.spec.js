var assert = require('assert')
var Peo = require('peo')

var Jinote = require('../Jinote')
var setComma = require('../setters/setComma')

var fnName = 'setComma'
describe(fnName, function() {

  it("can set comma", function() {
    var jn = new Jinote(540, 119)
    var peoPythag = new Peo(9, 2)
    var peoHigherFrom = new Peo(5, 119)
    var peoHigherTo = new Peo(120, 119)
    setComma(jn)
    assert.deepStrictEqual(jn.pythag.getPrimeExps(), peoPythag.getPrimeExps())
    assert.deepStrictEqual(jn.comma.from.getPrimeExps(), peoHigherFrom.getPrimeExps())
    assert.deepStrictEqual(jn.comma.to.getPrimeExps(), peoHigherTo.getPrimeExps())
  })

  it("can do 139 with various algs", function() {
    var jn = new Jinote(139)
    var jndr = new Jinote(139, "DR")
    var jnsag = new Jinote(139, "SAG")
    var jnkg2 = new Jinote(139, "KG2")
    setComma(jn)
    setComma(jndr)
    setComma(jnsag)
    setComma(jnkg2)
    assert.deepStrictEqual(jn.comma.to.getPrimeExps(), {139:1, 2:4, 3:-7}, "Default")
    assert.deepStrictEqual(jndr.comma.to.getPrimeExps(), {139:1, 2:4, 3:-7}, "DR alg")
    assert.deepStrictEqual(jnsag.comma.to.getPrimeExps(), {139:1, 2:-4, 3:-2}, "SAG alg")
    assert.deepStrictEqual(jnkg2.comma.to.getPrimeExps(), {139:1, 2:-15, 3:5}, "KG2 alg")
  })

  it("can do 59 with SAG/DK", function() {
    var jn = new Jinote(59, "DK")       // Covers positive b case for SAG alg
    setComma(jn)
    assert.deepStrictEqual(jn.comma.to.getPrimeExps(), {59:1, 2:-9, 3:2})
  })

})
