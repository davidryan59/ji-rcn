var mathsFnJIntervalCreator = require('../../maths/mathsFnJIntervalCreator');

// Return JInterval of unison, 1/1
var get1 = function get1() {
  return mathsFnJIntervalCreator(this, {width: 1});
};

module.exports = get1;
