var getPitch = require('./getPitch')

var getEndNotation = function() {
  return this.getPitch()          // Its an alias for getPitch
}

module.exports = getEndNotation
