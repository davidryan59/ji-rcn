var assert = require('assert')
var Jinote = require('../Jinote')
var Peo = require('peo')

describe('Notation parsing API', function() {

  var testArray = [
    ["", "", "empty string"],
    ["F", "4/3", ""],
    ["C", "1", ""],
    ["G", "3/2", ""],
    ["D", "9/8", ""],
    ["A", "27/16", ""],
    ["E", "81/64", ""],
    ["B", "243/128", ""],
    ["0", "1/16", ""],
    ["1", "1/8", ""],
    ["2", "1/4", ""],
    ["3", "1/2", ""],
    ["4", "1/1", ""],
    ["5", "2/1", ""],
    ["6", "4/1", ""],
    ["7", "8/1", ""],
    ["8", "16/1", ""],
    ["9", "32/1", ""],
    ["#", {3:7,2:-11}, ""],
    ["b", {3:-7,2:11}, ""],
    ["'", "80/81", ""],
    [".", "81/80", ""],

    ["", "1", ""]
  ]

  var runTest = function(notationToParse, peoConstructorData, comment) {
    var peoFromParsing = Jinote.parseNotation(notationToParse)
    var peoFromSpec = new Peo(peoConstructorData)
    var parseText = peoFromParsing.getText()
    var specText = peoFromSpec.getText()
    var commentText = (comment) ? ", " + comment : ""
    var label = "Jinote.parseNotation( " + notationToParse + " ).getText() = " + specText + commentText
    it(label, function() {assert.strictEqual(parseText, specText)})
  }

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2])
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
