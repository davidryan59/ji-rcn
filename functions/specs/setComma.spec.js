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

})
