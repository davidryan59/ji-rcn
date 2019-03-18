// Notation characters A, B, C, D, E, F, G are not configurable.

// Notation digits 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 as used in brackets
// and for octave numbers are also not configurable.

module.exports = {
  DEFAULT_PITCH_NOTATION: 'C4',
  DEFAULT_FREQ_HZ: 256,

  CHAR_OCTAVE_MARK: 'o',
  CHAR_OCTAVE_UP: '+',
  CHAR_OCTAVE_DOWN: '-',

  CHAR_SHARP: '#',
  CHAR_FLAT: 'b',

  CHAR_PYTHAG_ON: 'p',
  CHAR_PYTHAG_OFF: 'd',
  CHAR_MERCATOR_ON: 'm',
  CHAR_MERCATOR_OFF: 'w',
  CHAR_SMALL_ON: 's',
  CHAR_SMALL_OFF: 'r',
  CHAR_TINY_ON: 't',
  CHAR_TINY_OFF: 'y',

  CHAR_SYNTONIC_ON: "'",
  CHAR_SYNTONIC_OFF: '.',

  CHAR_COMMA_DIVIDE: '/',
  CHAR_COMMA_POWER: '^',

  BRACKET_LEFT_STANDARD: '(',
  BRACKET_RIGHT_STANDARD: ')',
  BRACKET_LEFT_COMMA: '[',
  BRACKET_RIGHT_COMMA: ']',

  ERROR_TEXT: 'ERR',
  ERROR_MAX_CHARS: 2,
  COMMA_MAX_UNSPLIT: 1000,
  REPEAT_MAX_CHARS: 4,
  BRACKET_MAX_DIGITS: 15,

  ALG_DR: 'DR',      // List of acronyms for comma algorithm. See function list in algIndex file
  ALG_SAG: 'SAG',
  ALG_KG: 'KG2',
  ALG_BAD: 'BAD',
  ALG_ADJ: 'ADJ',

  ALG_CUSTOM: 'CUSTOM',  // Default value if function supplied but no name

  DUMMY: 'DUMMY'
};
