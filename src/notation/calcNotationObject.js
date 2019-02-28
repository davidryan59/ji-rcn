var getComma = require('../api/class/getComma');

var peos = require('../constants/peos');
var consts = require('../constants/consts');

var getHigherPrimesArray = require('./getHigherPrimesArray');
var get5Label = require('./get5Label');
var getHigherPythagCommaArray = require('./getHigherPythagCommaArray');
var getSharpFlatArray = require('./getSharpFlatArray');
var getDiatonicArray = require('./getDiatonicArray');
var getOctaveArray = require('./getOctaveArray');


var calcNotationObject = function calcNotationObject(jint, thePeo) {
  // Split up Peo of this JInterval into components:  2,3  ;  5 (optional)  ;  primes 7+ (or 5+)
  var fiveOrZero = (jint.hideComma5Syntonic()) ? 0 : 5;
  var splitArray = thePeo.split([2, 3], fiveOrZero);  // [Peo({2:a,3:b}), Peo({5:c}), Peo(the rest)]
  // var pythagPeo = splitArray[0];             // Pythagorean = primes 2 and 3 only
  var prime5Peo = splitArray[1];
  var primes7PlusPeo = splitArray[2];

  // Calculate comma5PlusPeo from 1/1 based on primes5PlusPeo and algorithm
  var primes5PlusPeo = primes7PlusPeo.mult(prime5Peo);
  var comma5PlusPeo = thePeo.get1();     // Use .get1 to get id=1 from any Peo
  var obj = primes5PlusPeo.getPrimeExps();
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];
    var prime = Number.parseInt(key, 10);
    var exp = Number.parseInt(val, 10);
    var thisComma = getComma(prime, jint.getAlgFn());
    comma5PlusPeo = comma5PlusPeo.mult(thisComma, exp);
  }
  // Divide comma5PlusPeo out of original Peo
  // to get a Pythagorean component
  var pythagPeo = thePeo.mult(comma5PlusPeo, -1);

  // Get labels for the prime components 5+
  var prime5Text = get5Label(prime5Peo.getPrimeExp(5));
  var primes7PlusArray = getHigherPrimesArray(primes7PlusPeo);
  var primes7PlusText = primes7PlusArray[0];
  var theSpacer = primes7PlusArray[1];

  // The Pythagorean component has a 3-exponent.
  var exp3 = pythagPeo.getPrimeExp(3);

  // Handle four higher Pythagorean commas depending on display options on jint
  var higherPythagNotation = '';
  var handleHigherPythag = function handleHigherPythag(level, pythagCommaPeo, pythagOn, pythagOff) {
    var resultArray = getHigherPythagCommaArray(exp3, level, pythagCommaPeo, pythagOn, pythagOff);
    var resultNotation = resultArray[0];
    var resultPeo = resultArray[1];
    higherPythagNotation = resultNotation + higherPythagNotation;
    exp3 = exp3 - resultPeo.getPrimeExp(3);
    pythagPeo = pythagPeo.mult(resultPeo, -1);
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
  var safArray = getSharpFlatArray(exp3);
  var safText = safArray[0];
  var safPeo = safArray[1];
  var sharps = safArray[2];
  var exp3D = exp3 - 7 * sharps;
  pythagPeo = pythagPeo.mult(safPeo, -1);

  var diatonicArray = getDiatonicArray(exp3D);
  var diatonicText = diatonicArray[0];
  var diatonicPeo = diatonicArray[1];
  pythagPeo = pythagPeo.mult(diatonicPeo, -1);

  var exp2 = pythagPeo.getPrimeExp(2);
  var octaveArray = getOctaveArray(exp2);
  var octaveText = octaveArray[0];
  // var octavePeo = octaveArray[1];              // Not used
  // pythagPeo = pythagPeo.mult(octavePeo, -1);   // Not used

  // Should be down to 1 on the pythagPeo now.

  // Put all these text components together for a final notation
  var pitchText = '';
  var pitchClassText = '';
  if (theSpacer) {
    // theSpacer = ' '
    pitchText = diatonicText + safText + higherPythagNotation + prime5Text + octaveText + theSpacer + primes7PlusText;
    pitchClassText = diatonicText + safText + higherPythagNotation + prime5Text + theSpacer + primes7PlusText;
  } else {
    // theSpacer = ''
    pitchText = diatonicText + safText + higherPythagNotation + prime5Text + primes7PlusText + octaveText;
    pitchClassText = diatonicText + safText + higherPythagNotation + prime5Text + primes7PlusText;
  }

  var result = {};
  result.pitch = pitchText;
  result.pclass = pitchClassText;

  return result;
};

module.exports = calcNotationObject;
