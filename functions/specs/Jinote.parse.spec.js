var assert = require('assert')
var Jinote = require('../Jinote')
var Peo = require('peo')

describe('Notation parsing API', function() {

  var testArray = [
    ["", "", "empty string"],

    ["F", "4/3", "Test parsing single characters"],
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
    ["(o-5)", {2:-9}, ""],
    ["(o+4)", "1", ""],
    ["(o+10)", {2:6}, ""],
    ["(#15)", {3:(7*15),2:(-11*15)}, ""],
    ["(b240)", {3:(7*-240),2:(-11*-240)}, ""],
    ["('100000)", {2:(4*100000),3:(-4*100000),5:(1*100000)}, ""],
    ["(.42)", {2:(4*-42),3:(-4*-42),5:(1*-42)}, ""],

    ["GG", "9/4", "Test parsing repeated notations"],
    ["FA", "9/4", ""],
    ["44", "1/1", ""],
    ["55", "4/1", ""],
    ["33", "1/4", ""],
    ["######", {3:(7*6),2:(-11*6)}, ""],
    ["bbbb", {3:(7*-4),2:(-11*-4)}, ""],
    ["''''''''''", {2:(4*10),3:(-4*10),5:(1*10)}, ""],
    ["......", {2:(4*-6),3:(-4*-6),5:(1*-6)}, ""],

    ["Eb.4", "6/5", "Test parsing compound notations"],
    ["F#'4", "45/32", ""],
    ["A(b3)(.2)(o+8)", {2:25,3:-10,5:-2}, ""],

    ["(.LOTS)('LOTS)(#LOTS)(bLOTS)(o-LOTS)(o+LOTS)(o.Err)(5ERR)", "1/1", "Test some error inputs"],

    ["", "1", ""]
  ]

  var runTest = function(notationToParse, peoConstructorData, comment) {
    var peoFromParsing = Jinote.parseNotation(notationToParse)
    var peoFromSpec = new Peo(peoConstructorData)
    var parseText = JSON.stringify(peoFromParsing.getPrimeExps())
    var specText = JSON.stringify(peoFromSpec.getPrimeExps())
    var commentText = (comment) ? ", " + comment : ""
    var label = "Jinote.parseNotation(\"" + notationToParse + "\") has prime exponents " + specText + commentText
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
