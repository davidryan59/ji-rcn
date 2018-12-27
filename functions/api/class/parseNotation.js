var Peo = require('peo')

var rxs = require('../../constants/regex')

var reduceConcatText = function(acc, elt) {return acc + elt}
var reduceParseIntThenAddElt = function(acc, elt) {return acc + parseInt(elt)}
var reduceAdd1 = function(acc, elt) {return acc + 1}

var sharpsPeo = function(theInt) {return new Peo({3:(7*theInt),2:(-11*theInt)})}
var flatsPeo = function(theInt) {return new Peo({3:(-7*theInt),2:(11*theInt)})}
var syntonicsAddPeo = function(theInt) {return new Peo({2:(4*theInt),3:(-4*theInt),5:(theInt)})}
var syntonicsRemovePeo = function(theInt) {return new Peo({2:(-4*theInt),3:(4*theInt),5:(-theInt)})}
var octavesPeo = function(theInt) {return new Peo({2:theInt})}


var parseNotation = function(notation) {

  console.log("")
  console.log("Starting to parse:")
  console.log(notation)

  // Variables to iterate on
  var tempCount = 0
  var tempRx = null
  var tempMatch = null
  var tempSplit = null
  var tempNotation = notation
  var tempPeo = null
  var resultsPeo = new Peo()

  // Function to iterate on the variables

  var analyseNotation = function(options) {
    tempCount = 0
    tempRx = options.rgx
    tempMatch = tempNotation.match(tempRx)
    if (Array.isArray(tempMatch)) tempCount = tempMatch.reduce(options.reduceMatch, 0)
    tempSplit = tempNotation.split(tempRx)
    tempNotation = tempSplit.reduce(reduceConcatText, "")
    tempPeo = options.mapIntToPeo(tempCount)
    resultsPeo = resultsPeo.mult(tempPeo)
    console.log("")
    console.log("Applying regex:")
    console.log(tempRx)
    console.log("Match results:")
    console.log(tempMatch)
    console.log("Temp count:")
    console.log(tempCount)
    console.log("Temp Peo:")
    console.log(tempPeo)
    console.log(tempPeo.getText())
    console.log("Total Peo so far:")
    console.log(resultsPeo)
    console.log(resultsPeo.getText())
    console.log("Split results:")
    console.log(tempSplit)
    console.log("New Notation:")
    console.log(tempNotation)
  }

  analyseNotation({
    rgx: rxs.REGEX_CHAR_SYNTONIC_COMMA_ADD,
    reduceMatch: reduceAdd1,
    mapIntToPeo: syntonicsAddPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_SYNTONIC_COMMA_REMOVE,
    reduceMatch: reduceAdd1,
    mapIntToPeo: syntonicsRemovePeo
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_SHARP,
    reduceMatch: reduceAdd1,
    mapIntToPeo: sharpsPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_FLAT,
    reduceMatch: reduceAdd1,
    mapIntToPeo: flatsPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_OCTAVE,
    reduceMatch: reduceParseIntThenAddElt,
    mapIntToPeo: octavesPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_DIATONIC,
    reduceMatch: reduceParseIntThenAddElt,
    mapIntToPeo: octavesPeo
  })

  console.log("")

  return resultsPeo
}

module.exports = parseNotation
