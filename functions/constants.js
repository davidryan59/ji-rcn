var Peo = require('peo')

var constants = {
  OVERFLOW_TEXT: "LOTS",

  PEO_2_OCTAVE: new Peo(2),
  PEO_3_DIATONIC_F: new Peo(4, 3),
  PEO_3_DIATONIC_C: new Peo(),
  PEO_3_DIATONIC_G: new Peo(3, 2),
  PEO_3_DIATONIC_D: new Peo(9, 8),
  PEO_3_DIATONIC_A: new Peo(27, 16),
  PEO_3_DIATONIC_E: new Peo(81, 64),
  PEO_3_DIATONIC_B: new Peo(243, 128),
  PEO_3_SHARP: new Peo({3:7, 2:-11}),

  NAME_2_OCTAVE: "o",
  NAME_3_DIATONIC_F: "F",
  NAME_3_DIATONIC_C: "C",
  NAME_3_DIATONIC_G: "G",
  NAME_3_DIATONIC_D: "D",
  NAME_3_DIATONIC_A: "A",
  NAME_3_DIATONIC_E: "E",
  NAME_3_DIATONIC_B: "B",
  NAME_3_SHARP: "#",
  NAME_3_FLAT: "b",
  NAME_5_SYNTONIC_COMMA_UP: "'",
  NAME_5_SYNTONIC_COMMA_DOWN: ".",

  BRACKET_2_OCTAVE_LEFT: "(",
  SYMBOL_2_OCTAVE_UP: "+",
  SYMBOL_2_OCTAVE_DOWN: "-",
  BRACKET_2_OCTAVE_RIGHT: ")",
  BRACKET_3_SHARP_FLAT_LEFT: "(",
  BRACKET_3_SHARP_FLAT_RIGHT: ")",
  BRACKET_5_DIATONIC_LEFT: "(",
  BRACKET_5_DIATONIC_RIGHT: ")",
  BRACKET_HIGHER_COMMA_LEFT: "[",
  SYMBOL_HIGHER_COMMA_MID: "/",
  SYMBOL_HIGHER_COMMA_POW: "^",
  BRACKET_HIGHER_COMMA_RIGHT: "]",

  MAX_ERROR_2_OCTAVE: 1e15,
  MAX_OVERFLOW_2_OCTAVE: 1e6,
  ERROR_TEXT_2_OCTAVE: "o.Err",

  MAX_ERROR_3_DIATONIC: 1e15,
  ERROR_TEXT_3_DIATONIC_NA: "Na",
  ERROR_TEXT_3_DIATONIC_LO: "Lo",
  ERROR_TEXT_3_DIATONIC_HI: "Hi",

  MAX_ERROR_3_SHARPS_FLATS: 1e15,
  MAX_OVERFLOW_3_SHARPS_FLATS: 1e6,
  MAX_REPEATS_3_SHARPS_FLATS: 4,
  ERROR_TEXT_3_SHARPS_FLATS: "N",

  MAX_ERROR_5_SYNTONIC_COMMA: 1e15,
  MAX_OVERFLOW_5_SYNTONIC_COMMA: 1e6,
  MAX_REPEATS_5_SYNTONIC_COMMA: 4,
  ERROR_TEXT_5_SYNTONIC_COMMA: "5ERR",

  DUMMY: "DUMMY"
}

module.exports = constants
