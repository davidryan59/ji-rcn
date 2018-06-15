var assert = require("assert")
// var Fraction = require("fraction.js")

var getNotation = require("../getNotation.js")

var fnName = "getNotation"
describe(fnName, function() {

  var runTest = function(input, expectedText, algType, comment) {
    var actualText = getNotation(input, algType)
    var typeText = (algType) ? ", " + algType : ""
    var commentText = (comment) ? "   (" + comment + ")" : ""
    var label = fnName + "(" + input + typeText + ") = " + expectedText + commentText
    it(label, function() {
      assert.strictEqual(actualText, expectedText)
    })
  }

  var testArray = [
    [1, "C4",,"The first test!"]
  , [1, "C4", "DR",]
  , [1, "C4", "SAG",]
  , [1, "C4", "DK",]
  , [1, "C4", "KG2",]
  , [2, "C5",,]
  , [8, "C7",,]
  , [Math.pow(2, 20), "C(o+24)",,"2^20"]
  , ["1/16", "C0",,]
  , ["1/32", "C(o-1)",,]
  , [[1, Math.pow(2, 23)], "C(o-19)",,"1/2^-23"]
  // , ["3/2", "G4",,]
  // , ["5/4", "E'4",,]
  // , ["65/77", "Difficult!",,]
  // , ["40/63", "Difficult!",,]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2], testArray[i][3])
  }

})
