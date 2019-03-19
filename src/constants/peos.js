var Peo = require('peo');

var consts = require('./consts');

var peoF = new Peo(4, 3);
var peoC = new Peo();
var peoG = new Peo(3, 2);
var peoD = new Peo(9, 8);
var peoA = new Peo(27, 16);
var peoE = new Peo(81, 64);
var peoB = new Peo(243, 128);

var peoOctaveUp = new Peo(2);
var peoOctaveDown = peoOctaveUp.pow(-1);

var peoSharp = new Peo({2: -11, 3: 7});
var peoFlat = peoSharp.pow(-1);

var peoPythagOn = new Peo({2: -19, 3: 12});
var peoPythagOff = peoPythagOn.pow(-1);
var peoMercatorOn = new Peo({2: -84, 3: 53});
var peoMercatorOff = peoMercatorOn.pow(-1);
var peoSmallOn = new Peo({2: -1054, 3: 665});
var peoSmallOff = peoSmallOn.pow(-1);
var peoTinyOn = new Peo({2: -301994, 3: 190537});
var peoTinyOff = peoTinyOn.pow(-1);

// Any peo using primes 5 or above might depend on the choice of comma algorithm
// e.g. peoSyntonic depends on choice of getComma(5) from algorithm.
// so all peos here use primes 2 and 3 only.


var result = {
  A: peoA,
  B: peoB,
  C: peoC,
  D: peoD,
  E: peoE,
  F: peoF,
  G: peoG,

  PEO_OCTAVE: peoOctaveUp,

  PEO_SHARP: peoSharp,
  PEO_PYTHAG: peoPythagOn,
  PEO_MERCATOR: peoMercatorOn,
  PEO_SMALL: peoSmallOn,
  PEO_TINY: peoTinyOn
};

result[consts.CHARS_OCTAVE_UP] = peoOctaveUp;
result[consts.CHARS_OCTAVE_DOWN] = peoOctaveDown;

result[consts.CHAR_SHARP] = peoSharp;
result[consts.CHAR_FLAT] = peoFlat;
result[consts.CHAR_PYTHAG_ON] = peoPythagOn;
result[consts.CHAR_PYTHAG_OFF] = peoPythagOff;
result[consts.CHAR_MERCATOR_ON] = peoMercatorOn;
result[consts.CHAR_MERCATOR_OFF] = peoMercatorOff;
result[consts.CHAR_SMALL_ON] = peoSmallOn;
result[consts.CHAR_SMALL_OFF] = peoSmallOff;
result[consts.CHAR_TINY_ON] = peoTinyOn;
result[consts.CHAR_TINY_OFF] = peoTinyOff;

// Replace this with suitable functions!
result[consts.CHAR_SYNTONIC_ON] = new Peo(80, 81)
result[consts.CHAR_SYNTONIC_OFF] = new Peo(81, 80)


module.exports = result;
