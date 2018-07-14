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

// --------- Instance methods ---------

// Type of instance method
Jinote.prototype.getPeo = require('./api/instance/getPeo')
Jinote.prototype.getAlg = require('./api/instance/getAlg')
Jinote.prototype.getNotation = require('./api/instance/getNotation')
Jinote.prototype.getPitch = require('./api/instance/getPitch')
Jinote.prototype.getPitchClass = require('./api/instance/getPitchClass')

module.exports = Jinote
