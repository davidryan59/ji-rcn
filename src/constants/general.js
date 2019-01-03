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

  NAME_2_OCTAVE: "o",
  NAME_3_SHARP: "#",
  NAME_3_FLAT: "b",
  NAME_3_PYTHAG_COMMA_ADD: "p",
  NAME_3_PYTHAG_COMMA_REMOVE: "d",
  NAME_3_MERCATOR_COMMA_ADD: "m",
  NAME_3_MERCATOR_COMMA_REMOVE: "w",
  NAME_3_SMALL_COMMA_ADD: "s",
  NAME_3_SMALL_COMMA_REMOVE: "r",
  NAME_3_TINY_COMMA_ADD: "t",
  NAME_3_TINY_COMMA_REMOVE: "y",
  NAME_5_SYNTONIC_COMMA_ADD: "'",
  NAME_5_SYNTONIC_COMMA_REMOVE: ".",

  BRACKET_2_OCTAVE_LEFT: "(",
  SYMBOL_2_OCTAVE_UP: "+",
  SYMBOL_2_OCTAVE_DOWN: "-",
  BRACKET_2_OCTAVE_RIGHT: ")",
  BRACKET_3_SHARP_FLAT_LEFT: "(",
  BRACKET_3_SHARP_FLAT_RIGHT: ")",
  BRACKET_5_SYNTONIC_LEFT: "(",
  BRACKET_5_SYNTONIC_RIGHT: ")",
  BRACKET_HIGHER_COMMA_LEFT: "[",
  SYMBOL_HIGHER_COMMA_MID: "/",
  SYMBOL_HIGHER_COMMA_POW: "^",
  BRACKET_HIGHER_COMMA_RIGHT: "]",

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
