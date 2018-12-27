var assert = require('assert')
var Jinote = require('../Jinote')
var Peo = require('peo')

describe('parsing API', function() {

  var testArray = [
    ["", "1/1", "empty string"]
  , ["C4", "1/1", "C4, default note"]
  , ["E(#20)('13)(o-9)[103/109]", {3:4}, "complicated note"]
  ]

  var runTest = function(notationToParse, peoConstructorData, comment) {

    console.log("")
    console.log(notationToParse)
    console.log(peoConstructorData)
    var peoFromParsing = Jinote.parseNotation(notationToParse)
    var peoFromSpec = new Peo(peoConstructorData)
    console.log(peoFromParsing)
    console.log(peoFromSpec)
    console.log("")


    // DEBUG
    // Need a proper comparison here

    // var actualNotationText = jn.getNotation()
    // var actualPitchText = jn.getPitch()
    // var actualPitchClassText = jn.getPitchClass()
    // var algText = (alg) ? ", " + alg : ""
    // var commentText = (comment) ? ", " + comment : ""
    // var labelPitch = "(new Jinote(" + JSON.stringify(jnInput) + algText + ")).getPitch() = " + expectPitchText + commentText
    // it(labelPitch, function() {
    //   assert.strictEqual(actualPitchText, expectPitchText)
    //   assert.strictEqual(actualNotationText, expectPitchText)
    // })
    // var labelPitchClass = "(new Jinote(" + JSON.stringify(jnInput) + algText + ")).getPitchClass() = " + expectPitchClassText + commentText
    it("heres a test", function() {
      assert.strictEqual(1, 1)
    })
  }

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})





  // it('DUMMY parse initialise', function() {
  //   var jn = new Jinote("A7")
  //   assert.deepStrictEqual(1, 1)
  // })
  //
  // it('can initialise from parsing "A7" in new Jinote("A7")', function() {
  //   var jn = new Jinote("A7")
  //   assert.deepStrictEqual(jn.peo.getPrimeExps(), {2:0,3:3})
  // })
  //
  // it('can initialise from parsing "B9" in new Jinote("B9")', function() {
  //   var jn = new Jinote("B9")
  //   assert.deepStrictEqual(jn.peo.getPrimeExps(), {2:0,3:5})
  // })
  //
  // it('can initialise from parsing "C4" in new Jinote("C4")', function() {
  //   var jn = new Jinote("C4")
  //   assert.deepStrictEqual(jn.peo.getPrimeExps(), {2:0,3:0})
  // })
  //
  // it('can initialise from parsing "C5" in new Jinote("C5")', function() {
  //   var jn = new Jinote("C5")
  //   assert.deepStrictEqual(jn.peo.getPrimeExps(), {2:1,3:0})
  // })
  //
  // it('can initialise from parsing "D2" in new Jinote("D2")', function() {
  //   var jn = new Jinote("D2")
  //   assert.deepStrictEqual(jn.peo.getPrimeExps(), {2:0,3:2})
  // })
  //
  // it('can initialise from parsing "E0" in new Jinote("E0")', function() {
  //   var jn = new Jinote("E0")
  //   assert.deepStrictEqual(jn.peo.getPrimeExps(), {2:0,3:4})
  // })
  //
  // it('can initialise from parsing "F3" in new Jinote("F3")', function() {
  //   var jn = new Jinote("F3")
  //   assert.deepStrictEqual(jn.peo.getPrimeExps(), {2:0,3:-1})
  // })
  //
  // it('can initialise from parsing "G4" in new Jinote("G4")', function() {
  //   var jn = new Jinote("G4")
  //   assert.deepStrictEqual(jn.peo.getPrimeExps(), {2:0,3:1})
  // })
  //
  // it('can initialise from parsing "E\'6" in new Jinote("E\'6")', function() {
  //   var jn = new Jinote("E'6")
  //   assert.deepStrictEqual(jn.peo.getPrimeExps(), {2:0,3:0,5:1})
  // })
  //
  // it('can initialise from parsing "Eb.3" in new Jinote("Eb.3")', function() {
  //   var jn = new Jinote("Eb.3")
  //   assert.deepStrictEqual(jn.peo.getPrimeExps(), {2:0,3:0,5:-1})
  // })
