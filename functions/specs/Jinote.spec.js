var assert = require('assert')
var Fraction = require('fraction.js')
var Peo = require('peo')

var Jinote = require('../Jinote')
var privateGetPeo = require('../private/privateGetPeo')

var fnName = 'Jinote'
describe(fnName, function() {

  it("can initialise from new Peo(14, 15), and objects get copied correctly", function() {
    var origPeo = new Peo(14, 15)
    var jn = new Jinote(origPeo)
    var jnPeoPriv = privateGetPeo(jn)
    var jnPeoPub = jn.getPeo()
    var origPrimeExps = origPeo.getPrimeExps()
    var jnPrimeExps = jnPeoPriv.getPrimeExps()
    // Different object identities
    assert(jnPrimeExps!==origPrimeExps, 'Different Peo inner objects')
    assert(jnPeoPriv!==origPeo, 'Different Peo outer objects')
    assert(jnPeoPriv!==jnPeoPub, 'Different private and public objects')
    // Same contents
    assert.deepStrictEqual(jnPeoPriv, jnPeoPub)
    assert.deepStrictEqual(jnPeoPriv, origPeo)
    assert.deepStrictEqual(jnPrimeExps, origPrimeExps)
  })

  it("can initialise from new Jinote(14, 15)", function() {
    var peo = new Peo(14, 15)
    var jn1 = new Jinote(peo)
    var jn2 = new Jinote(jn1)
    var ob1 = jn1.getPeo().getPrimeExps()
    var ob2 = jn2.getPeo().getPrimeExps()
    assert(jn1!==jn2, 'Different Jinote objects')
    assert.deepStrictEqual(ob1, ob2, 'Represent same note')
  })

  it("can initialise from new Fraction('14/15')", function() {
    var fraction = new Fraction("14/15")
    var jn = new Jinote(fraction)
    var txt = jn.getPeo().getText()
    assert.strictEqual(txt, "14/15", 'Represent same note')
  })

  it("can initialise from 14", function() {
    var jn = new Jinote(14)
    var txt = jn.getPeo().getText()
    assert.strictEqual(txt, "14")
  })

  it("can initialise from (14, 15)", function() {
    var jn = new Jinote(14, 15)
    var txt = jn.getPeo().getText()
    assert.strictEqual(txt, "14/15")
  })

  it("can initialise from {2:1, 3:1, 5:-2, 13:-4}", function() {
    var jn = new Jinote({2:1, 3:1, 5:-2, 13:-4})
    var txt = jn.getPeo().getText()
    assert.strictEqual(txt, "6/714025")
  })

  it("can initialise from new Jinote()", function() {
    var jn = new Jinote()
    var txt = jn.getPeo().getText()
    assert.strictEqual(txt, "1")
  })

})
