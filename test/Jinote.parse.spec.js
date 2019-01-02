var assert = require('assert');
var Peo = require('peo');

var index = require('./index');
var Jinote = index.Jinote;

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
    ["0", "1/16", "Octave numbers"],
    ["1", "1/8", ""],
    ["2", "1/4", ""],
    ["3", "1/2", ""],
    ["4", "1/1", ""],
    ["5", "2/1", ""],
    ["6", "4/1", ""],
    ["7", "8/1", ""],
    ["8", "16/1", ""],
    ["9", "32/1", ""],
    ["#", {3:7,2:-11}, "Sharp and flat"],
    ["b", {3:-7,2:11}, ""],
    ["p", {3:12,2:-19}, "Pythagorean commas"],
    ["d", {3:-12,2:19}, ""],
    ["'", "80/81", "Syntonic commas"],
    [".", "81/80", ""],
    ["(o-5)", {2:-9}, "Bracketed items"],
    ["(o+4)", "1", ""],
    ["(o+10)", {2:6}, ""],
    ["(#15)", {3:(7*15),2:(-11*15)}, ""],
    ["(b240)", {3:(7*-240),2:(-11*-240)}, ""],
    ["(p4367)", {3:(12*4367),2:(-19*4367)}, ""],
    ["(d192811)", {3:(12*-192811),2:(-19*-192811)}, ""],
    ["('100000)", {2:(4*100000),3:(-4*100000),5:(1*100000)}, ""],
    ["(.42)", {2:(4*-42),3:(-4*-42),5:(1*-42)}, ""],

    ["GG", "9/4", "Test parsing repeated notations"],
    ["FA", "9/4", ""],
    ["44", "1/1", ""],
    ["55", "4/1", ""],
    ["33", "1/4", ""],
    ["######", {3:(7*6),2:(-11*6)}, ""],
    ["bbbb", {3:(7*-4),2:(-11*-4)}, ""],
    ["ppp", {3:(12*3),2:(-19*3)}, ""],
    ["dddddddddd", {3:(12*-10),2:(-19*-10)}, ""],
    ["''''''''''", {2:(4*10),3:(-4*10),5:(1*10)}, ""],
    ["......", {2:(4*-6),3:(-4*-6),5:(1*-6)}, ""],

    ["Eb.4", "6/5", "Test parsing compound notations"],
    ["F#'4", "45/32", ""],
    ["A(b3)(.2)(o+8)", {2:25,3:-10,5:-2}, ""],

    ["(.LOTS)('LOTS)(#LOTS)(bLOTS)(o-LOTS)(o+LOTS)(o.Err)(5ERR)", "1/1", "Test some error inputs"],

    ["[2]", "1/1", "Test integer commas on default algorithm"],
    ["[3]", "1/1", ""],
    ["[5]", "80/81", ""],
    ["[7]", "63/64", ""],
    ["[11]", "33/32", ""],
    ["[13]", "26/27", ""],

    ["[1/5]", "81/80", "Reciprocal commas"],
    ["[1/7]", "64/63", ""],

    ["[7/11]", "21/22", "Rational commas"],
    ["[7 / 11]", "21/22", ""],
    ["[11 13]", "143/144", ""],
    ["[7^2]", "3969/4096", ""],
    ["[7 7 7/7]", "3969/4096", ""],
    ["[  7 ^ 2  ]", "3969/4096", ""],
    ["[]", "1/1", ""],
    ["[/]", "1/1", ""],
    ["[5/]", "80/81", ""],
    ["[/7]", "64/63", ""],
    ["[7/]", "63/64", ""],
    ["[7/0]", "63/64", ""],
    ["[7/1]", "63/64", ""],
    ["[0/7]", "64/63", ""],
    ["[7^3/11^3 13]", "250047/276848", ""],

    ["E'4", "5/4", "Full notations"],
    ["Bb[7]4", "7/4", ""],
    ["F#'4", "45/32", ""],
    ["F[11]5", "11/4", ""],
    ["A[13]5", "13/4", ""],
    ["Fp8", "177147/8192", ""],

    ["G5 E'6", "15/1", "Concatenation of full notations multiplies them"],

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
