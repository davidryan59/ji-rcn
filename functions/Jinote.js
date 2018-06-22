var initialise = require('./initialisers/initialise')

// Jinote class constructor
function Jinote() {
  // Object's purpose is to translate between a fraction (in Peo format)
  // and a notation (text)
  this.peo = null
  this.split = null
  this.notation = null
  // Initialise the Jinote
  initialise(this, arguments)
}


// // Static or Class methods
// Jinote.classMethod = require('./api/class/classMethod')

// --------- Instance methods ---------

// Type of instance method
Jinote.prototype.getPeo = require('./api/getPeo')

module.exports = Jinote
