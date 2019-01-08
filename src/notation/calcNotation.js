var getComma = require('../api/class/getComma');

var getHigherPrimesArray = require('./getHigherPrimesArray');
var get5Label = require('./get5Label');
var getSharpFlatArray = require('./getSharpFlatArray');
var getDiatonicArray = require('./getDiatonicArray');
var getOctaveArray = require('./getOctaveArray');

var calcNotation = function calcNotation(thePeo, alg) {
  // Split up Peo of this JInterval into components:  2,3  ;  5  ;  primes 7+
  var splitArray = thePeo.split([2, 3], 5);  // [Peo({2:a,3:b}), Peo({5:c}), Peo(the rest)]
  var pythagPeo = splitArray[0];             // Pythagorean = primes 2 and 3 only
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
    var thisComma = getComma(prime, alg);
    comma5PlusPeo = comma5PlusPeo.mult(thisComma, exp);
  }
  // Divide comma5PlusPeo out of original Peo
  // to get a Pythagorean component
  pythagPeo = thePeo.mult(comma5PlusPeo, -1);

  // Get labels for the prime components 5+
  var prime5Text = get5Label(prime5Peo.getPrimeExp(5));
  var primes7PlusArray = getHigherPrimesArray(primes7PlusPeo);
  var primes7PlusText = primes7PlusArray[0];
  var commaSpacer = primes7PlusArray[1];

  // The Pythagorean component has a 3-exponent.
  // Use it first to get sharps and flats.
  var exp3 = pythagPeo.getPrimeExp(3);
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
  var octavePeo = octaveArray[1];
  pythagPeo = pythagPeo.mult(octavePeo, -1);

  // Should be down to 1 on the pythagPeo now.

  // Put all these text components together for a final notation
  var pitchText = '';
  var pitchClassText = '';
  if (commaSpacer) {
    pitchText = diatonicText + safText + prime5Text + octaveText + commaSpacer + primes7PlusText;
    pitchClassText = diatonicText + safText + prime5Text + commaSpacer + primes7PlusText;
  } else {
    pitchText = diatonicText + safText + prime5Text + primes7PlusText + octaveText;
    pitchClassText = diatonicText + safText + prime5Text + primes7PlusText;
  }

  var result = {};
  result.pitch = pitchText;
  result.pclass = pitchClassText;

  return result;
};

module.exports = calcNotation;
