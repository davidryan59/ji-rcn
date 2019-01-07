var initialise = require('./initialisers/initialise')

// JInterval class constructor
// Object's purpose is to translate between a fraction (in Peo format)
// and a notation (text)
function JInterval() {
  this.freqHz = {}
  this.notation = {}
  this.notation.start = {}
  this.notation.end = {}
  initialise(this, arguments)
}

// Static or Class methods
JInterval.getComma = require('./api/class/getComma')

// --------- Instance methods ---------

// Frequency
JInterval.prototype.getEndFreqHz = require('./api/freq/getEndFreqHz')
JInterval.prototype.getEndFreqText = require('./api/freq/getEndFreqText')
JInterval.prototype.getStartFreqHz = require('./api/freq/getStartFreqHz')
JInterval.prototype.getStartFreqText = require('./api/freq/getStartFreqText')

// General
JInterval.prototype.copy = require('./api/general/copy')
JInterval.prototype.getPeo = require('./api/general/getPeo')
JInterval.prototype.toDecimal = require('./api/general/toDecimal')
JInterval.prototype.toFractionText = require('./api/general/toFractionText')
JInterval.prototype.toString = require('./api/general/toString')

// Maths
JInterval.prototype.get1 = require('./api/maths/get1')
JInterval.prototype.mult = require('./api/maths/mult')
JInterval.prototype.pow = require('./api/maths/pow')

// Notation
JInterval.prototype.getAlg = require('./api/notation/getAlg')
JInterval.prototype.getEndPitchClassNotation = require('./api/notation/getEndPitchClassNotation')
JInterval.prototype.getEndPitchNotation = require('./api/notation/getEndPitchNotation')
JInterval.prototype.getStartPitchClassNotation = require('./api/notation/getStartPitchClassNotation')
JInterval.prototype.getStartPitchNotation = require('./api/notation/getStartPitchNotation')

module.exports = JInterval
