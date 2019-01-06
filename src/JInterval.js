var initialise = require('./initialisers/initialise')

// JInterval class constructor
// Object's purpose is to translate between a fraction (in Peo format)
// and a notation (text)
function JInterval() {
  this.freqHz = {}
  initialise(this, arguments)
}

// Static or Class methods
JInterval.getComma = require('./api/class/getComma')

// --------- Instance methods ---------

// General
JInterval.prototype.copy = require('./api/general/copy')
JInterval.prototype.getAlg = require('./api/general/getAlg')
JInterval.prototype.getFraction = require('./api/general/getFraction')
JInterval.prototype.getPeo = require('./api/general/getPeo')
JInterval.prototype.getPitch = require('./api/general/getPitch')
JInterval.prototype.getPitchClass = require('./api/general/getPitchClass')
JInterval.prototype.getVal = require('./api/general/getVal')
JInterval.prototype.toString = require('./api/general/toString')

// Notation
JInterval.prototype.getEndNotation = require('./api/notation/getEndNotation')

// Frequency
JInterval.prototype.getEndFreqHz = require('./api/freq/getEndFreqHz')
JInterval.prototype.getEndFreqText = require('./api/freq/getEndFreqText')

// Maths
JInterval.prototype.get1 = require('./api/maths/get1')
JInterval.prototype.mult = require('./api/maths/mult')
JInterval.prototype.pow = require('./api/maths/pow')

module.exports = JInterval
