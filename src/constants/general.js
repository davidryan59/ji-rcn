var Peo = require('peo')

var peoF = new Peo(4, 3)
var peoC = new Peo()
var peoG = new Peo(3, 2)
var peoD = new Peo(9, 8)
var peoA = new Peo(27, 16)
var peoE = new Peo(81, 64)
var peoB = new Peo(243, 128)
var peoOctave = new Peo(2)
var peoSharp = new Peo({2:-11, 3:7})
var peoPythag = new Peo({2:-19, 3:12})
var peoMercator = new Peo({2:-84, 3:53})
var peoSmall = new Peo({2:-1054, 3:665})
var peoTiny = new Peo({2:-301994, 3:190537})
var peoSyntonic = new Peo({2:4, 3:-4, 5:1})

var result = {
  OVERFLOW_TEXT: "LOTS",

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
  PEO_TINY: peoTiny,
  PEO_SYNTONIC: peoSyntonic,

  CHAR_OCTAVE_MARK: "o",
  CHAR_OCTAVE_UP: "+",
  CHAR_OCTAVE_DOWN: "-",
  CHAR_SHARP: "#",
  CHAR_FLAT: "b",
  CHAR_PYTHAG_ON: "p",
  CHAR_PYTHAG_OFF: "d",
  CHAR_MERCATOR_ON: "m",
  CHAR_MERCATOR_OFF: "w",
  CHAR_SMALL_ON: "s",
  CHAR_SMALL_OFF: "r",
  CHAR_TINY_ON: "t",
  CHAR_TINY_OFF: "y",
  CHAR_SYNTONIC_ON: "'",
  CHAR_SYNTONIC_OFF: ".",
  CHAR_COMMA_DIVIDE: "/",
  CHAR_COMMA_POWER: "^",

  BRACKET_LEFT_STANDARD: "(",
  BRACKET_RIGHT_STANDARD: ")",
  BRACKET_LEFT_COMMA: "[",
  BRACKET_RIGHT_COMMA: "]",

  MAX_ERROR_DIGITS_2_OCTAVE: 15,
  MAX_OVERFLOW_DIGITS_2_OCTAVE: 6,
  ERROR_TEXT_2_OCTAVE: "o.Err",

  MAX_ERROR_DIGITS_3_DIATONIC: 15,
  ERROR_TEXT_3_DIATONIC_NA: "Na",
  ERROR_TEXT_3_DIATONIC_LO: "Lo",
  ERROR_TEXT_3_DIATONIC_HI: "Hi",

  MAX_ERROR_DIGITS_3_SHARPS_FLATS: 15,
  MAX_OVERFLOW_DIGITS_3_SHARPS_FLATS: 6,
  MAX_REPEATS_3_SHARPS_FLATS: 4,
  ERROR_TEXT_3_SHARPS_FLATS: "N",

  MAX_ERROR_DIGITS_5_SYNTONIC_COMMA: 15,
  MAX_OVERFLOW_DIGITS_5_SYNTONIC_COMMA: 6,
  MAX_REPEATS_5_SYNTONIC_COMMA: 4,
  ERROR_TEXT_5_SYNTONIC_COMMA: "5ERR",

  MAX_DIGITS_UNSPLIT_HIGHER_PRIMES: 3,

  DUMMY: "DUMMY"
}

module.exports = result
