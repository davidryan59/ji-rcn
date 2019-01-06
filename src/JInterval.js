var initialise = require('./initialisers/initialise')

// JInterval class constructor
// Object's purpose is to translate between a fraction (in Peo format)
// and a notation (text)
function JInterval() {
  initialise(this, arguments)
}

// Static or Class methods
JInterval.getComma = require('./api/class/getComma')
JInterval.parseNotation = require('./api/class/parseNotation')

// --------- Instance methods ---------

// General
JInterval.prototype.copy = require('./api/general/copy')
JInterval.prototype.getAlg = require('./api/general/getAlg')
JInterval.prototype.getFraction = require('./api/general/getFraction')
JInterval.prototype.getNotation = require('./api/general/getNotation')
JInterval.prototype.getPeo = require('./api/general/getPeo')
JInterval.prototype.getPitch = require('./api/general/getPitch')
JInterval.prototype.getPitchClass = require('./api/general/getPitchClass')
JInterval.prototype.getVal = require('./api/general/getVal')
JInterval.prototype.toString = require('./api/general/toString')

// Frequency
JInterval.prototype.getBaseFreqHz = require('./api/freq/getBaseFreqHz')
JInterval.prototype.getFreqHz = require('./api/freq/getFreqHz')
JInterval.prototype.getFreqText = require('./api/freq/getFreqText')
JInterval.prototype.setBaseFreqHz = require('./api/freq/setBaseFreqHz')

// Maths
JInterval.prototype.get1 = require('./api/maths/get1')
JInterval.prototype.mult = require('./api/maths/mult')
JInterval.prototype.pow = require('./api/maths/pow')

module.exports = JInterval
