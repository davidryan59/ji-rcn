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
  , [-1e15, "(bLOTS)"]
  , [-6999995, "(bLOTS)"]
  , [-6999994, "(b999999)"]
  , [-100000, "(b14286)"]
  , [-3000, "(b429)"]
  , [-70, "(b10)"]
  , [-46, "(b7)"]
  , [-43, "(b6)"]
  , [-37, "(b6)"]
  , [-36, "(b5)"]
  , [-30, "(b5)"]
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
  , [34, "(#5)"]
  , [40, "(#5)"]
  , [41, "(#6)"]
  , [50, "(#7)"]
  , [85, "(#12)"]
  , [4623, "(#660)"]
  , [82391, "(#11770)"]
  , [6999998, "(#999999)"]
  , [6999999, "(#LOTS)"]
  , [1e15, "(#LOTS)"]
  , [1e15+1, "N"]
  ]

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1])
  }

})
