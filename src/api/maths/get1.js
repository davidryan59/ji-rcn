var createJIntervalWithSetup = require('../../initialisers/createJIntervalWithSetup');

// Return JInterval of unison, 1/1
var get1 = function get1() {
  return createJIntervalWithSetup(this, {ratio: 1});
};

module.exports = get1;
