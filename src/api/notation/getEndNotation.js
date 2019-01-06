var getPitch = require('../general/getPitch')

var getEndNotation = function() {
  return this.getPitch()          // Its an alias for getPitch
}

module.exports = getEndNotation
