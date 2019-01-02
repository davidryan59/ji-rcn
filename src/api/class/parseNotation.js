var Peo = require('peo')

var getComma = require('./getComma')
var constants = require('../../constants/general')
var rxs = require('../../constants/regex')

var getIntFromChars = function(theText) {
  var regex = /[-+0-9]{1,}/g        // Characters -+0123456789 only
  var matchArray = theText.match(regex)
  var theInt = parseInt(matchArray[0])
  return theInt
}

var removeSpacesAroundPowerSymbol = function(theText) {
  var regex = / *\^ */g
  var substr = "^"
  return theText.replace(regex, substr)
}

var addSpacesAroundDivideSymbol = function(theText) {
  var regex = /\//g
  var substr = " / "
  return theText.replace(regex, substr)
}

var processCommaText = function(commaText) {
  var tempText = commaText
  tempText = removeSpacesAroundPowerSymbol(tempText)
  tempText = addSpacesAroundDivideSymbol(tempText)
  var textSplitBySpacesArray = tempText.split(/[ \[\]]/g)
  var sign = 1      // -1 after divide symbol
  var firstPeo = new Peo()
  for (var i=0; i<textSplitBySpacesArray.length; i++) {
    var elt = textSplitBySpacesArray[i]
    if (elt==="") {
      // do nothing
    } else if (elt==="/") {
      sign = -1
    } else {
      var num = 1
      var pow = sign
      var nextSplitArray = elt.split(/\^/g)
      for (var j=0; j<nextSplitArray.length; j++) {
        var elt2 = parseInt(nextSplitArray[j])
        if (j===0) {
          num = elt2
        } else {
          pow *= elt2
        }
      }
      var tempPeo = new Peo(num, 1, pow)
      firstPeo = firstPeo.mult(tempPeo)
    }
  }
  // firstPeo specifies which commas to multiply together
  // secondPeo actually does the multiplication
  var primeExps = firstPeo.getPrimeExps()    // Object like {'2':3, '3':-2}
  var keyArray = Object.keys(primeExps)      // Text - need a parseInt on elts
  var secondPeo = new Peo()
  for (var i=0; i<keyArray.length; i++) {
    var prime = parseInt(keyArray[i])
    var power = primeExps[prime]
    var commaPeo = getComma(prime)
    secondPeo = secondPeo.mult(commaPeo, power)
  }
  return secondPeo
}

var reduceCommasToPeo = function(acc, elt) {return acc.mult(processCommaText(elt))}

var reduceToSumOrConcatenation = function(acc, elt) {return acc + elt}
var reduceToCount = function(acc, elt) {return acc + 1}
var reduceToSumOfInts = function(acc, elt) {return acc + getIntFromChars(elt)}
var reduceToSumOfIntsMinus4 = function(acc, elt) {return acc + getIntFromChars(elt) - 4}

var sharpsPeo = function(theInt) {return new Peo({3:(7*theInt),2:(-11*theInt)})}
var flatsPeo = function(theInt) {return new Peo({3:(-7*theInt),2:(11*theInt)})}
var pythagAddPeo = function(theInt) {return new Peo({3:(12*theInt),2:(-19*theInt)})}
var pythagRemovePeo = function(theInt) {return new Peo({3:(-12*theInt),2:(19*theInt)})}
var syntonicsAddPeo = function(theInt) {return new Peo({2:(4*theInt),3:(-4*theInt),5:(theInt)})}
var syntonicsRemovePeo = function(theInt) {return new Peo({2:(-4*theInt),3:(4*theInt),5:(-theInt)})}
var octavesPeo = function(theInt) {return new Peo({2:theInt})}

var reduceDiatonicLettersToPeo = function(acc, elt) {return acc.mult(constants[elt])}
var identityFunction = function(anything) {return anything}


var parseNotation = function(notation) {

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
    tempReduceMatch = options.reduceMatch
    tempMapReducerResultToPeo = options.mapReducerResultToPeo
    tempInitialValue = options.initialValue || 0
    if (tempReduceMatch && tempMapReducerResultToPeo) {
      tempMatch = tempNotation.match(tempRx)
      tempResult = tempInitialValue
      if (Array.isArray(tempMatch)) tempResult = tempMatch.reduce(tempReduceMatch, tempInitialValue)
      tempPeo = tempMapReducerResultToPeo(tempResult)
      resultsPeo = resultsPeo.mult(tempPeo)
    }
    tempSplit = tempNotation.split(tempRx)
    tempNotation = tempSplit.reduce(reduceToSumOrConcatenation, "")
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
    rgx: rxs.REGEX_BRACKETED_PYTHAG_COMMA_ADD,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: pythagAddPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_PYTHAG_COMMA_REMOVE,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: pythagRemovePeo
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
    reduceMatch: reduceCommasToPeo,
    initialValue: new Peo(),
    mapReducerResultToPeo: identityFunction
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_COMMA_INTEGER,
    reduceMatch: reduceCommasToPeo,
    initialValue: new Peo(),
    mapReducerResultToPeo: identityFunction
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

  analyseNotation({
    rgx: rxs.REGEX_CHAR_PYTHAG_COMMA_ADD,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: pythagAddPeo
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_PYTHAG_COMMA_REMOVE,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: pythagRemovePeo
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
