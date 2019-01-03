var initialise = require('./initialisers/initialise')

// Jinote class constructor
// Object's purpose is to translate between a fraction (in Peo format)
// and a notation (text)
function Jinote() {
  this.peo = null
  this.alg = ""
  initialise(this, arguments)
}

// Static or Class methods
Jinote.getComma = require('./api/class/getComma')
Jinote.parseNotation = require('./api/class/parseNotation')

// --------- Instance methods ---------

// General
Jinote.prototype.copy = require('./api/general/copy')
Jinote.prototype.getAlg = require('./api/general/getAlg')
Jinote.prototype.getBaseFreqHz = require('./api/general/getBaseFreqHz')
Jinote.prototype.getFraction = require('./api/general/getFraction')
Jinote.prototype.getFreqHz = require('./api/general/getFreqHz')
Jinote.prototype.getFreqText = require('./api/general/getFreqText')
Jinote.prototype.getNotation = require('./api/general/getNotation')
Jinote.prototype.getPeo = require('./api/general/getPeo')
Jinote.prototype.getPitch = require('./api/general/getPitch')
Jinote.prototype.getPitchClass = require('./api/general/getPitchClass')
Jinote.prototype.getVal = require('./api/general/getVal')
Jinote.prototype.setBaseFreqHz = require('./api/general/setBaseFreqHz')
Jinote.prototype.toString = require('./api/general/toString')

// Maths
Jinote.prototype.get1 = require('./api/maths/get1')
Jinote.prototype.mult = require('./api/maths/mult')
Jinote.prototype.pow = require('./api/maths/pow')

module.exports = Jinote
