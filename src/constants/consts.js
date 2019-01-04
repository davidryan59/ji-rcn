// Notation characters A, B, C, D, E, F, G are not configurable.

// Notation digits 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 as used in brackets
// and for octave numbers are also not configurable.

module.exports = {
  DEFAULT_NOTATION: "C4",
  DEFAULT_BASE_FREQ_HZ: 256,

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

  BRACKET_ALLOWED_CHARS: "[](){}<>",

  ERROR_TEXT: "ERR",
  ERROR_MAX_CHARS: 2,
  COMMA_MAX_DIGITS: 3,
  REPEAT_MAX_CHARS: 4,
  BRACKET_MAX_DIGITS: 15,      // Shouldn't be higher than 15 (1e15). Could be as low as 4 or 6.

  DUMMY: "DUMMY"
}
