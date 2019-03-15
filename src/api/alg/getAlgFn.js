var algIndex = require('../../commas/algIndex');

var getAlgFn = function getAlgFn() {
  // Return the actual function used to calculate the commas
  return (this.set && this.set.alg && this.set.alg.fn ) ? this.set.alg.fn : algIndex.DEFAULT_ALG;
};

module.exports = getAlgFn;
