var Peo = require('peo')

var constants = require('../../constants/general')
var rxs = require('../../constants/regex')

var getIntFromChars = function(theText) {
  var regex = /[-+0-9]{1,}/g        // Characters -+0123456789 only
  var matchArray = theText.match(regex)
  var theInt = parseInt(matchArray[0])
  return theInt
}

var reduceToSumOrConcatenation = function(acc, elt) {return acc + elt}
var reduceToCount = function(acc, elt) {return acc + 1}
var reduceToSumOfInts = function(acc, elt) {return acc + getIntFromChars(elt)}
var reduceToSumOfIntsMinus4 = function(acc, elt) {return acc + getIntFromChars(elt) - 4}

var identityPeoDUMMY = function(theInt) {return new Peo()}

var sharpsPeo = function(theInt) {return new Peo({3:(7*theInt),2:(-11*theInt)})}
var flatsPeo = function(theInt) {return new Peo({3:(-7*theInt),2:(11*theInt)})}
var syntonicsAddPeo = function(theInt) {return new Peo({2:(4*theInt),3:(-4*theInt),5:(theInt)})}
var syntonicsRemovePeo = function(theInt) {return new Peo({2:(-4*theInt),3:(4*theInt),5:(-theInt)})}
var octavesPeo = function(theInt) {return new Peo({2:theInt})}

var reduceDiatonicLettersToPeo = function(acc, elt) {return acc.mult(constants[elt])}
var identityFunction = function(anything) {return anything}


var parseNotation = function(notation) {

  // console.log("")
  // console.log("Starting to parse:")
  // console.log(notation)

  // Variables to iterate on
  var tempResult = 0
  var tempRx = null
  var tempMatch = null
  var tempSplit = null
  var tempNotation = notation
  var tempPeo = null
  var resultsPeo = new Peo()

  // Function to iterate on the variables

  var analyseNotation = function(options) {
    tempRx = options.rgx
    // console.log("")
    // console.log("Applying regex:")
    // console.log(tempRx)

    tempReduceMatch = options.reduceMatch
    tempMapReducerResultToPeo = options.mapReducerResultToPeo
    tempInitialValue = options.initialValue || 0
    if (tempReduceMatch && tempMapReducerResultToPeo) {
      tempMatch = tempNotation.match(tempRx)
      tempResult = tempInitialValue
      if (Array.isArray(tempMatch)) tempResult = tempMatch.reduce(tempReduceMatch, tempInitialValue)
      tempPeo = tempMapReducerResultToPeo(tempResult)
      resultsPeo = resultsPeo.mult(tempPeo)
      // console.log("Match results:")
      // console.log(tempMatch)
      // console.log("Temp count:")
      // console.log(tempResult)
      // console.log("Temp Peo:")
      // console.log(tempPeo)
      // // console.log(tempPeo.getText())
      // console.log("Total Peo so far:")
      // console.log(resultsPeo)
      // // console.log(resultsPeo.getText())
    }
    tempSplit = tempNotation.split(tempRx)
    tempNotation = tempSplit.reduce(reduceToSumOrConcatenation, "")
    // // console.log("Split results:")
    // // console.log(tempSplit)
    // console.log("New Notation:")
    // console.log(tempNotation)
  }


  // Remove error conditions from the text to parse
  analyseNotation({rgx: rxs.REGEX_BRACKETED_OCTAVE_ERROR})
  analyseNotation({rgx: rxs.REGEX_BRACKETED_OCTAVE_UP_OVERFLOW})
  analyseNotation({rgx: rxs.REGEX_BRACKETED_OCTAVE_DOWN_OVERFLOW})
  analyseNotation({rgx: rxs.REGEX_BRACKETED_SHARP_OVERFLOW})
  analyseNotation({rgx: rxs.REGEX_BRACKETED_FLAT_OVERFLOW})
  analyseNotation({rgx: rxs.REGEX_BRACKETED_SYNTONIC_ERROR})
  analyseNotation({rgx: rxs.REGEX_BRACKETED_SYNTONIC_COMMA_ADD_OVERFLOW})
  analyseNotation({rgx: rxs.REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE_OVERFLOW})

  // Analyse and remove valid bracketed expressions from the text
  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_OCTAVES_UP,
    reduceMatch: reduceToSumOfIntsMinus4,
    mapReducerResultToPeo: octavesPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_OCTAVES_DOWN,
    reduceMatch: reduceToSumOfIntsMinus4,
    mapReducerResultToPeo: octavesPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_SHARPS,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: sharpsPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_FLATS,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: flatsPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_SYNTONIC_COMMA_ADD,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: syntonicsAddPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: syntonicsRemovePeo
  })

  // Do the commas next
  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_COMMA_FRACTION,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: identityPeoDUMMY
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_COMMA_INTEGER,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: identityPeoDUMMY
  })

  // Analyse and remove some valid single characters from the text
  analyseNotation({
    rgx: rxs.REGEX_CHAR_SYNTONIC_COMMA_ADD,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: syntonicsAddPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_SYNTONIC_COMMA_REMOVE,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: syntonicsRemovePeo
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_SHARP,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: sharpsPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_FLAT,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: flatsPeo
  })

  // Remove any error conditions designated by individual characters
  analyseNotation({rgx: rxs.REGEX_CHAR_ERROR})

  // Finally analyse the note char and octave number
  analyseNotation({
    rgx: rxs.REGEX_CHAR_DIATONIC,
    reduceMatch: reduceDiatonicLettersToPeo,
    initialValue: new Peo(),
    mapReducerResultToPeo: identityFunction
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_OCTAVE,
    reduceMatch: reduceToSumOfIntsMinus4,
    mapReducerResultToPeo: octavesPeo
  })

  return resultsPeo
}

module.exports = parseNotation
