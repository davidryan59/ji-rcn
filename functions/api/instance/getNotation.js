var getPitch = require('./getPitch')

var getNotation = function() {
  return this.getPitch()          // Its an alias for getPitch
}

module.exports = getNotation
