var peos = require('../constants/peos');
var consts = require('../constants/consts');

var getCommaPeosArray = require('./getCommaPeosArray');
var getCommaTextArray = require('./getCommaTextArray');
var get5Label = require('./get5Label');
var getHigherPythagCommaArray = require('./getHigherPythagCommaArray');
var getSharpFlatArray = require('./getSharpFlatArray');
var getDiatonicArray = require('./getDiatonicArray');
var getOctaveArray = require('./getOctaveArray');


var calcNotationObject = function calcNotationObject(jint, thePeo) {
  // Calculate both pitch notation and pitch class notation of thePeo (where 1/1 is notated C4)

  // tempPeoRemaining will be repeatedly reduced to 1/1 as the notation is calculated
  var tempPeoRemaining = thePeo;

  // If not using syntonic shorthand, commas start at 5, otherwise at 7
  var minPrimeToRemove = (jint.hideComma5Syntonic()) ? 5 : 7;
  var commaPeosArray = getCommaPeosArray(jint, minPrimeToRemove, tempPeoRemaining);
  tempPeoRemaining = commaPeosArray[0];
  var commaTextArray = getCommaTextArray(jint, commaPeosArray[1]);
  var commaText = commaTextArray[0];
  var theSpacer = commaTextArray[1];

  var syntonicCommaShorthandText = '';
  if (!jint.hideComma5Syntonic()) {
    // Using syntonic comma shorthand
    var syntonicCommaShorthandArray = getCommaPeosArray(jint, 5, tempPeoRemaining);
    tempPeoRemaining = syntonicCommaShorthandArray[0];
    syntonicCommaShorthandText = get5Label(jint, syntonicCommaShorthandArray[1].getPrimeExp(5));
  }

  // tempPeoRemaining should be have all primes 5 and above removed by now.
  // Going to reduce the 3-exponent next.
  var exp3 = tempPeoRemaining.getPrimeExp(3);

  // Handle four higher Pythagorean commas depending on display options on jint
  var higherPythagNotation = '';
  var handleHigherPythag = function handleHigherPythag(level, pythagCommaPeo, pythagOn, pythagOff) {
    var resultArray = getHigherPythagCommaArray(jint, exp3, level, pythagCommaPeo, pythagOn, pythagOff);
    var resultNotation = resultArray[0];
    var resultPeo = resultArray[1];
    higherPythagNotation = resultNotation + higherPythagNotation;
    exp3 = exp3 - resultPeo.getPrimeExp(3);
    tempPeoRemaining = tempPeoRemaining.mult(resultPeo, -1);
  };
  var level = null;
  level = jint.levelComma190537Tiny();
  if (level) handleHigherPythag(level, peos.PEO_TINY, consts.CHAR_TINY_ON, consts.CHAR_TINY_OFF);
  level = jint.levelComma665Small();
  if (level) handleHigherPythag(level, peos.PEO_SMALL, consts.CHAR_SMALL_ON, consts.CHAR_SMALL_OFF);
  level = jint.levelComma53Mercator();
  if (level) handleHigherPythag(level, peos.PEO_MERCATOR, consts.CHAR_MERCATOR_ON, consts.CHAR_MERCATOR_OFF);
  level = jint.levelComma12Pythag();
  if (level) handleHigherPythag(level, peos.PEO_PYTHAG, consts.CHAR_PYTHAG_ON, consts.CHAR_PYTHAG_OFF);

  // Use it first to get sharps and flats.
  var safArray = getSharpFlatArray(jint, exp3);
  var safText = safArray[0];
  var safPeo = safArray[1];
  var sharps = safArray[2];
  var exp3D = exp3 - 7 * sharps;
  tempPeoRemaining = tempPeoRemaining.mult(safPeo, -1);

  var diatonicArray = getDiatonicArray(exp3D);
  var diatonicText = diatonicArray[0];
  var diatonicPeo = diatonicArray[1];
  tempPeoRemaining = tempPeoRemaining.mult(diatonicPeo, -1);

  var exp2 = tempPeoRemaining.getPrimeExp(2);
  var octaveArray = getOctaveArray(exp2);
  var octaveText = octaveArray[0];
  // var octavePeo = octaveArray[1];              // Not used
  // tempPeoRemaining = tempPeoRemaining.mult(octavePeo, -1);   // Not used
  // Should be down to 1 on the tempPeoRemaining now.

  // Put all these text components together for a final notation
  var pitchText = '';
  var pitchClassText = '';
  if (theSpacer) {
    // theSpacer = ' '
    pitchText = diatonicText + safText + higherPythagNotation + syntonicCommaShorthandText + octaveText + theSpacer + commaText;
    pitchClassText = diatonicText + safText + higherPythagNotation + syntonicCommaShorthandText + theSpacer + commaText;
  } else {
    // theSpacer = ''
    pitchText = diatonicText + safText + higherPythagNotation + syntonicCommaShorthandText + commaText + octaveText;
    pitchClassText = diatonicText + safText + higherPythagNotation + syntonicCommaShorthandText + commaText;
  }

  var result = {};
  result.pn = pitchText;
  result.pc = pitchClassText;

  return result;
};

module.exports = calcNotationObject;
