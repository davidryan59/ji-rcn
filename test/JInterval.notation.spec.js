var assert = require('assert');

var test_index = require('./_test_index');
var JInterval = test_index.JInterval;

describe('API to calculate interval start and end notations', function() {

  var testArray = [
    ["1", "", "C4"],
    ["1", "C4", "C4"],
    ["1", "G4", "G4"],
    ["3", "", "G5"],
    ["3", "C4", "G5"],
    ["3", "G4", "D6"],
    ["3", "Bb[7]2", "F[7]4"],
    ["5/4", "", "E'4"],
    ["5/4", "C4", "E'4"],
    ["5/4", "B'4", "D#''5"],

    ["1", "C4", "C4"]
  ]

  var runTest = function(jintConstructorData, startPitchNotation, expectedEndPitchNotation, comment) {
    var jint = new JInterval(jintConstructorData);
    var actualEndPitchNotation = jint.getEndPitchNotation(startPitchNotation);
    var commentText = (comment) ? " (" + comment + ")" : ""
    var label = "JInterval constructed using " + jintConstructorData + " starting at " + startPitchNotation + " ends at " + expectedEndPitchNotation + commentText
    it(label, function() {assert.strictEqual(expectedEndPitchNotation, actualEndPitchNotation)})
  }

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2], testArray[i][3])
  }

})
