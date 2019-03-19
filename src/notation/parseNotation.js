// This notation parsing function outputs a number (as a Peo)
// for the interval between C4 and the inputted notation.
// In order to find a general interval between any two notes,
// simply need to find ratio between the two Peos.
// Hence this parseNotation function will be made perfectly general
// in JInterval, even though parseNotation always measures from C4.

var Peo = require('peo');

var getComma = require('../api/class/getComma');
var consts = require('../constants/consts');
var peos = require('../constants/peos');
var rxs = require('../constants/regexes');

var charMatched = consts.CHAR_MATCHED;

var getIntFromChars = function getIntFromChars(theText) {
  var regex = /[-+0-9]{1,}/g;        // Characters -+0123456789 only
  var matchArray = theText.match(regex);
  var theInt = Number.parseInt(matchArray[0], 10);
  return theInt;
};

var removeSpacesAroundPowerSymbol = function removeSpacesAroundPowerSymbol(theText) {return theText.replace(/ *\^ */g, '^');};
var addSpacesAroundDivideSymbol = function addSpacesAroundDivideSymbol(theText) {return theText.replace(/\//g, ' / ');};

var processCommaText = function processCommaText(commaText, inputAlg) {
  var tempText = commaText;
  tempText = removeSpacesAroundPowerSymbol(tempText);
  tempText = addSpacesAroundDivideSymbol(tempText);
  var splitArray = tempText.split(rxs.REGEX_BRACKET_COMMA_SPLIT);
  var sign = 1;      // -1 after divide symbol
  var firstPeo = new Peo();
  for (var i = 0; i < splitArray.length; i++) {
    var elt = splitArray[i];
    if (elt === '') {
      // do nothing
    } else if (elt === '/') {
      sign = -1;
    } else {
      var num = 1;
      var pow = sign;
      var nextSplitArray = elt.split(/\^/g);
      for (var j = 0; j < nextSplitArray.length; j++) {
        var elt2 = Number.parseInt(nextSplitArray[j], 10);
        if (j === 0) {
          num = elt2;
        } else {
          pow *= elt2;
        }
      }
      var tempPeo = new Peo(num, 1, pow);
      firstPeo = firstPeo.mult(tempPeo);
    }
  }
  // firstPeo specifies which commas to multiply together
  // secondPeo actually does the multiplication
  var primeExps = firstPeo.getPrimeExps();    // Object like {'2':3, '3':-2}
  var keyArray = Object.keys(primeExps);      // Keys are numbers in string format - need to parseInt
  var secondPeo = new Peo();
  for (var k = 0; k < keyArray.length; k++) {
    var prime = Number.parseInt(keyArray[k], 10);
    var power = primeExps[prime];
    var commaPeo = getComma(prime, inputAlg);
    secondPeo = secondPeo.mult(commaPeo, power);
  }
  return secondPeo;
};

var reduceCommasToPeo = function reduceCommasToPeo(inputAlg) {
  return function f1(acc, elt) {return acc.mult(processCommaText(elt, inputAlg));};
};

var reduceOctaveCharToNum = function reduceOctaveCharToNum(acc, elt) {
  // C5 notation has elt '5' which reduces to 1
  // e.g. 1 octave above C4
  return acc + getIntFromChars(elt) - 4;
};

var reduceOctaveBracketsToNum = function reduceOctaveBracketsToNum(acc, elt) {
  // elt of form (o+123) or (o-1234)
  // C(o+4) parses to 1/1, so subtract 4
  var numInOctaveBracket = Number.parseInt(elt.slice(2, elt.length - 1), 10);
  return acc + numInOctaveBracket - 4;
};

var peoPower = function peoPower(peo, outerPower) {
  return function f2(innerPower) {
    return peo.pow(innerPower * (outerPower || 1));
  };
};

var reduceDiatonicLettersToPeo = function reduceDiatonicLettersToPeo(acc, elt) {return acc.mult(peos[elt]);};
var identityFunction = function identityFunction(anything) {return anything;};

var parseNotation = function parseNotation(jint, notation) {
  var inputAlg = jint.getAlgFn();

  // Variables to iterate on
  var tempResult = 0;
  var tempRx = null;
  var tempMatch = null;
  var tempNotation = notation;
  var tempPeo = null;
  var resultsPeo = new Peo();

  // The next two functions might depend on jint, so need to be here

  var reduceAccidentalBracketsToPeo = function reduceAccidentalBracketsToPeo(acc, elt) {
    // elt is like (#12345) or (b102)
    var theKey = elt[1];
    // Extract the number in the bracket
    var thePower = Number.parseInt(elt.slice(2, elt.length - 1), 10);
    var accidentalPeo = peos[theKey];
    if (!(accidentalPeo && thePower)) return acc;
    // If peo depends on context (jint) then return a function to call on context to obtain peo
    if (accidentalPeo instanceof Function) accidentalPeo = accidentalPeo(jint);
    return acc.mult(accidentalPeo, thePower);
  };

  var reduceAccidentalCharToPeo = function reduceAccidentalCharToPeo(acc, elt) {
    // elt is like # or b
    var theKey = elt[0];
    var accidentalPeo = peos[theKey];
    if (!accidentalPeo) return acc;
    if (accidentalPeo instanceof Function) accidentalPeo = accidentalPeo(jint);  // Use this if peo depends on jint context
    return acc.mult(accidentalPeo);
  };

  // Function to iterate on the variables
  var analyseNotation = function analyseNotation(options) {
    tempRx = options.rgx;
    var tempReduceMatch = options.reduceMatch;
    var tempMapReducerResultToPeo = options.mapReducerResultToPeo;
    var tempInitialValue = options.initialValue || 0;
    if (tempReduceMatch && tempMapReducerResultToPeo) {
      tempMatch = tempNotation.match(tempRx);
      tempResult = tempInitialValue;
      if (Array.isArray(tempMatch)) tempResult = tempMatch.reduce(tempReduceMatch, tempInitialValue);
      tempPeo = tempMapReducerResultToPeo(tempResult);
      resultsPeo = resultsPeo.mult(tempPeo);
    }
    // Replace matched items with a non-parsing character
    // e.g. so that nested brackets parse only the inner bracket
    tempNotation = tempNotation.replace(tempRx, charMatched);
  };

  // Remove all error conditions from the text to parse.
  // They have a standard format, which includes at least 1 bracket.
  analyseNotation({rgx: rxs.REGEX_BRACKET_ERROR});

  // Analyse and remove valid bracketed expressions from the text

  analyseNotation({
    rgx: rxs.REGEX_BRACKET_ACCIDENTAL,
    initialValue: new Peo(),
    reduceMatch: reduceAccidentalBracketsToPeo,
    mapReducerResultToPeo: identityFunction
  });

  analyseNotation({
    rgx: rxs.REGEX_BRACKET_OCTAVE,
    reduceMatch: reduceOctaveBracketsToNum,
    mapReducerResultToPeo: peoPower(peos.PEO_OCTAVE)
  });

  // Do the commas - must be after all the others are removed, due to similar formats
  analyseNotation({
    rgx: rxs.REGEX_BRACKET_COMMA_FRACTION,
    initialValue: new Peo(),
    reduceMatch: reduceCommasToPeo(inputAlg),
    mapReducerResultToPeo: identityFunction
  });

  analyseNotation({
    rgx: rxs.REGEX_BRACKET_COMMA_INTEGER,
    initialValue: new Peo(),
    reduceMatch: reduceCommasToPeo(inputAlg),
    mapReducerResultToPeo: identityFunction
  });

  // Analyse and remove some valid single characters from the text
  analyseNotation({
    rgx: rxs.REGEX_CHAR_ACCIDENTAL,
    initialValue: new Peo(),
    reduceMatch: reduceAccidentalCharToPeo,
    mapReducerResultToPeo: identityFunction
  });

  // Finally analyse the note char and octave number
  analyseNotation({
    rgx: rxs.REGEX_CHAR_DIATONIC,
    initialValue: new Peo(),
    reduceMatch: reduceDiatonicLettersToPeo,
    mapReducerResultToPeo: identityFunction
  });

  analyseNotation({
    rgx: rxs.REGEX_CHAR_OCTAVE,
    reduceMatch: reduceOctaveCharToNum,
    mapReducerResultToPeo: peoPower(peos.PEO_OCTAVE)
  });

  return resultsPeo;
};

module.exports = parseNotation;
