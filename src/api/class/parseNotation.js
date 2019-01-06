var Peo = require('peo')
var esc = require('escape-string-regexp')

var getComma = require('./getComma')
var consts = require('../../constants/consts')
var peos = require('../../constants/peos')
var rxs = require('../../constants/regexes')

var getIntFromChars = function(theText) {
  var regex = /[-+0-9]{1,}/g        // Characters -+0123456789 only
  var matchArray = theText.match(regex)
  var theInt = parseInt(matchArray[0])
  return theInt
}

var removeSpacesAroundPowerSymbol = function(theText) {return theText.replace(/ *\^ */g, "^")}
var addSpacesAroundDivideSymbol = function(theText) {return theText.replace(/\//g, " / ")}
var commaSplitRegex = new RegExp("[" + esc(" " + consts.BRACKET_ALLOWED_CHARS) + "]", "g")

var processCommaText = function(commaText, algType) {
  var tempText = commaText
  tempText = removeSpacesAroundPowerSymbol(tempText)
  tempText = addSpacesAroundDivideSymbol(tempText)
  var splitArray = tempText.split(commaSplitRegex)
  var sign = 1      // -1 after divide symbol
  var firstPeo = new Peo()
  for (var i=0; i<splitArray.length; i++) {
    var elt = splitArray[i]
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
  var keyArray = Object.keys(primeExps)      // Keys are numbers in string format - need to parseInt
  var secondPeo = new Peo()
  for (var i=0; i<keyArray.length; i++) {
    var prime = parseInt(keyArray[i])
    var power = primeExps[prime]
    var commaPeo = getComma(prime, algType)
    secondPeo = secondPeo.mult(commaPeo, power)
  }
  return secondPeo
}

var reduceCommasToPeo = function(algType) {
  return function(acc, elt) {return acc.mult(processCommaText(elt, algType))}
}

var reduceToCount = function(acc, elt) {return acc + 1}
var reduceToSumOfInts = function(acc, elt) {return acc + getIntFromChars(elt)}
var reduceToSumOfIntsMinus4 = function(acc, elt) {return acc + getIntFromChars(elt) - 4}

var peoPower = function(peo, outerPower) {
  return function(innerPower) {
    return peo.pow(innerPower * (outerPower || 1))
  }
}

var reduceDiatonicLettersToPeo = function(acc, elt) {return acc.mult(peos[elt])}
var identityFunction = function(anything) {return anything}


var parseNotation = function(notation, algType) {
  // algType is optional

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
    // Going to concatenate split array, but separate elements with ! symbol
    // which prevents nested brackets from parsing
    tempNotation = tempSplit.reduce(function(acc, elt, index) {
      return acc + ((index>0) ? "!" : "") + elt
    }, "")
  }

  // Remove all error conditions from the text to parse.
  // They have a standard format.
  analyseNotation({rgx: rxs.REGEX_ANY_ERROR})

  // Analyse and remove valid bracketed expressions from the text
  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_OCTAVES_UP,
    reduceMatch: reduceToSumOfIntsMinus4,
    mapReducerResultToPeo: peoPower(peos.PEO_OCTAVE)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_OCTAVES_DOWN,
    reduceMatch: reduceToSumOfIntsMinus4,
    mapReducerResultToPeo: peoPower(peos.PEO_OCTAVE)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_SHARPS,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_SHARP)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_FLATS,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_SHARP, -1)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_PYTHAG_COMMA_ADD,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_PYTHAG)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_PYTHAG_COMMA_REMOVE,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_PYTHAG, -1)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_MERCATOR_COMMA_ADD,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_MERCATOR)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_MERCATOR_COMMA_REMOVE,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_MERCATOR, -1)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_SMALL_COMMA_ADD,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_SMALL)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_SMALL_COMMA_REMOVE,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_SMALL, -1)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_TINY_COMMA_ADD,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_TINY)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_TINY_COMMA_REMOVE,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_TINY, -1)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_SYNTONIC_COMMA_ADD,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_SYNTONIC)
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE,
    reduceMatch: reduceToSumOfInts,
    mapReducerResultToPeo: peoPower(peos.PEO_SYNTONIC, -1)
  })

  // Do the commas next
  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_COMMA_FRACTION,
    reduceMatch: reduceCommasToPeo(algType),
    initialValue: new Peo(),
    mapReducerResultToPeo: identityFunction
  })

  analyseNotation({
    rgx: rxs.REGEX_BRACKETED_COMMA_INTEGER,
    reduceMatch: reduceCommasToPeo(algType),
    initialValue: new Peo(),
    mapReducerResultToPeo: identityFunction
  })

  // Analyse and remove some valid single characters from the text
  analyseNotation({
    rgx: rxs.REGEX_CHAR_SYNTONIC_COMMA_ADD,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_SYNTONIC)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_SYNTONIC_COMMA_REMOVE,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_SYNTONIC, -1)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_SHARP,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_SHARP)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_FLAT,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_SHARP, -1)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_PYTHAG_COMMA_ADD,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_PYTHAG)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_PYTHAG_COMMA_REMOVE,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_PYTHAG, -1)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_MERCATOR_COMMA_ADD,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_MERCATOR)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_MERCATOR_COMMA_REMOVE,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_MERCATOR, -1)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_SMALL_COMMA_ADD,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_SMALL)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_SMALL_COMMA_REMOVE,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_SMALL, -1)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_TINY_COMMA_ADD,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_TINY)
  })

  analyseNotation({
    rgx: rxs.REGEX_CHAR_TINY_COMMA_REMOVE,
    reduceMatch: reduceToCount,
    mapReducerResultToPeo: peoPower(peos.PEO_TINY, -1)
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
    mapReducerResultToPeo: peoPower(peos.PEO_OCTAVE)
  })

  return resultsPeo
}

module.exports = parseNotation
