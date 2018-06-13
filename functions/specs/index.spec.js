var assert = require('assert')
var Fraction = require('fraction.js')

var index = require('../../index.js')

var fnName = 'index'
describe(fnName, function() {

  // Check item exists, then that its a function
  it("getComma", function() {
    assert(index.getComma)
  })
  it("getComma(1)", function() {
    assert(index.getComma(1))
  })

  it("getPythag", function() {
    assert(index.getPythag)
  })
  it("getPythag(1)", function() {
    assert(index.getPythag(1))
  })

})
