var assert = require('assert')
// var Peo = require('peo')

var Jinote = require('../Jinote')

var fnName = 'getText'
describe(fnName, function() {

  it("can calculate notation for new Jinote() as C4", function() {
    var jn = new Jinote()
    assert.deepStrictEqual(jn.getText(), "C4")
  })

  it("can calculate notation for new Jinote(5, 2) as E'5", function() {
    var jn = new Jinote(5, 2)
    assert.deepStrictEqual(jn.getText(), "E'5")
  })

  it('can calculate notation for new Jinote("1/9") as Bb0', function() {
    var jn = new Jinote("1/9")
    assert.deepStrictEqual(jn.getText(), "Bb0")
  })

  it('can calculate notation for new Jinote({3:12, 5:-8}) as Gbbb(.8)4', function() {
    var jn = new Jinote({3:12, 5:-8})
    assert.deepStrictEqual(jn.getText(), "Gbbb(.8)4")
  })

})
