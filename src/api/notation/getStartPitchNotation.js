var consts = require('../../constants/consts')

var getStartPitchNotation = function() {
  return this.notation.start.pitch || consts.DEFAULT_PITCH_NOTATION
}

module.exports = getStartPitchNotation
