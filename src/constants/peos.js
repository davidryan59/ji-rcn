var Peo = require('peo');

var peoF = new Peo(4, 3);
var peoC = new Peo();
var peoG = new Peo(3, 2);
var peoD = new Peo(9, 8);
var peoA = new Peo(27, 16);
var peoE = new Peo(81, 64);
var peoB = new Peo(243, 128);

var peoOctave = new Peo(2);

var peoSharp = new Peo({2: -11, 3: 7});
var peoPythag = new Peo({2: -19, 3: 12});
var peoMercator = new Peo({2: -84, 3: 53});
var peoSmall = new Peo({2: -1054, 3: 665});
var peoTiny = new Peo({2: -301994, 3: 190537});

// peoSyntonic not cached here since it could potentially change based on algorithm


var result = {
  A: peoA,
  B: peoB,
  C: peoC,
  D: peoD,
  E: peoE,
  F: peoF,
  G: peoG,

  PEO_DIATONIC_F: peoF,
  PEO_DIATONIC_C: peoC,
  PEO_DIATONIC_G: peoG,
  PEO_DIATONIC_D: peoD,
  PEO_DIATONIC_A: peoA,
  PEO_DIATONIC_E: peoE,
  PEO_DIATONIC_B: peoB,

  PEO_OCTAVE: peoOctave,

  PEO_SHARP: peoSharp,
  PEO_PYTHAG: peoPythag,
  PEO_MERCATOR: peoMercator,
  PEO_SMALL: peoSmall,
  PEO_TINY: peoTiny
};

module.exports = result;
