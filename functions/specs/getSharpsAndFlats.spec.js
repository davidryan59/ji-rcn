var assert = require('assert')

var getSharpsAndFlats = require('../getSharpsAndFlats.js')

var fnName = 'getSharpsAndFlats'
describe(fnName, function() {

  var runTest = function(input, expected) {
    var actual = getSharpsAndFlats(input)
    var label = fnName + "(" + input + ") = " + expected
    it(label, function() {
      assert.strictEqual(actual, expected)
    })
  }

  var testArray = [
    [-1e15-1, "N"]
  , [-1e15, "(b^LOTS)"]
  , [-6999995, "(b^LOTS)"]
  , [-6999994, "(b^999999)"]
  , [-100000, "(b^14286)"]
  , [-3000, "(b^429)"]
  , [-70, "(b^10)"]
  , [-46, "(b^7)"]
  , [-43, "(b^6)"]
  , [-37, "(b^6)"]
  , [-36, "bbbbb"]
  , [-30, "bbbbb"]
  , [-29, "bbbb"]
  , [-23, "bbbb"]
  , [-22, "bbb"]
  , [-16, "bbb"]
  , [-15, "bb"]
  , [-9, "bb"]
  , [-8, "b"]
  , [-2, "b"]
  , [-1.50001, "b"]
  , [-1.5, ""]
  , [-1, ""]
  , [0, ""]
  , [3.5, ""]
  , [5, ""]
  , [5.49, ""]
  , [5.5, "#"]
  , [6, "#"]
  , [12, "#"]
  , [13, "##"]
  , [19, "##"]
  , [20, "###"]
  , [26, "###"]
  , [27, "####"]
  , [33, "####"]
  , [34, "#####"]
  , [40, "#####"]
  , [41, "(#^6)"]
  , [50, "(#^7)"]
  , [85, "(#^12)"]
  , [4623, "(#^660)"]
  , [82391, "(#^11770)"]
  , [6999998, "(#^999999)"]
  , [6999999, "(#^LOTS)"]
  , [1e15, "(#^LOTS)"]
  , [1e15+1, "N"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
